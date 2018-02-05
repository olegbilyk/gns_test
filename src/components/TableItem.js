import React, { Component, Fragment } from 'react'
import styled from 'react-emotion'
import PropTypes from 'prop-types'

const Name = styled('input')`
  width: 100%;
  padding: 8px;
  border: 2px solid transparent;
  font-size: 16px;
  line-height: 1.5;
  font-weight: 500;
  text-align: center;
  transition: all 0.2s ease;

  :focus {
    outline: none;
  }
`

const Location = styled(Name)`
  font-weight: 300;
`

const Currency = styled(Name)`
  font-weight: 500;
  color: #434343;
`

class TableItem extends Component {
  static propTypes = {
    item: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
      currency: PropTypes.number.isRequired
    }),
    editText: PropTypes.func.isRequired
  }

  state = {
    name: this.props.item.name,
    location: this.props.item.location,
    currency: this.props.item.currency
  }

  handleChange = type => ev => {
    const {editText, item} = this.props

    if (type === 'currency') {
      if (ev.target.value.length === 0) {
        editText(item.id, type, 0)

        this.setState({
          [type]: 0
        })
      } else {
        editText(item.id, type, parseFloat(ev.target.value))
      }
    } else {
      editText(item.id, type, ev.target.value)
    }

    this.setState({
      [type]: ev.target.value
    })
  }

  handleOnBlur = type => ev => {
    if (ev.target.value.length === 0) {
      if (type === 'name') {
        this.setState({
          [type]: 'No title'
        })
      } else if (type === 'location') {
        this.setState({
          [type]: 'No location'
        })
      } else if (type === 'currency') {
        this.setState({
          [type]: 0
        })
      }
    }
  }

  render () {
    return (
      <Fragment>
        <td>
          <Name value={this.state.name} type='text' onBlur={this.handleOnBlur('name')} onChange={this.handleChange('name')} />
        </td>
        <td>
          <Location value={this.state.location} type='text' onBlur={this.handleOnBlur('location')} onChange={this.handleChange('location')} />
        </td>
        <td>
          <Currency value={this.state.currency} type='number' min='0' pattern='[0-9]' onBlur={this.handleOnBlur('currency')} onChange={this.handleChange('currency')} />
        </td>
      </Fragment>
    )
  }
}

export default TableItem
