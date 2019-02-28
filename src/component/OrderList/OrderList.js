import React , {Component} from 'react';
import {connect} from 'react-redux'
import { Table, Button , Input,message} from 'antd';
import axios from 'axios';
import './orderlist.less'
const columns = [{
    title: '订单号',
    dataIndex: 'orderId',
  }, {
    title: '学号',
    dataIndex: 'studentId',
  }, {
        title: '姓名',
        dataIndex: 'name',
  },{
      title:'电话',
      dataIndex:'tell'
  },{
      title:"出发城市",
      dataIndex:"msg.start"
  },{
    title:"到达城市",
    dataIndex:"msg.end"
},{
    title:"出发时间",
    dataIndex:"msg.time"
},{
    title:"具体时刻",
    dataIndex:"msg.startTime"
}];
 
class UserList extends Component{
    componentDidMount(){
        axios.get('/order/getorder')
             .then(res=>{
                    this.props.showOrder(res.data.data);
                })
    }
    render(){
        const {  selected } = this.props;
        const rowSelection = {
            selected,
            onChange: this.props.onSelectChange,
          };
          const hasSelected = selected.length > 0;
        return(
            <div className="content">
                <div className="container">
                    <div className="search">
                        <Input type="text" value={this.props.val} onChange={this.props.changeInput} placeholder="请输入学生姓名"/>
                        <Button type="primary" className="searchBtn" icon="search" onClick={()=>{this.props.search(this)}}>搜索</Button>
                        <Button type="primary" onClick={this.props.show} icon="bars">全部订单</Button>
                    </div>
                    <div style={{ marginBottom: 16 }}>
                        <span>订单列表信息</span>
                        <span style={{ marginLeft: 8 }}>
                                {hasSelected ? `已选择 ${selected.length} 个订单` : ''}
                        </span><br/>
                    </div>
                    <Table rowSelection={rowSelection} columns={columns} dataSource={this.props.list} />
                </div>
                
            </div>
        )
    }
}
const mapState = state=>{
    return{
        list:state.orderList,
        selected:state.selected,
        val:state.val
    }
}
const mapDispatch =dispatch =>{
    return{
        showOrder(list){
            const action={
                type:"showOrderList",
                list
            }
            dispatch(action);
        },
        show(){
            axios.get('/order/getorder')
             .then(res=>{
                const action={
                    type:"showOrderList",
                    list:res.data.data
                }
                dispatch(action);
            })
            
        },
        onSelectChange(e){
            const action={
                type:"changeOrderList",
                e
            }
            dispatch(action);
        },
        changeInput(e){
            const action = {
                type:"changeInput",
                val:e.target.value
            }
            dispatch(action);
        },
        search(){
            let _this = this,
                name = _this.val,
                nameReg = /^[\u2E80-\u9FFF]+$/;
            if(nameReg.test(name)){
                axios.get('/order/sreachorder',{
                    params:{
                        name
                    }
                })
                    .then(res=>{
                        message.success("搜索成功");
                        _this.showOrder(res.data.data);
                    })
                const action = {
                    type:"search"
                }
                dispatch(action);
            }else{
                message.error("请输入中文");
            }
        }
    }
}
export default connect(mapState,mapDispatch)(UserList);