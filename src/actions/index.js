export const changeNewFileName = (newFileName) => ({
  type: 'CHANGE_NEW_FILE_NAME',
  newFileName: newFileName,
})

export const setFileNames = (fileNames) => ({
  type: 'SET_FILE_NAMES',
  fileNames: fileNames,
})
