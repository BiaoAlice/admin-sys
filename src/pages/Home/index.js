import React,{Component} from 'react';
import {Row, Col }from 'antd';
import Header from '../../component/Header/Header'
import NavLeft from '../../component/NavLeft/NavLeft'
import Title from '../../component/Title/Title'
import Content from '../../component/Content/Content'
import Footer from '../../component/Footer/Footer'
import '../../common.less'
class Home extends Component{
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
                        <Content />
                        <Footer />
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Home;