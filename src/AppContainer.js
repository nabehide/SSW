import React from 'react'
import { connect } from 'react-redux'
import {
  AsyncStorage,
  Button,
  Picker,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import LyricCodes from './components/LyricCodes'
import AddNewFile from './components/AddNewFile'
import {
  changeNewFileName,
  setFileNames,
} from './actions'

const template_data = [
  {
    columns: [
      {
        "code": "",
        "lyric": "",
      },
    ],
  },
]

const styles = StyleSheet.create({
  box: { backgroundColor: '#cccccc' },
  textInput: { backgroundColor: '#ffffff' },
  subContainer: {
    display: "flex",
    flexDirection: "row",
  },
  button: {
    color: 'red',
  },
})

class AppContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      newName: "",
      isSaved: true,
      rows: [ { columns: [ { "code": "", "lyric": "", }, ], }, ],
      selected: 0,
    }
    this.createRef(this.state.rows)
  }

  createRef(data) {
    this.ref = []
    for(let i=0; i<data.length; i++) {
      this.ref.push([])
      for(let j=0; j<data[i].columns.length; j++) {
        this.ref[i].push(React.createRef())
      }
    }
  }

  onTextInputKeyPress = (e, row, column) => {
    if (e.charCode === 13) {  // Enter
      if (row === this.state.rows.length-1) {
        this.addRow(row+1)
      }
      setTimeout(() => {
        this.ref[row+1][0].current.focus()
      }, 1)
    } else if (e.keyCode === 8) {  // backspace
      if (column !== 0) {
        const c = this.state.rows[row].columns[column-1].code+" "+this.state.rows[row].columns[column].code
        this.deleteColumn(row, column)
        const nRows = this.state.rows
        nRows[row].columns[column-1].code = c
        this.setState({ rows: nRows })
        setTimeout(() => {
          this.ref[row][column-1].current.focus()
        }, 1)
      }
    } else if (e.keyCode === 37) {  // left
      if (column !== 0 && this.state.selected === 0) {
        this.ref[row][column-1].current.focus()
      }
    } else if (e.keyCode === 38) {  // up
      if (row !== 0) {
        if (this.ref[row-1][column] !== undefined) {
          this.ref[row-1][column].current.focus()
        }
      }
    } else if (e.keyCode === 39) {  // right
      if (column !== this.state.rows[row].columns.length-1 && this.state.selected === this.state.rows[row].columns[column].code.length) {
        this.ref[row][column+1].current.focus()
      }
    } else if (e.keyCode === 40) {  // down
      if (row !== this.state.rows.length-1) {
        if (this.ref[row+1][column] !== undefined) {
          this.ref[row+1][column].current.focus()
        }
      }
    } else {
      console.log("pressed", e.charCode, e.keyCode)
    }
  }

  handleSelectionChange = ({ nativeEvent: { selection } }) => {
    if ( selection.start === selection.end ) {
      this.setState({ selected: selection.start })
    }
  }

  onChangeCode = (code, row, column) => {
    const nextState = this.state
    nextState.rows[row].columns[column].code = code
    this.setState({ state: nextState })

    const index = code.indexOf("  ")
    if (index !== -1) {
      const array = code.split("  ")
      this.addColumn(row, column+1)
      const nState = this.state
      nState.rows[row].columns[column].code = array[0]
      nState.rows[row].columns[column+1].code = array[1]
      this.setState({ state: nState })
    }
  }
  onChangeLyric = (lyric, row, column) => {
    const nextState = this.state
    nextState.rows[row].columns[column].lyric = lyric
    this.setState({ state: nextState })
  }

  onPressAddRow = (e, row) => {
    this.addRow(row)
  }
  addRow = (row) => {
    const nextState = this.state
    nextState.rows.splice(row, 0, {columns: [{code: "", lyric: ""}]})
    this.setState({ state: nextState })
    this.createRef(this.state.rows)
  }

  onPressAddColumn = (e, row, column) => {
    this.addColumn(row, column)
  }
  addColumn = (row, column) => {
    const nextState = this.state
    nextState.rows[row].columns.splice(column, 0, {code: "", lyric: ""})
    this.setState({ state: nextState })
    this.createRef(this.state.rows)
  }
  deleteColumn = (row, column) => {
    const nextState = this.state
    nextState.rows[row].columns.splice(column, 1)
    this.setState({ state: nextState })
    // this.createRef(this.state.rows)
  }

  componentWillMount = () => {
    this.loadData()
  }
  componentDidMount = () => {
    const { dispatch } = this.props
    AsyncStorage.getAllKeys()
      .then(req => {
        this.setState({
          name: req[0]
        })
        dispatch(setFileNames(req))
        this.loadData()
      })
      .catch(error => console.log("error", error))
  }

  loadData = () => {
    AsyncStorage.getItem(this.state.name)
      .then(req => JSON.parse(req))
      .then(json => {
        // if (json.length === 0) json = template_data
        if (json === null) json = template_data
        this.createRef(json)
        this.setState({ rows: json })
      })
      .catch(error => console.log("error", error))
  }

  handlePressLoad = () => {
    this.loadData()
  }
  handlePressSave = () => {
    try {
      AsyncStorage.setItem(this.state.name, JSON.stringify(this.state.rows))
      console.log("saved.")
    } catch (error) {
      console.log("error", error)
    }
  }
  handlePressDelete = () => {
    AsyncStorage.removeItem(this.state.name)
    .then(() => {
      const { dispatch } = this.props
      const { fileNames } = this.props.state.file
      const nextFileNames = fileNames
      const index = fileNames.indexOf(this.state.name)
      nextFileNames.splice(index, 1)
      dispatch(setFileNames(nextFileNames))

      // const index = this.props.fileNames.indexOf(this.state.name)

      setTimeout(() => {
        this.loadData()
      }, 1)
    })
    .catch(error => console.log("error", error))
  }
  handlePickerChanged = (itemValue, itemIndex) => {
    this.setState({ name: itemValue })
    setTimeout(() => {
      this.loadData()
    }, 1)
  }

  renderPickerItems = () => {
    this.props.state.file.fileNames.map((name, i) => {
      return <Picker.Item key={i} value={name} label={name} />
    })
  }

  render() {
    const { dispatch } = this.props
    let items = this.props.state.file.fileNames.map((name, i) => {
      return <Picker.Item key={i} value={name} label={name} />
    })
    return (
      <View style={styles.box}>

        <AddNewFile
          newName={this.state.newName}
        />

        <View style={styles.subContainer}>
          <Picker
            onValueChange={this.handlePickerChanged}
            placeholder="new file name"
          >
            {items}
          </Picker>
          <Button style={styles.button}
            onPress={() => this.handlePressLoad()}
            title="load"
          />
          <Button style={styles.button}
            onPress={() => this.handlePressSave()}
            title="save"
          />
          <Button style={styles.button}
            onPress={() => this.handlePressDelete()}
            title="delete"
          />
        </View>

        <LyricCodes
          refInput={this.ref}
          rows={this.state.rows}
          selected={this.state.selected}
          onChangeCode={this.onChangeCode}
          onChangeLyric={this.onChangeLyric}
          onPressAddRow={this.onPressAddRow}
          onPressAddColumn={this.onPressAddColumn}
          onTextInputKeyPress={this.onTextInputKeyPress}
          onSelectionChange={this.handleSelectionChange}
        />
      </View>
    )
  }
}
function mapStateToProps(state) {
  return {state}
}
export default connect(mapStateToProps)(AppContainer)
