import React from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    width: 100,
    borderColor: 'black',
    borderWidth: 1,
  },
})

export default class LyricCode extends React.Component{
  constructor(props) {
    super(props)
  }

  componentDidMount() {
  }

  render() {
    const { row, column } = this.props
    return (
      <View>
        <TextInput
          ref={this.props.refInput[row][column]}
          style={styles.textInput}
          value={this.props.code}
          selected={this.props.selected}
          onChangeText={(code) =>
            this.props.onChangeCode(code, row, column)
          }
          onKeyPress={(e) => this.props.onTextInputKeyPress(e, row, column)}
          onSelectionChange={this.props.onSelectionChange}
        />
        <TextInput
          style={styles.textInput}
          value={this.props.lyric}
          onChangeText={(lyric) =>
            this.props.onChangeLyric(lyric, row, column)
          }
          onKeyPress={(e) => this.props.onTextInputKeyPress(e, row, column)}
        />
      </View>
    )
  }
}
/*
*/
