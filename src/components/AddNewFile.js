import React from 'react'
import {
  Button,
  Picker,
  TextInput,
  View,
} from 'react-native'

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

export default class AddNewFile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  handlePressNew = () => {
    const { newName } = this.props
    const nextNames = this.state.names
    this.state.names.push(newName)
    this.setState({ names: nextNames })

    const index = this.state.names.indexOf(newName)

    this.textInputNewFilename.current.clear()
  }
  render() {
    const { newName } = this.props
    return (
      <View style={styles.subContainer}>
        <TextInput style={styles.textInput}
          ref={this.textInputNewFilename}
          onChangeText={(text) => this.setState({ newName: text })}
        />
        <Button style={styles.button}
          onPress={() => this.handlePressNew()}
          title="new"
        />
      </View>
    )
  }
}
