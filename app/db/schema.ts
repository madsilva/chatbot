import * as Auth from './auth-schema'
import * as Items from './item-schema'

export const schema = {
  ...Auth,
  ...Items
}