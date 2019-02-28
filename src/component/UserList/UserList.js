import React , {Component} from 'react';
import {connect} from 'react-redux'
import { Table, Button ,Modal,Form, Icon, Input, message,} from 'antd';
import './index.less'
import axios from 'axios';
import xlsx from 'xlsx'
import { fileToObject } from 'antd/lib/upload/utils';

const columns = [{
    title: '学号',
    dataIndex: 'studentId',
  }, {
    title: '姓名',
    dataIndex: 'studentName',
  }, {
        title: '登录密码',
        dataIndex: 'studentPsd',
  },{
    title: '支付密码',
    dataIndex: 'studentPayPsd',
  },{
    title: '余额',
    dataIndex: 'balance',
  }];
 
  
class UserList extends Component{
    componentDidMount(){
        axios.get('/user/get')
             .then(res=>{
                    let arr =res.data.data.reverse();
                    this.props.showList(arr);
                })
    }
    render(){
        const {  selectedRowKeys } = this.props;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.props.onSelectChange,
          };
          const hasSelected = selectedRowKeys.length > 0;
        return(
            <div className="content">
                <div className="container">
                <div style={{ marginBottom: 16 }}>
                    <span>用户列表信息</span>
                    <span style={{ marginLeft: 8 }}>
                            {hasSelected ? `已选择 ${selectedRowKeys.length} 个用户` : ''}
                    </span><br/>
                    <div style={{textAlign:"left",paddingLeft:10,marginBottom:20}}>
                        <Button type="primary" style={{marginRight:10}} onClick={this.props.handleChangeShow} >创建用户</Button>
                        <input type="file" accept=".xlsx,.xls" onChange={(e)=>{this.props.onImportExcel(e,this)}}/>
                        <Button type="danger" style={{marginRight:10}} onClick={()=>{this.props.handleDelete(selectedRowKeys,this)}}>删除用户</Button>
                    </div>
                </div>
                    <Table rowSelection={rowSelection} columns={columns} dataSource={this.props.list} />
                </div>
                <Modal
                    title="添加用户"
                    visible={this.props.visible}
                    onOk={()=>{this.props.handleOk(this)}}
                    onCancel={this.props.handleCancel}
                    >
                    <Form className="login-form">
                        <h2 className="h2">用户管理系统</h2>
                        <Form.Item>
                            <Input value={this.props.newuserName} onChange={this.props.changeNewUserName} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                        </Form.Item>
                        <Form.Item>
                            <Input value={this.props.newuserId} onChange={this.props.changeNewUserId} prefix={<Icon type="highlight" style={{ color: 'rgba(0,0,0,.25)' }}  />} placeholder="Userid" />
                        </Form.Item>
                        <Form.Item>
                            <Input value={this.props.newuserPsd} type="password" onChange={this.props.changeNewUserPsd} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Userpassword" />
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        )
    }
}
const mapState = state=>{
    return{
        loading:state.loading,
        selectedRowKeys:state.selectedRowKeys,
        list:state.list,
        visible:state.visible,
        newuserName:state.newuserName,
        newuserPsd:state.newuserPsd,
        newuserId:state.newuserId
    }
}
const mapDispatch=dispatch=>{
    return{
        onSelectChange(e){
            const action = {
                type:'changeTable',
                e
            }
            dispatch(action)
        },
        changeUserMsg(num){
            if(num>1){
                alert('只能选择一个用户进行编辑')
            }else{
                alert('编辑成功！');
            }
        },
        showList(list){
            const action={
                type:'showlist',
                list
            }
            dispatch(action);
        },
        handleChangeShow(){
            const action={
                type:'changeshow'
            }
            dispatch(action);
        },
        handleCancel(){
            const action={
                type:'cancel'
            }
            dispatch(action);
        },
        changeNewUserName(e){
            const action={
                type:'newuserName',
                val:e.target.value
            }
            dispatch(action);
        },
        changeNewUserPsd(e){
            const action={
                type:'newuserPsd',
                val:e.target.value
            }
            dispatch(action);
        },
        changeNewUserId(e){
            const action={
                type:'newuserId',
                val:e.target.value
            }
            dispatch(action);
        },
        handleOk(_this){
           let reg=/^\d{12}$/,
                nameReg = /^[\u4E00-\u9FA5]{2,4}$/,
                {newuserId,newuserName,newuserPsd} = _this.props;
            if(reg.test(newuserId) && nameReg.test(newuserName)&& newuserPsd.length>5){
                axios.post('/user/add',{
                    studentId:newuserId,
                    studentName:newuserName,
                    studentPsd:newuserPsd
                })
                .then(res=>{
                    if(res.data.code == '0'){
                        message.error(res.data.msg);
                    }else{
                        message.success("用户添加成功");
                        axios.get('/user/get')
                        .then(res=>{
                               let arr =res.data.data.reverse();
                               _this.props.showList(arr)
                           })
                        const action={
                            type:'adduser'
                        }
                        dispatch(action);
                       
                    }
                })
            }else{
                message.error("请填写正确的信息");
            }
        },
        handleDelete(e,_this){
            let {list} =_this.props;
            console.log(e.length)
            if(e.length==0){
                message.info("请选择要删除的人员");
                return;
            }
            let arr = [];
            for(let i = 0;i<e.length;i++){
                list.forEach((item,index) => {
                    if(index == e[i]){
                        arr.push(item)
                    }
                });
            }
            axios.post('/user/remove',{
                list:arr
            })
            .then(res=>{
                axios.get('/user/get')
                        .then(res=>{
                               let arr =res.data.data.reverse();
                               _this.props.showList(arr)
                           })
                const action={
                    type:'removeuser'
                }
                dispatch(action)
            })
        },
        onImportExcel(file,_this){
            // 获取上传的文件对象
            const { files } = file.target;
            // 通过FileReader对象读取文件
            const fileReader = new FileReader();
            fileReader.onload = event => {
              try {
                const { result } = event.target;
                // 以二进制流方式读取得到整份excel表格对象
                const workbook = xlsx.read(result, { type: 'binary' });
                let data = []; // 存储获取到的数据
                // 遍历每张工作表进行读取（这里默认只读取第一张表）
                for (const sheet in workbook.Sheets) {
                  if (workbook.Sheets.hasOwnProperty(sheet)) {
                    // 利用 sheet_to_json 方法将 excel 转成 json 数据
                    data = data.concat(xlsx.utils.sheet_to_json(workbook.Sheets[sheet]));
                    // break; // 如果只取第一张表，就取消注释这行
                  }
                }
                axios.post('/user/addexcel',{
                    data
                }).then(res=>{
                    if(res.data.code == 1){
                        message.success("批量添加成功");
                    }
                    
                    axios.get('/user/get')
                    .then(res=>{
                           let arr =res.data.data.reverse();
                           _this.props.showList(arr);
                       })
                })
                     
              } catch (e) {
                // 这里可以抛出文件类型错误不正确的相关提示
                message.info("请选择excel表格");
                return;
              }
            };
            // 以二进制方式打开文件
            fileReader.readAsBinaryString(files[0]);
            file.target.value='';
          }
    }
}
export default connect(mapState,mapDispatch)(UserList);