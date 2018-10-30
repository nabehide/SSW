import React from 'react'
import { connect } from 'react-redux'
import {
  Button,
  Picker,
  TextInput,
  View,
} from 'react-native'

import {
  changeNewFileName,
  setFileNames,
} from '../actions'

const styles = {
  subContainer: {
    display: 'flex',
    flexDirection: "row",
  },
  textInput: {
  },
  button: {
  },
}

class AddNewFile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    this.textInputNewFilename = React.createRef()
  }
  handleChangeNewFileName = (text) => {
    const { dispatch } = this.props
    dispatch(changeNewFileName(text))
  }
  handlePressNew = () => {
    const { dispatch } = this.props
    const { newFileName, fileNames } = this.props.state.file

    const nextFileNames = fileNames
    nextFileNames.push(newFileName)
    dispatch(setFileNames(nextFileNames))

    // const index = this.state.names.indexOf(this.state.newName)

    this.textInputNewFilename.current.clear()
    dispatch(changeNewFileName(""))
  }
  render() {
    const { newFileName } = this.props
    return (
      <View style={styles.subContainer}>
        <TextInput style={styles.textInput}
          ref={this.textInputNewFilename}
          value={newFileName}
          onChangeText={this.handleChangeNewFileName}
        />
        <Button style={styles.button}
          onPress={() => this.handlePressNew()}
          title="new"
        />
      </View>
    )
  }
}
function mapStateToProps(state) {
  return {state}
}
export default connect(mapStateToProps)(AddNewFile)
