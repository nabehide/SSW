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
    case 'SET_FILE_NAMES':
      return {
        ...state,
        fileNames: action.fileNames,
      }
    default:
      return state
  }
}

export default rootReducer = combineReducers({
  file: fileReducer,
})
