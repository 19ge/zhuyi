import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Button ,Toast,TabBar} from 'antd-mobile';
import * as Shop from '../services/shop';
import styles from "./styles/Mine.less";
import MyTabBar from "../components/TabBar";
import * as fetch from '../services/shop';
import {APIHost,loggedIn} from "../utils/fetch";
import { template } from 'handlebars';
import m from '../assets/images/mb.png';
import m03 from '../assets/images/m03.png';
import icon1 from '../assets/images/m0.png';
import icon2 from '../assets/images/m1.png';
import icon3 from '../assets/images/m2.png';
import v04 from '../assets/images/xxx.png';
import icon4 from '../assets/images/m3.png';
import z04 from '../assets/images/c1.png';
import z05 from '../assets/images/c2.png';
import copy from 'copy-to-clipboard';




var queryString = require('querystring');
@connect(state => ({ shop: state.shop }))

export default class Mine extends Component {
    
    state={
        selectedTabBar:'mines' ,
        data:'',
        check:1,
        status:'',
        num:""
    }
    async componentDidMount(){
        Shop.huiyuan().then((result=>{
            const data=result.data;
            this.setState({data:data})
        }))
    }
    copyCode=(url)=>{
        copy(url);
        Toast.success("复制成功!如未成功请手动复制!",3);
    }
    yao(){
        const {dispatch}=this.props;
        dispatch(routerRedux.push('/Yaoqing'))
    }
    quxiao(){
        this.setState({
            check:1
        }) 
    }
    tan(){
        this.setState({
            check:0
        }) 
    }
    inputUsername(value){
        if(value!==""&&this.state.num!==""){
            this.setState({num:value});
          }else{
            this.setState({num:value});
          }
    }
    render(){ 
        const {history}=this.props;
        const {data,check}=this.state;
        const tabBarProps = {
            selectedTabBar: this.state.selectedTabBar,
            history
        }
        const displaynone={
			display:"none"
		}
		const displayblock={
			display:"block"
		}
        return(
            <div className={styles.App}>
                {/* 样式 */}
                <style>
                    {`
                        input::-webkit-input-placeholder {
                            color:#5DD075;
                            font-size:.28rem;
                        } 
                        .am-input-control{
                            border-bottom: 2px solid #5DD075;
                        }
                        .am-tab-bar-bar .am-tab-bar-tab{
                            display: flex;
                            flex-direction: row;
                        }
                        .zz{
                            padding-left: 0.2rem;
                            font-size: 0.28rem;
                            margin-top: -0.1rem;
                        }
                    `}
                </style>
                {/*底部标签栏*/}
                <MyTabBar {...tabBarProps}/>
                <div className={styles.top}>
                    <img src={m} />
                    <div className={styles.user}>
                        <dl>
                            <dt>
                                <img src={APIHost+data.us_head_image} />
                            </dt>
                            <dd>
                                <div className={styles.ddtop}>
                                    <span className={styles.name}>{data.us_nickname}</span>
                                    <span className={styles.fensi}>粉丝 {data.zhitui_count}</span>
                                </div>
                                <div className={styles.ddbot}>
                                    <span className={styles.name} >邀请码</span>
                                    <span className={styles.name} style={{paddingLeft:'0.2rem'}}>{data.us_id}</span>
                                    <span className={styles.dengji} onClick={()=>this.copyCode(data.us_id)}>复制</span>
                                </div>
                            </dd>
                        </dl>
                        <div className={styles.shezhi} onClick={()=>history.push('/Shezhi')}>
                            <img src={m03} />
                        </div>
                    </div>  
                    <div className={styles.tbot}>
                        <dl className={styles.dl}>
                            <dt className={styles.dt}>
                                <p className={styles.ptop}><span>收益</span><span>￥{data.us_jiangji}</span></p>
                            </dt>
                            <dd className={styles.dd} onClick={()=>this.tan()} >
                                立即提现
                            </dd>
                        </dl>
                        <div className={styles.shouyi}>
                            <div>
                                 <p className={styles.num}>￥ {data.us_cash}</p>
                                 <p className={styles.money}>余额</p>
                            </div>
                            <div>
                                 <p className={styles.num}>￥{data.today}</p>
                                 <p className={styles.money}>今日收益</p>
                            </div>
                        </div>
                        <div className={styles.xia}>
                            <p>上月收益 <span>￥{data.month}</span></p>
                        </div>
                        <div className={styles.box}>
                            <dl onClick={()=>history.push('/Earnings')}>
                                <dt>
                                   <img src={icon1} />
                                </dt>
                                <dd>收益</dd>
                            </dl>
                            <dl onClick={()=>history.push('/Order')}>
                                <dt>
                                   <img src={icon2} />
                                </dt>
                                <dd>订单</dd>
                            </dl>
                            <dl onClick={()=>history.push('/Fans')}>
                                <dt>
                                   <img src={icon3} />
                                </dt>
                                <dd>粉丝</dd>
                            </dl>
                            <dl onClick={()=>this.yao()}>
                                <dt>
                                   <img src={icon4} />
                                </dt>
                                <dd>邀请</dd>
                            </dl>
                        </div>
                    </div> 
                </div>
                <div className={styles.cc} style={check===1?displaynone:displayblock} onClick={()=>this.quxiao()}></div>
                <div className={styles.sss} style={check===1?displaynone:displayblock}>
                    <div className={styles.boxtitle}>
                        <h5>提现</h5>
                        <img src={v04} onClick={()=>this.quxiao()} />
                    </div>
                    <div className={styles.content}>
                        <div className={styles.cbox}>
                            <p className={styles.pname}>当前可提现金额</p>
                            <p className={styles.pcontent}>1000万</p>
                        </div>
                        <div style={{clear:'both'}}></div>
                        <div className={styles.input}>
                            <label>提现金额</label>
                            <input placeholder="请输入充值金额" />
                            <div style={{clear:'both'}}></div>
                        </div>
                        {/* 单选框 */}
                        <div className={styles.account}>
                            <label>提现账户</label>
                            <TabBar
                            unselectedTintColor="#949494"
                            tintColor="#5DD075"
                            barTintColor="white"
                            hidden={this.state.hidden}
                            >

                                <TabBar.Item
                                    title={
                                        <div className='zz'>支付宝</div>
                                    }
                                    key="Life"
                                    icon={
                                        <img src={z04} style={{
                                            width: '0.35rem',
                                            height: '0.35rem', 
                                        
                                        }}
                                    />
                                    }
                                    selectedIcon={
                                        <img src={z05} style={{
                                            width: '0.35rem',
                                            height: '0.35rem',         
                                        }}
                                    />
                                    }
                                    selected={this.state.selectedTab === '2'}
                                    onPress={() => {
                                    this.setState({
                                        selectedTab: '2',
                                    });
                                    }}
                                    data-seed="logId"
                                >
                                </TabBar.Item>
                                <TabBar.Item
                                icon={
                                        <img src={z04} style={{
                                            width: '0.3rem',
                                            height: '0.3rem',         
                                        }}
                                    />
                                }
                                selectedIcon={
                                        <img src={z05} style={{
                                            width: '0.3rem',
                                            height: '0.3rem',         
                                        }}
                                    />
                                    }
                                    title={
                                        <div className='zz'>微信</div>

                                    }
                                    key="Koubei"
                                
                                    selected={this.state.selectedTab === '3'}
                                    onPress={() => {
                                    this.setState({
                                        selectedTab: '3',
                                    });
                                    }}
                                    data-seed="logId1"
                                >
                                </TabBar.Item>
                            </TabBar>
                        </div>
                        
                        <div className={styles.input}>
                            <label>交易密码</label>
                            <input type='password' placeholder="请输入交易密码" />
                            <div style={{clear:'both'}}></div>
                        </div>
                       
                        <div>
                            <button className={styles.button}>提现</button>
                        </div>
                        
                    </div>
                </div>
            </div>
        )
    }
}