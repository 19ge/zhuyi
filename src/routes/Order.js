import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import styles from "./styles/Order.less";
import MyNavBar from "../components/MyNavBar";
import MyTabBar from "../components/TabBar";
import * as Shop from '../services/shop';
import { Tabs, Button,Modal, Toast} from 'antd-mobile';
import InfiniteScroll from 'react-infinite-scroller';
import v04 from '../assets/images/xxx.png';
import { APIHost } from '../utils/fetch';
var queryString = require('querystring');

@connect(state => ({ shop: state.shop }))

export default class Order extends Component {
        state = {
            val: 0,
            check:1,
            status:'',
            data:"",
            tdata:"",
            zt:""
        } 
        componentDidMount(){
            Shop.morder().then((result=>{
                const data=result.data;
                this.setState({
                    data:data
                })
            }))
        }  
    // componentWillMount(){
    //     const {dispatch,location}=this.props;
    //     const parse=queryString.parse(location.search.replace('?',''));
    //     console.log(parse.index,"var queryString = require('querystring');")
    //     this.setState({number:parseFloat(parse.index)});
    // }
    
    //加载更多的方法,写法固定,只需替换变量名
    // loadFunc(e){
    //     const {dispatch,shop}=this.props;
    //     // let hasMore=shop.pagination.hasMore; // 是否加载更多 ture/false
    //     let page = shop.pagination.current_page * 1 + 1;
    //     dispatch({
    //     type:"shop/dingdan",     //方法
    //     payload:{       //参数
    //         is_hot:true,
    //         page
    //     }
    //     })
    // }
    // details(item){
    //     const{dispatch}=this.props;
    //     dispatch(routerRedux.push('/Orderinfo?id='+item))
    // }

    async getGoodsListOfClass(item,index){
        const {data}=this.state;
        console.log(item,'ppppp');
        const or_type=item.or_type;
        Shop.morder({or_type:or_type}).then((result=>{
            const data=result.data;
            console.log(result,'data')
            this.setState({
                data:data
            })
        }))
    }
    
