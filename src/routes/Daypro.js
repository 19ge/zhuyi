import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import styles from "./styles/Daypro.less";
import MyNavBar from "../components/MyNavBar";
import MyTabBar from "../components/TabBar";
import Goods from '../components/Goods';
import * as Shop from '../services/shop';
import { Tabs, Button,Modal ,List ,WhiteSpace} from 'antd-mobile';
import InfiniteScroll from 'react-infinite-scroller';
import v03 from '../assets/images/tj.png';
import { APIHost } from '../utils/fetch';
var queryString = require('querystring');
@connect(state => ({ shop: state.shop }))
export default class Daypro extends Component {
        state = {
            val: 0,
            data:'',
            pid:''
        }   
    async componentDidMount(){
        const {location} = this.props;
        const parse=queryString.parse(location.search.replace("?",""));
        const result=await Shop.fenl({id:parse.id});
        this.setState({
            data:result.data,

        });

        
    }
    async getGoodsListOfClass(i,index){
        const {location} = this.props;
        const parse=queryString.parse(location.search.replace("?",""));
       
        const result=await Shop.fenl({pd_cate:i.id,id:parse.id}); 
        this.setState({
            data:result.data,
            pid:i.id
        });     
    }
      //select 选择框
    async onChanges(v) {
        const {pid,data}=this.state;
        const number = v.target.value
        console.log(number,'number')
        const result=await Shop.fenl({orderby:number,pd_cate:pid?pid:data.cate[0].id});   
        this.setState({data:result.data})
        
    }
    details(id){
        const {dispatch}=this.props;
        dispatch(routerRedux.push('/Details?id='+id))
    }
    render(){
        const {ptu,data}=this.state;
        const {history,dispatch}=this.props;
        const navBarProps = {
            leftVisible:true,
            leftFunc(){
                history.go(-1)
              },
           
            titleName:"",
            rightContent:"",
            rightFunc(){
            }
        }
        const optio=[
            {
                id:0,
                name:'请选择'
            },
            {
                id:1,
                name:'销量正序'
            },
            {
                id:2,
                name:'销量倒序'
            },
            {
                id:3,
                name:'价格正序'
            },
            {
                id:4,
                name:'价格倒序'
            },
            {
                id:5,
                name:'添加时间倒序'
            },
        ]
        let tabs = [];
        data.cate?data.cate.map(function(item){
            const id=item.id;

            item.title = item.fl_name;
            tabs.push(item);
        }):''

        return(
            <div className={styles.App}>
                <style>
                    {`
                    .am-tabs-default-bar-tab-active{
                        color:#5DD075;
                    }
                    
                    .am-whitespace.am-whitespace-md{
                        height:0;
                    }
                    .am-tabs-tab-bar-wrap{
                        margin-bottom: 0.3rem;
                    }
                    `}
                </style>
                {/*头部导航栏*/}
                <MyNavBar {...navBarProps}/>   
                <div className={styles.tabbar}>
                    <Tabs tabs={tabs}
                        initialPage={'t1'}  
                        onChange={(tab, index) => { this.getGoodsListOfClass(tab,index) }}
                        onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
                    >  
                        <div style={{ display: 'flex',flexDirection: 'column' , backgroundColor: '#fff' }}>
                            <select className={styles.xiala} onChange={(v) => this.onChanges(v)} >
                                {
                                    optio?optio.map((item,index)=>{
                                        return(
                                            <option key={index} value={item.id}>{item.name}</option>
                                        )

                                    }):''
                                }
                            </select>
                            {/* <Goods /> */}
                            <div className={styles.moshi} >
                                <div className={styles.box}>
                                    {
                                        data.product? data.product.map((item,index)=>{
                                            return(
                                                <dl key={index} onClick={()=>this.details(item.id)}>
                                                    <dt>
                                                        <img src={APIHost+item.pd_image} />
                                                    </dt>
                                                    <dd>
                                                        <h5>{item.pd_name}</h5>
                                                        <p>{
                                                            item.pd_describe
                                                        }
                                                        </p>
                                                        <div className={styles.price}>
                                                            <span className={styles.hrice}>￥{item.pd_price}</span>
                                                            <s className={styles.lprice}>￥{item.pd_reg}</s>
                                                            <span className={styles.lprice}>已售 {item.pd_sale}</span>
                                                        </div>
                                                    </dd>
                                                </dl>
                                            )

                                        }):''
                                    }
                            <div style={{clear:'both'}}></div>

                                </div>
                            </div>
                            <div className={styles.tuijian}>
                                <div className={styles.dl}>
                                    <div className={styles.dt}>
                                        <img src={v03} />
                                    </div>
                                    <div className={styles.dd}>热门推荐</div>
                                </div>
                                <div className={styles.ddl}>
                                    {
                                        data.host?data.host.map((item,index)=>{
                                            return(
                                                <dl key={index} onClick={()=>this.details(item.id)}>
                                                    <dt>
                                                        <img src={APIHost+item.pd_image} />
                                                    </dt>
                                                    <dd>
                                                        <h5>{item.pd_name}</h5>
                                                        <div className={styles.price}>
                                                            <span className={styles.hrice}>￥{item.pd_price}</span>
                                                            <s className={styles.lprice}>￥{item.pd_reg}</s>
                                                        </div>
                                                    </dd>
                                                </dl>
                                            )

                                        }):""
                                    }
                                </div>
                                
                            </div>      
                        </div>          
                    </Tabs>   
                </div>
            </div>
        )
    }
}