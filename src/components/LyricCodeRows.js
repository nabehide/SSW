import React from 'react'
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import LyricCodeColumns from './LyricCodeColumns'

export default class LyricCodeRows extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  render() {
    return (
      <View style={styles.box}>
        {this.props.rows.map((row, index) =>
          <View key={index} >
            <LyricCodeColumns
              refInput={this.props.refInput}
              row={index}
              columns={row.columns}
              selected={this.props.selected}
              onChangeCode={this.props.onChangeCode}
              onChangeLyric={this.props.onChangeLyric}
              onPressAddColumn={this.props.onPressAddColumn}
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
    justifyContent: 'center',
  },
})

/*
            <Button
              onPress={(e) => this.props.onPressAddRow(e, index)}
              title="+"
            />
        <Button
          onPress={(e) => this.props.onPressAddRow(e, this.props.rows.length)}
          title="+"
        />
*/
