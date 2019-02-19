import React,{Component} from 'react';
import { Menu, Icon } from 'antd';
import {Link} from 'react-router-dom'
import './NavLeft.less'
const SubMenu = Menu.SubMenu;
class NavLeft extends Component{
    render(){
        return(
            <div className="navleft">
                <h2 className="title">用户管理系统</h2>
                <Menu
                    onClick={this.handleClick}
                    mode="inline"
                    theme= 'dark'
                >
                    <SubMenu  title={<span><Icon type="user-add" /><span>人员管理</span></span>}>
                        <Menu.Item key="1"><Link to="/userlist">用户</Link></Menu.Item>
                        <Menu.Item key="2">管理员</Menu.Item>
                    </SubMenu>
                    <SubMenu  title={<span><Icon type="mail" /><span>订单管理</span></span>}>
                        <Menu.Item key="3">订单列表</Menu.Item>
                    </SubMenu>
                    
                </Menu>
            </div>
        )
    }
}

export default NavLeft;