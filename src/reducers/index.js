import { combineReducers } from 'redux'

const initState = {
  newFileName: "filename",
  fileNames: [],
}

const fileReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CHANGE_NEW_FILE_NAME':
      return {
        ...state,
        newFileName: action.newFileName,
      }
    case 'ADD_FILE_NAMES':
      return {
      }
    default:
      return state
  }
}

export default rootReducer = combineReducers({
  file: fileReducer,
})
