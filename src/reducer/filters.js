import { FILTER_NAME, FILTER_SEARCH } from '../constants'

export default (filters = {search: '', name: 'notSelect'}, action) => {
  const {type, payload} = action

  switch (type) {
    case FILTER_SEARCH:
      return {...filters, search: payload.text}
    case FILTER_NAME:
      return {...filters, name: payload.name}
  }

  return filters
}
