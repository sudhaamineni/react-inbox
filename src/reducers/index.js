import { combineReducers } from 'redux'
import { MESSAGES_CREATE, MESSAGES_RECEIVED,MESSAGES_UPDATE,MESSAGES_TOGGLE_COMPOSE,MARK_AS_READ,MARK_AS_UNREAD, MESSAGES_SELECTED, MESSAGES_STARRED,MESSAGES_UNSTARRED,MESSAGES_DELETE, APPLY_LABEL, MESSAGE_BODY_REQUEST_STARTED, MESSAGE_BODY_REQUEST_SUCCESS } from '../actions'

function messages(state = { all: [], ComposeMessage:false }, action) {
  let messages;
  switch (action.type) {
    case MESSAGES_CREATE:
    messages =[...state.all,action.message]
      return {
        ...state,
        all: action.messages
      }
    case MESSAGES_RECEIVED:
      return {
        ...state,
        all: action.messages
      }
    case MESSAGES_UPDATE:
      messages =state.all.map(message => {
      return action.messages[message.id] ? action.messages[message.id]:message
    })
      return {
        ...state,
        all: action.messages
      }
      case MESSAGES_DELETE:
        messages =state.all.map(message => {
        return action.newMessages[message.id] ? action.newMessages[message.id]:message
      })
        return {
          ...state,
          all: action.newMessages
        }
    case MESSAGES_TOGGLE_COMPOSE:
      return {
        ...state,
        ComposeMessage: !state.ComposeMessage
      }
      case MESSAGES_SELECTED:
        return {
          ...state,
          all:state.all.map(message =>{
            if (message.id=== action.id){
              return {...message,selected:!message.selected}
            }
            return message
          })
        }
        case MESSAGES_STARRED:
          return {
            ...state,
            all:state.all.map(message =>{
              if (message.id=== action.id){
                return {...message,starred:!message.starred}
              }
              return message
            })
          }
          case MESSAGES_UNSTARRED:
            return {
              ...state,
              all:state.all.map(message =>{
                if (message.id=== action.id){
                  return {...message,starred:message.starred}
                }
                return message
              })
            }
            case MARK_AS_READ:
            case APPLY_LABEL:
            case MARK_AS_UNREAD:
            case MESSAGE_BODY_REQUEST_SUCCESS:
            return {
                ...state,
                all: action.newMessages
              }
              case MESSAGE_BODY_REQUEST_SUCCESS:
     return {
       ...state,
       byId: setPropertyValue(state.byId, action.id, 'body', action.body)
     }

    default:
      return state
  }
}
function setPropertyValue(byId, id, property, value) {
  return {
    ...byId,
    [id] : {
      ...byId[id],
      [property]: value
    }
  }
}

export default combineReducers({
  messages,
})
