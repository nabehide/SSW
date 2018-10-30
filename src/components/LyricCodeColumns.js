import React from 'react'
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import LyricCode from './LyricCode'

export default class LyricCodeColumns extends React.Component {
  render() {
    return (
      <View style={styles.box}>
        {this.props.columns.map((column, index) =>
          <View
            style={styles.subContainer}
            key={index}
          >
            <LyricCode
              refInput={this.props.refInput}
              row={this.props.row}
              column={index}
              code={column.code}
              lyric={column.lyric}
              selected={this.props.selected}
              onChangeCode={this.props.onChangeCode}
              onChangeLyric={this.props.onChangeLyric}
              onTextInputKeyPress={this.props.onTextInputKeyPress}
              onSelectionChange={this.props.onSelectionChange}
            />
          </View>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#cccccc',
    display: 'flex',
    // justifyContent: 'center',
    flexDirection: 'row',
  },
  subContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'green',
    color: 'green',
  }
})
/*
            <Button
              style={styles.button}
              onPress={(e) => this.props.onPressAddColumn(e, this.props.row, index)}
              title="+"
            />
        <Button
          style={styles.button}
          onPress={(e) => this.props.onPressAddColumn(e, this.props.row, this.props.columns.length)}
          title="+"
        />
*/
