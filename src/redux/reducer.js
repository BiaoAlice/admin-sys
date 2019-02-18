const defaultState = {
    date:'',
    selectedRowKeys: [], // Check here to configure the default column
    loading: false
}
export default (state = defaultState, action)=>{
    switch (action.type){
        case "changeTime":
            let newState = {...state};
            newState.date = action.time;
            return newState;
        case "changeTable":
            newState= { ...state};
            console.log(action.e);
            newState.selectedRowKeys = action.e;
            return newState;
        default:
            return state;
    }
}