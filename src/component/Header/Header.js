import React,{Component} from 'react';
import {connect} from 'react-redux'
import './header.less'
class Header extends Component{
    render(){
        return(
            <div className="header">
                <div className="container">
                    <span>{this.props.userName}</span>
                    <a href="javascript:;">退出</a>
                </div>
            </div>
        )
    }
}
const mapState=state=>{
    return{
        userName:state.userName
    }
}
export default connect(mapState,null)(Header);