    quxiao(){
        this.setState({
            check:1
        }) 
    }
    tan(id,item){
        console.log(item,'item');
        const zt=item.or_type;
        this.setState({
            zt:zt
        })
        Shop.dorder({id:id}).then((result=>{
            const tdata=result.data;
            this.setState({
                check:0,
                tdata:tdata.detail
            }) 
        }))
        
    }
    zhif(id){
        const alert = Modal.alert;
        const{dispatch}=this.props;
        alert('', '确认支付', [
            { text: '取消', onPress: () => console.log('cancel') },
            { text: '确认', onPress: () =>{
                
                dispatch(routerRedux.push('/Zhifu?id='+id))
            } },
          ])
    }
    sh(id){
        const alert = Modal.alert;
        const{dispatch}=this.props;
        alert('', '确认收货', [
            { text: '取消', onPress: () => console.log('cancel') },
            { text: '确认', onPress: () =>{
                Shop.sureh({id:id}).then((result=>{
                    if(result.code==1){
                        Toast.success(result.msg,2,()=>{
                            Shop.morder().then((result2=>{
                                const data=result2.data;
                                this.setState({
                                    data:data
                                })
                            }))
                        });
                    }else{
                        Toast.offline(result.msg,2)
                    }
                }))
            } },
          ]) 
    }
    render(){
        const {status,page,check,data,tdata,zt}=this.state;
        const {history,dispatch,shop}=this.props;
        const navBarProps = {
            leftVisible:true, 
            leftFunc(){
                dispatch(routerRedux.push('/Mine'))
            },
           
            titleName:"我的订单",
            rightContent:"",
            rightFunc(){
            }
        }
        const tabs = [
            { title: '全部' },
            { title: '未支付', or_type:0 },
            { title: '已支付',or_type:1 },
            // { title: '待收货',or_type:2 },
            { title: '已完成' ,or_type:3},
        ];
        const displaynone={
			display:"none"
		}
		const displayblock={
			display:"block"
		}
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
                   
                    .am-button{
                        width: 1.53rem;
                        height: 0.5rem;
                        line-height: 0.5rem;
                        color:#A1A1A0;
                        font-size: 0.24rem;
                        border:1px solid rgba(191,191,191,1)
                        border-radius:0.06rem;
                    }
                    .am-tabs-default-bar-underline{
                        border: 0.03rem #5DD075 solid ; 
                    }
                    .am-modal-transparent{
                        width:5rem;
                        // height:rem;
                    }
                    .am-modal-body{
                        color:#333;
                    }
                    `}
                </style>
            {/*头部导航栏*/}
                <MyNavBar {...navBarProps}/>   
                <div className={styles.tabbar}>
                    <div style={{ height: 'auto' }}>
                    <Tabs tabs={tabs}
                        initialPage={'t1'}   
                        onChange={(tab, index) => { this.getGoodsListOfClass(tab,index) }}
                        onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
                    >
                    {/* <InfiniteScroll
                    pageStart={0}
                    initialLoad={false}
                    loadMore={(e)=>this.loadFunc(e)}
                    hasMore={hasMore}
                    threshold={100}
                    loader={<div className="loader" style={{fontSize:".28rem",lineHeight:".86rem",textAlign:"center",marginBottom:".3rem"}} key={0}>加载中
                    ...</div>}
                    > */}
                        <div>
                            {
                                data?data.map((item,index)=>{
                                    return(
                                        item.or_type==0?<div className={styles.box}>
                                        <div className={styles.boxtop}>
                                            <p>订单总计</p>
                                            <p>￥{item.or_sum}</p>
                                        </div>
                                        {
                                            item.detail.map((itm,inx)=>{
                                                return(
                                                    <dl key={index} onClick={()=>this.tan(itm.id,item)}>
                                                        <dt>
                                                            <img src={APIHost+itm.pd_image} />
                                                        </dt>
                                                        <dd>
                                                            <div className={styles.title}>
                                                                <h5>{itm.pd_name}</h5>
                                                                <label>x{itm.gw_number}</label>  
                                                            </div>
                                                            <div style={{clear:'both'}}></div>
                                                            <p>以粮谷为主要原料,以大曲、小曲或麸曲及酒母等为糖化
                    发酵剂,经蒸煮、糖化、发酵、蒸馏而制成的蒸馏酒。</p>
                                                            <div className={styles.guige}>
                                                                <span>类型:{itm.pd_type}</span>
                                                                <span>规格:{itm.pd_color}</span>
                                                            </div>
                                                        </dd>
                                                        <div style={{clear:'both'}}></div>
                                                    </dl>
                                                ) 
                                                
                                            })
                                        }
                                        <div style={{clear:'both'}}></div>
                                        
                                        
                                        <Button className={styles.btn} onClick={()=>this.zhif(item.id)}>未支付</Button>
                                        <div className={styles.boxbottom}></div>
                                    </div>:item.or_type==1?<div className={styles.box}>
                                        <div className={styles.boxtop} style={{color:'#05AAFA',borderBottom:"0"}}>
                                            <p>订单总计</p>
                                            <p>￥{item.or_sum}</p>
                                        </div>
                                        <div style={{height:"0.01rem",background:"#05AAFA"}}></div>
                                        {
                                            item.detail.map((itm,inx)=>{
                                                return(
                                                    
                                                    <dl onClick={()=>this.tan(itm.id,item)}>
                                                        <dt>
                                                            <img src={APIHost+itm.pd_image} />
                                                        </dt>
                                                        <dd>
                                                            <div className={styles.title}>
                                                                <h5 style={{color:'#05AAFA'}}>{itm.pd_name}</h5>
                                                                <label style={{color:'#05AAFA'}}>x{itm.gw_number}</label>
                                                                
                                                            </div>
                                                            <div style={{clear:'both'}}></div>
                                                            <p>以粮谷为主要原料,以大曲、小曲或麸曲及酒母等为糖化
                    发酵剂,经蒸煮、糖化、发酵、蒸馏而制成的蒸馏酒。</p>
                                                            <div className={styles.guige}>
                                                                <span>类型:{itm.pd_type}</span>
                                                                <span>规格:{itm.pd_color}</span>
                                                            </div>
                                                        </dd>
                                                        <div style={{clear:'both'}}></div>
                                                    </dl>
                                                ) 
                                                
                                            })
                                        }
                                        <div style={{clear:'both'}}></div>
                                        <Button className={styles.btn} style={{background:'#05AAFA'}}>已支付</Button>
                                        <div className={styles.boxbottom} style={{background:'#05AAFA'}}></div>
                                    </div>:item.or_type==3?<div className={styles.box}>
                                        <div className={styles.boxtop} style={{color:"#5DD075",borderBottom:'0'}}>
                                            <p>订单总计</p>
                                            <p>￥{item.or_sum}</p>
                                        </div>
                                        <div style={{height:"0.01rem",background:"#5DD075"}}></div>
                                        {
                                            item.detail.map((itm,inx)=>{
                                                return(
                                                    
                                                    <dl onClick={()=>this.tan(itm.id,item)}>
                                                        <dt>
                                                            <img src={APIHost+itm.pd_image} />
                                                        </dt>
                                                        <dd>
                                                            <div className={styles.title} style={{color:"#5DD075"}}>
                                                                <h5>{itm.pd_name}</h5>
                                                                <label>x{itm.gw_number}</label>
                                                                
                                                            </div>
                                                            <div style={{clear:'both'}}></div>
                                                            <p>以粮谷为主要原料,以大曲、小曲或麸曲及酒母等为糖化
                    发酵剂,经蒸煮、糖化、发酵、蒸馏而制成的蒸馏酒。</p>
                                                            <div className={styles.guige}>
                                                                <span>类型:{itm.pd_type}</span>
                                                                <span>规格:{itm.pd_color}</span>
                                                            </div>
                                                        </dd>
                                                        <div style={{clear:'both'}}></div>
                                                    </dl>
                                                ) 
                                                
                                            })
                                        }
                                        <div style={{clear:'both'}}></div>
                                        <Button className={styles.btn} style={{background:"#5DD075"}}>已完成</Button>
                                        <div className={styles.boxbottom} style={{background:"#5DD075"}}></div>
                                    </div>:item.or_type==2?<div className={styles.box}>
                                        <div className={styles.boxtop} style={{color:"yellowgreen",borderBottom:'0'}}>
                                            <p>订单总计</p>
                                            <p>￥{item.or_sum}</p>
                                        </div>
                                        <div style={{height:"0.01rem",background:"yellowgreen"}}></div>
                                        {
                                            item.detail.map((itm,inx)=>{
                                                return(
                                                    
                                                    <dl onClick={()=>this.tan(itm.id,item)}>
                                                        <dt>
                                                            <img src={APIHost+itm.pd_image} />
                                                        </dt>
                                                        <dd>
                                                            <div className={styles.title} style={{color:"yellowgreen"}}>
                                                                <h5>{itm.pd_name}</h5>
                                                                <label>x{itm.gw_number}</label>
                                                                
                                                            </div>
                                                            <div style={{clear:'both'}}></div>
                                                            <p>以粮谷为主要原料,以大曲、小曲或麸曲及酒母等为糖化
                    发酵剂,经蒸煮、糖化、发酵、蒸馏而制成的蒸馏酒。</p>
                                                            <div className={styles.guige}>
                                                                <span>类型:{itm.pd_type}</span>
                                                                <span>规格:{itm.pd_color}</span>
                                                            </div>
                                                        </dd>
                                                        <div style={{clear:'both'}}></div>
                                                    </dl>
                                                ) 
                                                
                                            })
                                        }
                                        <div style={{clear:'both'}}></div>
                                        <Button className={styles.btn} style={{background:"yellowgreen"}} onClick={()=>this.sh(item.id)}>待收货</Button>
                                        <div className={styles.boxbottom} style={{background:"yellowgreen"}}></div>
                                    </div>:""
                                            
                                    )

                                }):""
                            }   
                        </div>
                        {/* </InfiniteScroll> */}
                    </Tabs>
                    </div>
                </div>
                <div className={styles.cc} style={check===1?displaynone:displayblock} onClick={()=>this.quxiao()}></div>
                <div className={styles.sss} style={check===1?displaynone:displayblock}>
                    <div className={styles.boxtitle}>
                        <h5>订单信息</h5>
                        <img src={v04} onClick={()=>this.quxiao()} />
                    </div>
                    <div className={styles.content}>
                        <div className={styles.cbox}>
                            <p className={styles.pname}>物品名称</p>
                            <p className={styles.pcontent}>{tdata.pd_name}</p>
                        </div>
                        <div style={{clear:'both'}}></div>
                        <div className={styles.cbox}>
                            <p className={styles.pname}>数量</p>
                            <p className={styles.pcontent}>{tdata.gw_number}</p>
                        </div>
                        <div style={{clear:'both'}}></div>
                        <div className={styles.cbox}>
                            <p className={styles.pname}>价格</p>
                            <p className={styles.pcontent}>￥{tdata.pd_price}</p>
                        </div>
                        <div style={{clear:'both'}}></div>
                        <div className={styles.cbox}>
                            <p className={styles.pname}>类型</p>
                            <p className={styles.pcontent}>{tdata.pd_type}</p>
                        </div>
                        <div style={{clear:'both'}}></div>
                        <div className={styles.cbox}>
                            <p className={styles.pname}>规格</p>
                            <p className={styles.pcontent}>{tdata.pd_color}</p>
                        </div>
                        <div style={{clear:'both'}}></div>
                        <div className={styles.cbox}>
                            <p className={styles.pname}>商家</p>
                            <p className={styles.pcontent}>{tdata.shop_name}</p>
                        </div>
                        <div style={{clear:'both'}}></div>
                        <div className={styles.cbox}>
                            <p className={styles.pname}>收货人</p>
                            <p className={styles.pcontent}>{tdata.us_name}</p>
                        </div>
                        <div className={styles.cbox}>
                            <p className={styles.pname}>收货人电话</p>
                            <p className={styles.pcontent}>{tdata.us_tel}</p>
                        </div>
                        <div style={{clear:'both'}}></div>
                        <div className={styles.cbox}>
                            <p className={styles.pname}>订单号</p>
                            <p className={styles.pcontent}>{tdata.or_num}</p>
                        </div>
                        <div style={{clear:'both'}}></div>
                        <div className={styles.cbox}>
                            <p className={styles.pname}>物流公司</p>
                            <p className={styles.pcontent}>{tdata.or_express}</p>
                        </div>
                        <div style={{clear:'both'}}></div>
                        <div className={styles.cbox}>
                            <p className={styles.pname}>物流单号</p>
                            <p className={styles.pcontent}>{tdata.or_express_num}</p>
                        </div>
                        <div style={{clear:'both'}}></div>
                    </div>
                </div>
            </div>
        )
    }
}