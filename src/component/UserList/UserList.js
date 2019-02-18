import React , {Component} from 'react';
import {connect} from 'react-redux'
import { Table, Button } from 'antd';
const columns = [{
    title: 'Name',
    dataIndex: 'name',
  }, {
    title: 'Age',
    dataIndex: 'age',
  }, {
    title: 'Address',
    dataIndex: 'address',
  }];
  
  const data = [{
      name:'ly',
      age:'32',
      address:'123123123'
  },{
    name:'ly',
    age:'32',
    address:'123123123'
},{
    name:'ly',
    age:'32',
    address:'123123123'
},{
    name:'ly',
    age:'32',
    address:'123123123'
},{
    name:'ly',
    age:'32',
    address:'123123123'
},{
    name:'ly',
    age:'32',
    address:'123123123'
},{
    name:'ly',
    age:'32',
    address:'123123123'
},{
    name:'ly',
    age:'32',
    address:'123123123'
},{
    name:'ly',
    age:'32',
    address:'123123123'
},{
    name:'ly',
    age:'32',
    address:'123123123'
},{
    name:'ly',
    age:'32',
    address:'123123123'
},
];
 
  
class UserList extends Component{
    render(){
        const { loading, selectedRowKeys } = this.props;
        console.log(this.props);
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
                        <Button type="primary" style={{marginRight:10}}>创建用户</Button>
                        <Button type="primary" style={{marginRight:10}} onClick = {()=>this.props.changeUserMsg(selectedRowKeys.length)}>编辑用户</Button>
                        <Button type="danger" style={{marginRight:10}}>删除用户</Button>
                    </div>
                </div>
                    <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
                </div>
            </div>
        )
    }
}
const mapState = state=>{
    return{
        loading:state.loading,
        selectedRowKeys:state.selectedRowKeys
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
            console.log(num);
        }
    }
}
export default connect(mapState,mapDispatch)(UserList);