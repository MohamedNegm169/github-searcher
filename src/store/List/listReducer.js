const initialState={
  searchList:[]
}
export default function listReducer(state = initialState, action) {
    switch (action.type) {
      case 'SET_LIST':
        return {...action.state,searchList:action.payload}
      default:
        return state
    }
  }