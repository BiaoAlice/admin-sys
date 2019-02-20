import React , {Component} from 'react';
import {connect} from 'react-redux'
import { Table, Button ,Modal,Form, Icon, Input, message,} from 'antd';
import axios from 'axios';
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
  }];
 
class UserList extends Component{
    componentDidMount(){
        axios.get('/order/getorder')
             .then(res=>{
                    console.log(res.data.data);
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
        selected:state.selected
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
        onSelectChange(e){
            const action={
                type:"changeOrderList",
                e
            }
            dispatch(action);
        }
    }
}
export default connect(mapState,mapDispatch)(UserList);