import React, { Component } from 'react'
import styled, { injectGlobal } from 'react-emotion'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import TableItem from './TableItem'
import FiltersForm from './FiltersForm'
import { editText, filterName, filterSearch } from '../AC/index'

injectGlobal`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
  }
`

const WrapperContent = styled('div')`
  display: grid;
  grid-template: 'header' 'content';
  grid-template-rows: auto 1fr;
  height: 100vh;
  overflow: hidden;
  font-size: 16px;
  line-height: 1.6;
  font-weight: 400;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  color: #434345;
`

const Header = styled('div')`
  grid-area: header;
  padding: 20px 30px 20px 30px;
`

const Content = styled('div')`
  grid-area: content;
  overflow-x: hidden;
  overflow-y: scroll;
`

const H2 = styled('h2')`
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 40px;
  font-weight: 400;
  line-height: 1.4;
  text-align: center;

  span {
    color: #111;
    font-weight: 300;
  }

  ::after {
    content: '';
    display: block;
    width: 40px;
    height: 2px;
    margin: 20px auto 35px;
    background: linear-gradient(90deg, #42b574 0%, #84c450 100%);
  }
`

const H3 = styled('h3')`
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 30px;
  font-weight: 400;
  line-height: 1.4;
  text-align: center;
  color: #111;
`

const TableList = styled('table')`
  width: 100%;
  max-width: 100%;
  border-collapse: collapse;
  text-align: center;

  td {
    vertical-align: top;
    border-top: 1px solid #ddd;
  }

  td,
  th {
    width: 33.333%;
  }

  thead th {
    padding: 8px;
    border-bottom: 2px solid #d9d9d9;
    font-size: 18px;
    line-height: 1.5;
    font-weight: 700;
    color: #111;
  }

  tbody tr {
    background-color: #fff;

    :nth-of-type(even) {
      background-color: #f7f7f7;

      input {
        background-color: #f7f7f7;
      }
    }
  }
`

class Table extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    filters: PropTypes.object.isRequired,
    filterSearch: PropTypes.func.isRequired,
    filterName: PropTypes.func.isRequired,
    editText: PropTypes.func.isRequired
  }

  getTotalCurrency () {
    return this.filterItems(this.props.items).reduce((acc, next) => acc + parseFloat(next.currency), 0)
  }

  hasValueSearch (name, search) {
    return `${name}`.toLowerCase().indexOf(`${search}`) !== -1
  }

  sortName (name) {
    return (elem1, elem2) => {
      if (name === 'notSelect') return 0

      return elem1[name] > elem2[name] ? 1 : -1
    }
  }

  filterItems (arr) {
    const search = this.props.filters.search
    const name = this.props.filters.name

    return arr.filter(item => {
      if ((search !== undefined) &&
        ((this.hasValueSearch(item.name, search)) || this.hasValueSearch(item.location, search) || this.hasValueSearch(item.currency, search))) {
        return item
      }
    }).sort(this.sortName(name))
  }

  getContent () {
    const {items, editText} = this.props

    const elements = this.filterItems(items).map(item => <tr key={item.id}>
      <TableItem item={item} editText={editText} />
    </tr>)

    if (!elements.length) {
      return (
        <H3>No results</H3>
      )
    } else {
      return (
        <TableList>
          <thead>
            <tr>
              <th>Name</th>
              <th>Location</th>
              <th>Currency</th>
            </tr>
          </thead>
          <tbody>
            {elements}
          </tbody>
        </TableList>
      )
    }
  }

  render () {
    const {filterSearch, filterName} = this.props

    return (
      <WrapperContent>
        <Header>
          <H2>Total currency: <span>{this.getTotalCurrency()}</span></H2>
          <FiltersForm filterSearch={filterSearch} filterName={filterName} />
        </Header>
        <Content>
          {this.getContent()}
        </Content>
      </WrapperContent>
    )
  }
}

export default connect(state => ({
  items: state.items,
  filters: state.filters
}), {filterSearch, filterName, editText})(Table)
