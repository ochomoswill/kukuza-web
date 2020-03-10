import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import user from './user/reducers'
import menu from './menu/reducers'
import settings from './settings/reducers'
import authReducer from './auth/reducers'
import usersReducer from './users/reducers'
import sysReducer from './sys/reducers'
import integrationReducer from './integrations/reducers'
import walletsReducer from './wallets/reducers'
import transactionsReducer from './transactions/reducers'
import loansReducer from './loans/reducers'
import kinsReducer from './kin/reducers'
import kinRelationsReducer from './kin_relations/reducers'
import documentsReducer from './documents/reducers'
import {flexiReducer} from './flexi/reducers'

export default history =>
  combineReducers({
    router: connectRouter(history),
    user,
    menu,
    settings,
    authReducer,
    usersReducer,
    sysReducer,
    integrationReducer,
    walletsReducer,
    transactionsReducer,
    loansReducer,
    kinsReducer,
    kinRelationsReducer,
    documentsReducer,
    flexiReducer
  })
