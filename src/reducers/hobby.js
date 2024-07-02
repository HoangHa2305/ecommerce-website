const initialState = {
    list: localStorage.getItem("qty"),
    activeId: null
}

const hobbyReducer = (state = initialState, action) => {

    // console.log(action);

    switch(action.type){
        case "ADD_HOBBY":{
            // const newList = [...state.list];
            // newList.push(action.payload);
            

            localStorage.setItem("qty",JSON.stringify(action.payload));

            return {
                ...state,
                
                list:action.payload 
            }
        }
            
        default:
            return state;
    }
};
export default hobbyReducer;