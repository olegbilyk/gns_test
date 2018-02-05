import { EDIT_TEXT } from '../constants'
import { dataDefault } from '../fixtures.js'

export default (items = dataDefault, action) => {
  const {type, payload} = action

  switch (type) {
    case EDIT_TEXT:
      return items.reduce((acc, next) => {
        if (next.id === payload.id) {
          return [...acc, {...next, [payload.type]: payload.value}]
        }

        return [...acc, next]
      }, [])
  }

  return items
}
