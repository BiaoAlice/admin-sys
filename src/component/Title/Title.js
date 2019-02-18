import React , {Component} from 'react'
import {connect} from 'react-redux'
import './title.less'
class Title extends Component{
    render(){
        let _this = this;
        setInterval(function(){
            _this.props.changeDate();
        },1000)
        return(
            <div className="titleDate">
                <h3>首页</h3>
                <span>{this.props.date}</span>
            </div>
        )
    }
}

const mapState =(state)=>{
    return{
        date:state.date
    }
}
const mapDispatch=dispatch=>{
    return{
        changeDate(){
            function dateFtt(fmt,date)   
                { //author: meizz   
                var o = {   
                    "M+" : date.getMonth()+1,                 //月份   
                    "d+" : date.getDate(),                    //日   
                    "h+" : date.getHours(),                   //小时   
                    "m+" : date.getMinutes(),                 //分   
                    "s+" : date.getSeconds(),                 //秒   
                    "q+" : Math.floor((date.getMonth()+3)/3), //季度   
                    "S"  : date.getMilliseconds()             //毫秒   
                };   
                if(/(y+)/.test(fmt))   
                    fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));   
                for(var k in o)   
                    if(new RegExp("("+ k +")").test(fmt))   
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
                return fmt;   
                } 
            let time = dateFtt("yyyy-MM-dd hh:mm:ss",new Date());
            const action={
                type:'changeTime',
                time
            }
            dispatch(action);
        }
    }
}
export default connect(mapState,mapDispatch)(Title);