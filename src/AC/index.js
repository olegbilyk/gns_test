import { FILTER_SEARCH, FILTER_NAME, EDIT_TEXT } from '../constants'

export function filterSearch (text) {
  return {
    type: FILTER_SEARCH,
    payload: {text}
  }
}

export function filterName (name) {
  return {
    type: FILTER_NAME,
    payload: {name}
  }
}

export function editText (id, type, value) {
  return {
    type: EDIT_TEXT,
    payload: {id, type, value}
  }
}
