/*
 * @Author: 杜梦 
 * @Date: 2018-07-02 17:17:46 
 * @Last Modified by: 杜梦
 * @Last Modified time: 2018-07-02 18:13:21
 */
import React from 'react';
import PropTypes from 'prop-types';
import styles from "./styles/tabBar.less";
import {loggedIn, loginOut, APIHost} from '../utils/fetch';
import { routerRedux } from 'dva/router';

// 图标资源
import Tab3 from "../assets/images/s.png";
import Tab31 from "../assets/images/s.png";
import Tab2 from "../assets/images/s2.png";
import Tab21 from "../assets/images/tab21.png";
import Tab1 from "../assets/images/tab1.png";
import Tab11 from "../assets/images/s1.png";
import Tab4 from "../assets/images/s3.png";
import Tab41 from "../assets/images/s03.png";
import Tab5 from "../assets/images/b5.png";
import Tab51 from "../assets/images/b50.png";
// 子项可增删,样式自适应
// selectedTabBar:活动的tab,string
// history ,传入history用于点击跳转

const MyTabBar=({selectedTabBar,history}) =>{
    // export default class Myteam extends Component{

    // }

    // async yesFunc(){
    //     alert(1)
    // }
    // render()
    return(
        <div className={styles.tabBarBox}>

            <div className={styles.tabBarItem} onClick={()=>history.push('/')}>
                <img src={selectedTabBar=='shop'?Tab11:Tab1}></img>
                <span className={selectedTabBar=='shop'?styles.textActive:""}>首页</span>
            </div>

            <div className={styles.tabBarItem}
            onClick={()=>{
                if(loggedIn() && loggedIn().username){
                             history.push('/Fenlei')
                            }
                            else{
                                if(window.confirm("请您先登录"))
                                {
                                    history.push('/login')
                                    
                                }else
                                {
                                    
                                    
                                }
                            }
                        }
                    }
             
            >
                <img src={selectedTabBar=='trading'?Tab21:Tab2}></img>
                <span className={selectedTabBar=='trading'?styles.textActive:""}>分类</span>
            </div>

            <div className={styles.tabBarItem} onClick={()=>{
                if(loggedIn() && loggedIn().username){
                    history.push('/Personal')
                   }
                   else{
                       if(window.confirm("请您先登录"))
                       {
                           history.push('/login')
                           
                       }else
                        {
                        
                           
                       }
                   }
            }}>
                <img style={{width:'1.07rem',height:'1.07rem',position:'absolute',top:'-0.6rem'}} src={selectedTabBar=='mine'?Tab31:Tab3}></img>
                <span style={{marginTop:'0.53rem'}} className={selectedTabBar=='mine'?styles.textActive:""}>熊猫乐园</span>
            </div>
            <div className={styles.tabBarItem}
            onClick={()=>{
                if(loggedIn() && loggedIn().username){
                             history.push('/Shopcar')
                            }
                            else{
                                if(window.confirm("请您先登录"))
                                {
                                    history.push('/login')
                                    
                                }else
                                {
                                    
                                    
                                }
                            }
                        }
                    }
             
            >
                <img src={selectedTabBar=='shoping'?Tab41:Tab4}></img>
                <span className={selectedTabBar=='shoping'?styles.textActive:""}>购物车</span>
            </div>
            <div className={styles.tabBarItem}
            onClick={()=>{
                if(loggedIn() && loggedIn().username){
                             history.push('/Mine')
                            }
                            else{
                                if(window.confirm("请您先登录"))
                                {
                                    history.push('/login')
                                    
                                }else
                                {
                                    
                                    
                                }
                            }
                        }
                    }
             
            >
                <img src={selectedTabBar=='mines'?Tab51:Tab5}></img>
                <span className={selectedTabBar=='mines'?styles.textActive:""}>我的</span>
            </div>


        </div>
    )
}
MyTabBar.propTypes = {
    
}
export default MyTabBar