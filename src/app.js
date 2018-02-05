import React from 'react'
import { render } from 'react-dom'
import Table from './components/Table'
import store from './store/index'
import { Provider } from 'react-redux'

render(<Provider store={store}><Table /></Provider>, document.getElementById('app'))
