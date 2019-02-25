import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import styles from "./styles/Fenlei.less";
import * as Shop from '../services/shop';
// import icon01 from '../assets/images/b.png';
// import icon09 from '../assets/images/v.png';
import { Tabs, WhiteSpace,Stepper ,List,TextareaItem } from 'antd-mobile';
import {loggedIn, loginOut, APIHost} from '../utils/fetch';
import icon2 from '../assets/images/search.png';
import v01 from '../assets/images/g06.png';
import MyTabBar from "../components/TabBar";
var queryString = require('querystring');

@connect(state => ({ shop: state.shop }))
export default class Fenlei extends Component {
    constructor(props) {
        super(props);
        this.state = { 
          checked:1,
          selectedTabBar: "trading",
          ldata:"",
          rdata:'',
          id:''
        }
    }
    async componentDidMount(){
        const result=await Shop.sfen()
        const data=result.data;
        this.setState({ldata:result.data.cate,rdata:result.data.child,rdata2:result.data.child[0]})   
    }
    async getGoodsListOfClass(item,index){
            const aaa=await Shop.sfen({id:item.id});
            const list =aaa.data.child;
            this.setState({
                rdata:list,
            })
    }
    tiao(id){
        const {dispatch}=this.props;
        dispatch(routerRedux.push('/Carmera?id='+id))
    }
    async searchFunc(v) {
        var evt = window.event || v; 
        if(evt.keyCode == 13){
            console.log(v.target.value,'ffffffffffffffff');
            const d=v.target.value;
            this.setState({d:d})
            const {dispatch}=this.props;
            dispatch(routerRedux.push('/Carmera?value='+d))
        }else{

        }
        
    }
      //商品详情
    render(){
        const {DATA,ldata,rdata,rdata2}=this.state;
        const {history,dispatch}=this.props;
        const tabBarProps = {
            selectedTabBar: this.state.selectedTabBar,
            history
        }
        let tabs = [];
            console.log(ldata,'ldata')        
        ldata?ldata.map(function(item){
            // const id=item.id;
            // console.log(item.title,'item');
            item.title = item.fl_name;
            tabs.push(item);
        }):''
        
        return(
            <div className={styles.App}>
                <style>
                        {`
                        .am-tabs-default-bar-tab{
                            color:#827F7F;
                            border-bottom:1px solid #CDCDCD;
                        }
                        .am-tabs-tab-bar-wrap{
                            width:1.6rem;
                        }
                        .am-tabs-default-bar-left{
                            background-color:#F0F0F0 !important;
                        }
                        .am-tabs-default-bar-tab-active{
                            color:#FFFFFF;
                            background:#5DD075;
                        }
                        .am-stepper{
                            height: 0.5rem;
                            min-height: 0.5rem;
                        }
                      
                        .title{
                            color:#201F1F;
                            font-size:0.26rem;
                        }
                        .content{
                            width:3rem; 
                            color:#827F7F;
                            font-size:0.24rem;
                            padding-left:0.15rem;
                        }
                        .am-list-item,.am-list-item .am-list-line{
                            width:2rem;
                            display: inherit;
                        }
                        .am-stepper-handler{
                            width:0.39rem;
                            height: 0.39rem;
                            line-height: 0.39rem;
                            border-radius:50% !important;
                        }
                        .am-icon-xxs{
                            width: 0.2rem;
                            height: 0.3rem;  
                        }
                        .am-stepper-handler-down {
                            background:rgba(255,222,158,1);
                        }
                        .am-stepper-handler-up {
                            background:rgba(255,168,0,1);
                        }
                        .am-list-item{
                            min-height:auto;
                            position: relative;
                            top: 0.74rem;
                            float:right;
                        }
                        .am-stepper-input{
                            margin-top:-0.18rem;
                        }
                        .am-list-item .am-list-line .am-list-extra{
                            padding:0;
                        }
                        .am-icon-plus{
                            color:white;
                        }
                        .am-icon-minus{
                            color:#3C3C3C;
                        }
                        .am-stepper-handler-down-disabled, .am-stepper-handler-up-disabled{
                            opacity:0.1;
                        }
                        .bgimg{
                            position: absolute;
                            top: 0;
                            left: 0;
                        }
                        .bgimg img{
                            width:7.5rem;
                        }
                        .am-whitespace.am-whitespace-md{
                            height:0;
                        }
                        `}
                    </style>
                    {/*底部标签栏*/}
                <MyTabBar {...tabBarProps} />
                <div className={styles.top}>
                    <img className={styles.search} src={icon2} />
                    <input placeholder='请输入您想要的商品' onKeyDown={(v)=>this.searchFunc(v)} />
                </div>
                <div className={styles.middle} >
                    <WhiteSpace />
                    <Tabs tabs={tabs}
                    initalPage={'t2'}
                    tabBarPosition="left"
                    tabDirection="vertical"
                    onChange={(tab, index) => { this.getGoodsListOfClass(tab,index) }}
                    >
                       
                        <div style={{ display: 'flex',flexDirection: 'column' , backgroundColor: '#fff' }}>
                            <div className={styles.product}>
                                {
                                    rdata?rdata.map((item,index)=>{
                                        return(
                                            <dl onClick={()=>this.tiao(item.id)}>
                                                <dt>
                                                    <img src={APIHost+item.fl_image} />
                                                </dt>
                                                <dd>{item.fl_name}</dd>
                                            </dl>
                                        )
                                        
                                    }):rdata2
                                }
                            </div>
                        </div>
                    </Tabs>
                    <WhiteSpace />
                </div>
            </div>
        )
    }
}