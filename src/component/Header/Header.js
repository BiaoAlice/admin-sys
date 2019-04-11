import React,{Component} from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import './header.less'
class Header extends Component{
    render(){
        let uName = localStorage.getItem("userName");
        return(
            <div className="header">
                <div className="container">
                    <span>{uName}</span>
                    <Link to="/" onClick = {()=>{this.props.exit(this)}}>退出</Link>
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
const mapDispatch = dispatch=>{
    return{
        
    }
}
export default connect(mapState,mapDispatch)(Header);