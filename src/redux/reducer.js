const defaultState = {
    date:'',
    selectedRowKeys: [], // Check here to configure the default column
    loading: false,
    userName:'',
    userPsd:'',
    list:[],
    visible:false,
    newuserName:'',
    newuserPsd:'',
    newuserId:'',
    orderList:[],
    selected:[]
}
export default (state = defaultState, action)=>{
    switch (action.type){
        case "changeTime":
            let newState = {...state};
            newState.date = action.time;
            return newState;
        case "changeTable":
            newState= { ...state};
            newState.selectedRowKeys = action.e;
            return newState;
        case "userName":
            newState= { ...state}; 
            newState.userName = action.val;
            return newState;
        case "userPsd":
            newState= { ...state};
            newState.userPsd = action.val;
            return newState;
        case "login":
            newState= { ...state};
            newState.userName = action.userName;
            return newState;
        case "showlist":
            newState= { ...state};
            console.log(action.list);
            newState.list = action.list;
            return newState;
        case "changeshow":
            newState= { ...state};
            newState.visible = true;
            return newState;
        case "cancel":
            newState= { ...state};
            newState.visible = false;
            return newState;
        case "newuserName":
            newState= { ...state}; 
            newState.newuserName = action.val;
            return newState;
        case "newuserPsd":
            newState= { ...state};
            newState.newuserPsd = action.val;
            return newState;
        case "newuserId":
            newState= { ...state};
            newState.newuserId = action.val;
            return newState;
        case "adduser":
            newState= { ...state};
            newState.newuserId = '';
            newState.newuserPsd = '';
            newState.newuserName = '';
            newState.visible = false;
            return newState;
        case "removeuser":
            newState= { ...state};
            newState.selectedRowKeys =[];
            return newState;
        case "showOrderList":
            newState= { ...state};
            console.log(action.list);
            newState.orderList =action.list;
            return newState;
        case "changeOrderList":
            newState= { ...state};
            newState.selected = action.e;
            return newState;
        default:
            return state;
    }
}