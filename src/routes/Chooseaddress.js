import React, {Component} from 'react';
import {connect} from 'dva';
import { Button, Modal,Carousel, Toast, WingBlank,Checkbox,Stepper} from 'antd-mobile';
import {loggedIn, loginOut, APIHost} from '../utils/fetch';
import * as fetch from '../services/shop';
import {routerRedux} from 'dva/router';
import MyNavBar from "../components/MyNavBar";
import Goods from '../components/Goods';
import styles from "./styles/Chooseaddress.less";
import icon2  from '../assets/images/zb.png';
import icon9 from '../assets/images/bb.png';
import icon10 from '../assets/images/shan.png';
import icon01 from '../assets/images/bian.png';
import v04 from '../assets/images/g03.png';
import v07 from '../assets/images/huo.png';
import c1 from '../assets/images/c1.png';
import c2 from '../assets/images/c2.png';
import Shopcar from './Shopcar';
// import {login} from '../utils/fetch';
var queryString = require('querystring');
@connect(state => ({shop: state.shop}))
export default class Chooseaddress extends Component {  
    state = {
        data:"",
        state:1,
        checked:""
      } 
    async componentDidMount(){
        const result=await fetch.caddress();
        const data=result.data
        data?data.map((item,index)=>{
            console.log(item,'item999')
            if(item.type==1){
                // item.checked==true
                var c=document.getElementById('p');
                console.log(c,'ccccc')
            }else{
                item.checked==false

            }
        }):""
        this.setState({data:data});

    }
    async delete(id){
        const {data}=this.state;
        const result=await fetch.deladdress({id:id});
        if(result.code==1){
            Toast.success(result.msg,2,()=>{
                data?data.map((itm,index)=>{
                    if(itm.id==id){
                        data.splice(index,1)
                    }
                }):""
                this.setState({data:data})
            })
        }else{
            Toast.offline(result.msg,2)
        }
        // this.setState({data:result.data})
    }
    //设为默认
//     async setDefault(e,index,item,id,){
//         console.log(item,'item')
//         const {data}=this.state;
//         this.setState({index})
//         let a=localStorage.setItem('index',index);
//         console.log(a,'ccccccccc')
//         this.setState({show:!this.state.show});
//         console.log(show,'thisda')
//         const {dispatch}=this.props;
//         let isDefault=e.target.checked;
//         item.checked=isDefault;
//        let value=await fetch.maddress({id});
//        if(value.code==1){
//            Toast.success(value.msg,1)
                
       
//            dispatch({
//                type:'shop/defau',
//                payload:{
//                    isDefault,
//                    index,
//                    id:id
//                }
//            })
//        }else{
//            Toast.fail(value.msg,1);
//        }

//    }
    async setDefault(e,index,item,id){
        const {data}=this.state;
        // console.log(item,'itemmmmmmm')
        console.log(index,'ht')
        this.setState({index})
        let a=localStorage.setItem('index',index);
        // console.log(a,'ccccccccc')
        //   this.setState({show:!this.state.show})
        console.log(e.target.checked,'111')
        const {dispatch}=this.props;
        let isDefault=e.target.checked;
        console.log(isDefault,'@@@@')
        let sql={id:item.id,isDefault};
        let value=value=await fetch.maddress(sql);
        if(value.code==1){
            Toast.success(value.msg,1);
            const mm=await fetch.caddress();
            const mdata=mm.data;
            mdata?mdata.map((ite,ind)=>{
                // console.log(ite,'itmmm8888')
                if(ite.id==id){
                    ite.check=isDefault;
                }else{
                    // ite.check=isDefault;
                }
                
            }):""
            this.setState({data:mdata});
            // console.log(this.state.data,'ppppppp')

            // dispatch({
            //     type:'shop/maddress',
            //     payload:{
            //         isDefault,
            //         index,
            //         id:item.id
            //     }
            // })
        }else{
            Toast.fail(value.msg,1);
        }
    }
    tiao(id){
        const {dispatch}=this.props;
        dispatch(routerRedux.push('/Editaddress?id='+id))
    }
    


  

    render(){
    
        const {history,dispatch,shop}=this.props;
        const {data}=this.state;
        // console.log(this.state.data,'************')
        const navBarProps = {
            leftVisible:true,
            leftFunc(){
                history.go(-1)
              },
           
            titleName:"选择地址",
            rightContent:"",
            rightFunc(){
            }
        }
        // const displaynone={
		// 	display:"none"
		// }
		// const displayblock={
		// 	display:"block"
        // }
        return(
            <div className={styles.App}>
                 {/* 样式 */}
                 <style>
                    {`
                    
                    .am-checkbox.am-checkbox-checked .am-checkbox-inner{
                        border-color: #5DD075;
                        background: #5DD075;
                    }
                    
                    `}
                </style>
                {/*头部导航栏*/}
                <MyNavBar {...navBarProps}/> 
                <div style={{paddingBottom:"1.3rem"}}>
                {
                    this.state.data?this.state.data.map((item,index)=>{
                        const id=item.id
                        return(
                            <div className={styles.address}>
                                <div className={styles.left}>
                                <Checkbox checked={(parseInt(localStorage.getItem('index')))===index?true:false} onChange={e=>this.setDefault(e,index,item,id)}  className={styles.editL}>
                                </Checkbox>
                                </div>
                                <dl>
                                    <dt>
                                        <div className={styles.sperson}>
                                            <span>收货人</span>
                                            <span className={styles.aname}>{item.us_name}</span>
                                            <span className={styles.atel}>{item.us_tel}</span>
                                        </div>
                                        
                                        <p>{item.us_detailed}</p>
                                    
                                    </dt>
                                    <dd>
                                    <img src={icon10} onClick={()=>this.delete(item.id)} />
                                    <img src={icon01}  style={{marginLeft:'0.59rem'}} onClick={()=>this.tiao(id) }/>
                                    </dd>
                                    <div style={{clear:'both'}}></div>
                                </dl>
                                <div style={{clear:'both'}}></div>
                            </div>
                         )

                    }):""
                }
                </div>
                
                
                <button className={styles.button} onClick={()=>history.push('/Taddress')}>添加新地址</button>
            </div>
        )
    }
}