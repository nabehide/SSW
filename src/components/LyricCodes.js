import React from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import LyricCodeRows from './LyricCodeRows'

export default class LyricCodes extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
  }

  render() {
    return (
      <View style={styles.box}>
        <LyricCodeRows
          refInput={this.props.refInput}
          rows={this.props.rows}
          selected={this.props.selected}
          onChangeCode={this.props.onChangeCode}
          onChangeLyric={this.props.onChangeLyric}
          onPressAddRow={this.props.onPressAddRow}
          onPressAddColumn={this.props.onPressAddColumn}
          onTextInputKeyPress={this.props.onTextInputKeyPress}
          onSelectionChange={this.props.onSelectionChange}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#cccccc',
    display: 'flex',
    justifyContent: 'center',
  },
})
