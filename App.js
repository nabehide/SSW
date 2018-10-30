import React from 'react';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './src/reducers'

import AppContainer from './src/AppContainer'

const store = createStore(rootReducer)

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}
