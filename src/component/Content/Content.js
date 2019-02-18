import React , {Component} from 'react';
import './content.less'
class Content extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="content">
                <div className="container">
                    <h2>欢迎来到用户管理系统</h2>
                </div>
            </div>
        )
    }
}

export default Content;