import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'react-emotion'

const Form = styled('form')`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;

  > div {
    margin-right: 30px;
    margin-left: 30px;
    margin-bottom: 15px;
    text-align: center;
  }
`

const Label = styled('label')`
  margin-right: 10px;
  font-size: 21px;
  font-weight: 500;
  color: #111;
`

const Input = styled('input')`
  min-width: 200px;
  padding: 9px 28px 9px 16px;
  border: 1px solid #d9d9d9;
  border-radius: 5px;
  font-size: 14px;
  color: #212121;
  outline: none;
  transition: all 0.2s ease;

  ::placeholder {
    font-size: 14px;
    color: #212121;
  }

  :hover {
    border-color: #c2c2c2;
  }

  :focus {
    border-color: #949494;
  }
`

const Select = styled('select')`
  min-width: 200px;
  padding: 9px 40px 9px 16px;
  border: 1px solid #d9d9d9;
  border-radius: 5px;
  font-size: 14px;
  color: #212121;
  background: #fff url(data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDI0MC44MTEgMjQwLjgxMSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMjQwLjgxMSAyNDAuODExOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCI+CjxnPgoJPHBhdGggaWQ9IkV4cGFuZF9Nb3JlIiBkPSJNMjIwLjA4OCw1Ny42NjdsLTk5LjY3MSw5OS42OTVMMjAuNzQ2LDU3LjY1NWMtNC43NTItNC43NTItMTIuNDM5LTQuNzUyLTE3LjE5MSwwICAgYy00Ljc0LDQuNzUyLTQuNzQsMTIuNDUxLDAsMTcuMjAzbDEwOC4yNjEsMTA4LjI5N2wwLDBsMCwwYzQuNzQsNC43NTIsMTIuNDM5LDQuNzUyLDE3LjE3OSwwTDIzNy4yNTYsNzQuODU5ICAgYzQuNzQtNC43NTIsNC43NC0xMi40NjMsMC0xNy4yMTVDMjMyLjUyOCw1Mi45MTUsMjI0LjgyOCw1Mi45MTUsMjIwLjA4OCw1Ny42Njd6IiBmaWxsPSIjMDAwMDAwIi8+Cgk8Zz4KCTwvZz4KCTxnPgoJPC9nPgoJPGc+Cgk8L2c+Cgk8Zz4KCTwvZz4KCTxnPgoJPC9nPgoJPGc+Cgk8L2c+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==) no-repeat calc(100% - 16px) 50%;
  background-size: 10px 10px;
  appearance: none;
  outline: none;
  transition: all 0.2s ease;

  ::placeholder {
    font-size: 14px;
    color: #212121;
  }

  :hover {
    border-color: #c2c2c2;
  }

  :focus {
    border-color: #949494;
  }
`

class FiltersForm extends Component {
  static propTypes = {
    filterSearch: PropTypes.func.isRequired,
    filterName: PropTypes.func.isRequired
  }

  state = {
    input: '',
    select: ''
  }

  handleChange = type => ev => {
    ev.preventDefault()

    if (type === 'input') this.props.filterSearch(ev.target.value.toLowerCase())
    else if (type === 'select') this.props.filterName(ev.target.value)

    this.setState({
      [type]: ev.target.value
    })
  }

  render () {
    return (
      <Form name='Search in table'>
        <div>
          <Label htmlFor='FilterForm__search'>Search filter: </Label>
          <Input type='text' placeholder='Text...' value={this.state.input} id='FilterForm__search' onChange={this.handleChange('input')} />
        </div>
        <div>
          <Label htmlFor='FilterForm__input'>Sorting filter: </Label>
          <Select name='Filter name' value={this.state.select} id='FilterForm__input' onChange={this.handleChange('select')}>
            <option value='notSelect'>Select filter</option>
            <option value='name'>Name</option>
            <option value='location'>Location</option>
            <option value='currency'>Currency</option>
          </Select>
        </div>
      </Form>
    )
  }
}

export default FiltersForm
