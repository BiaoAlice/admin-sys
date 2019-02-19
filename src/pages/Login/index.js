import React,{Component} from 'react';
import {connect} from 'react-redux'
import {
    Form, Icon, Input, Button, message,
  } from 'antd';
import axios from 'axios'
import './login.less'
class Login extends Component{
    render(){
        return(
            <div className="login">
                <div className="login_form">
                <Form className="login-form">
                    <h2 className="h2">用户管理系统</h2>
                    <Form.Item>
                        <Input value={this.props.userName} onChange={this.props.changeUserName} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item>
                        <Input value={this.props.userPsd} type="password" onChange={this.props.changeUserPsd} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Userpassword" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button" onClick={()=>this.props.onSubmit(this.props.userName,this.props.userPsd,this)}>
                            登录
                        </Button>
                    </Form.Item>
                </Form>
                </div>
            </div>
        )   
    }
}
const mapState=state=>{
    return{
        userName:state.userName,
        userPsd:state.userPsd
    }
}
const mapDispatch=dispatch=>{
    return{
        changeUserName(e){
            const action={
                type:'userName',
                val:e.target.value
            }
            dispatch(action);
        },
        changeUserPsd(e){
            const action={
                type:'userPsd',
                val:e.target.value
            }
            dispatch(action);
        },
        onSubmit(name,psd,_this){
            if(name == '' && psd == ''){
                message.error('请填写正确的用户名/密码');
                return ;
            }
             axios.post('/admin/getuser',{
                userName:name,
                userPsd:psd
             })
                  .then(res=>{
                      if(res.data.code == '0'){
                            message.error(res.data.msg);
                            return;
                      }else{
                        message.success(res.data.msg);
                        const action={
                            type:"login",
                            userName: res.data.userName
                        }
                        dispatch(action);
                        _this.props.history.push('/home');
                      }
                  })
            
        }
    }
}
export default connect(mapState,mapDispatch)(Login);