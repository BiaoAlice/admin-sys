import React,{Component} from 'react';
import {Row, Col }from 'antd';
import Header from '../../component/Header/Header'
import NavLeft from '../../component/NavLeft/NavLeft'
import Title from '../../component/Title/Title'
import UserList from '../../component/UserList/UserList'
import Footer from '../../component/Footer/Footer'
import '../../common.less'
class User extends Component{
    render(){
        return(
            <div className="home">
                <Row className="box">
                    <Col span={4} className="navleft">
                        <NavLeft  />
                    </Col>
                    <Col span={20} className="colright">
                        <Header />
                        <Title />
                        <UserList />
                        <Footer />
                    </Col>
                </Row>
            </div>
        )
    }
}

export default User;