import React,{Component} from 'react';
import './header.less'
class Header extends Component{
    render(){
        return(
            <div className="header">
                <div className="container">
                    <span>用户名</span>
                    <a href="javascript:;">退出</a>
                </div>
                
            </div>
        )
    }
}

export default Header;