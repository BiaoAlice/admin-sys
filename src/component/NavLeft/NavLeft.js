import React,{Component} from 'react';
import { Menu, Icon } from 'antd';
import {NavLink} from 'react-router-dom'
import './NavLeft.less'
const SubMenu = Menu.SubMenu;

class NavLeft extends Component{
    render(){
        let aStyle = {
            color:"yellow"
        }
        return(
            <div className="navleft">
                <h2 className="title">用户管理系统</h2>
                <Menu
                    mode="inline"
                    theme= 'dark'
                >
                    <SubMenu title={<span><Icon type="user-add" /><span>人员管理</span></span>}>
                        <Menu.Item key="1"><NavLink activeStyle={aStyle} to="/userlist">用户</NavLink></Menu.Item>
                    </SubMenu>
                    <SubMenu title={<span><Icon type="mail" /><span>订单管理</span></span>}>
                        <Menu.Item key="2"><NavLink activeStyle={aStyle} to="/order">订单列表</NavLink></Menu.Item>
                    </SubMenu>
                </Menu>
            </div>
        )
    }
}

export default NavLeft;