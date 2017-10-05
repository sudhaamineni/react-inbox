export const MESSAGES_RECEIVED = 'MESSAGES_RECEIVED'
export function fetchMessages() {
  return async (dispatch) => {
    const response = await fetch(`/api/messages`)
    const json = await response.json()
    dispatch({
      type: MESSAGES_RECEIVED,
      messages: json._embedded.messages
    })
  }
}
export const MESSAGE_BODY_REQUEST_STARTED = 'MESSAGE_BODY_REQUEST_STARTED'
export const MESSAGE_BODY_REQUEST_SUCCESS = 'MESSAGE_BODY_REQUEST_SUCCESS'
export const fetchMessageBody = (id) => {
  return async (dispatch, getState) => {
    const message = getState().messages.id[id]
    dispatch({ type: MESSAGE_BODY_REQUEST_STARTED })

    const response = await fetch(message._links.self.href)
    const json = await response.json()

    dispatch({
      type: MESSAGE_BODY_REQUEST_SUCCESS,
      id,
      body: json.body
    })

    dispatch(markAsRead(message));
  }
}
export const MESSAGES_CREATE = 'MESSAGES_CREATE'
export function createMessage(body) {
  return async (dispatch) => {
    const response = await fetch(`/api/messages`)
    const json = await response.json()
    dispatch({
      type: MESSAGES_CREATE,
      messages: json._embedded.messages
    })
  }
}

export const MESSAGES_UPDATE = 'MESSAGES_UPDATE'
export function updteMessage(request,messages) {
  return async (dispatch) => {
     await fetch(`${process.env.REACT_APP_API_URL}/api/messages`, {
        method: 'POST',
        body: JSON.stringify(request),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
      })
    dispatch({
      type: MESSAGES_UPDATE,
      messages
    })
  }
}

export const MESSAGES_TOGGLE_COMPOSE = 'MESSAGES_TOGGLE_COMPOSE'
export function toggleComposMessage(requestData) {
  return async (dispatch) => {
    dispatch({
      type: MESSAGES_TOGGLE_COMPOSE,

    })
  }
}

export const MESSAGES_SELECTED = 'MESSAGES_SELECTED'
export function selectMessage(id){
  return {
    type:MESSAGES_SELECTED,
    id
  }
}
export const MESSAGES_STARRED = 'MESSAGES_STARRED'
export function handleStarChange(id){
  return {
    type:MESSAGES_STARRED,
    id
  }
}

export const MESSAGES_UNSTARRED = 'MESSAGES_UNSTARRED'
export function handleunStarChange(id){
  return {
    type:MESSAGES_UNSTARRED,
    id
  }
}
export const MESSAGES_SEND = 'MESSAGES_SEND'
export function sendMessage(subject, body, history) {
  return async (dispatch) => {
   const response=  await fetch(`/api/messages`, {
       method: 'POST',
       body: JSON.stringify({subject, body}),
       headers: {
           'Content-Type': 'application/json',
           'Accept': 'application/json',
       }
     })
     const json = await response.json()
    dispatch({
    type: MESSAGES_SEND,
      messages: json
    })
    history.push("/")
  }
}


export const MESSAGES_DELETE = 'MESSAGES_DELETE';
export function deleteSelected(messages) {
  return async (dispatch) => {
       await fetch(`${process.env.REACT_APP_API_URL}/api/messages`, {
           method: 'PATCH',
           body: JSON.stringify({
               messageIds: messages.filter(message => message.selected)
                   .map(msg => msg.id),
               command: 'delete'
           }),
           headers: {
               'Content-Type': 'application/json',
               'Accept': 'application/json',
           }
       });

       const newMessages = messages.filter(message => !message.selected);

       dispatch({
           type: MESSAGES_DELETE,
           newMessages
       });
   }
    }


export const APPLY_LABEL = 'APPLY_LABEL';
export function applyLabel(labelName, messages) {
    console.log("label", labelName);
    if (labelName !== 'Apply label') {
        return async (dispatch) => {
            await fetch(`${process.env.REACT_APP_API_URL}/api/messages`, {
                method: 'PATCH',
                body: JSON.stringify({
                    messageIds: messages.filter(message =>
                        (message.selected
                        && !message.labels.some(label => (label === labelName))))
                        .map(msg => msg.id),
                    command: 'addLabel',
                    label: labelName
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            });
            const newMessages = messages.map(message => {
                let msg = message;
                if (message.selected
                    && !message.labels.some(label => (label === labelName))) {
                    msg.labels.push(labelName)
                }
                msg.selected = false;
                return msg
            });

            dispatch({
                type: APPLY_LABEL,
                newMessages
            });
        }
    }
}

export const REMOVE_LABEL = 'REMOVE_LABEL';
export function removeLabel(labelName, messages) {
    if (labelName !== 'Remove label') {
        return async (dispatch) => {
            await fetch(`${process.env.REACT_APP_API_URL}/api/messages`, {
                method: 'PATCH',
                body: JSON.stringify({
                    messageIds: messages.filter(message => message.selected).map(msg => msg.id),
                    command: 'removeLabel',
                    label: labelName
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            });

            const newMessages = messages.map(message => {
                let msg = message;
                let labels;
                if (message.selected
                    && message.labels.some(label => (label === labelName))) {
                    labels = message.labels.filter(label => (label !== labelName));
                    msg.labels = labels
                }
                msg.selected = false;
                return msg
            });

            dispatch({
                type: REMOVE_LABEL,
                newMessages
            });
        }
    }
}
export const MARK_AS_READ = 'MARK_AS_READ';
export function markAsRead(messages) {
    return async (dispatch) => {
        await fetch(`${process.env.REACT_APP_API_URL}/api/messages`, {
            method: 'PATCH',
            body: JSON.stringify({
                messageIds: messages.filter(message => message.selected)
                    .map(msg => msg.id),
                command: 'read',
                read: true
            }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        });

        const newMessages = messages.map(message => {
            let msg = message;
            msg.read = message.selected ? true : message.read;
            msg.selected = false;
            return msg;
        });

        dispatch({
            type: MARK_AS_READ,
            newMessages
        });
    }
}

export const MARK_AS_UNREAD = 'MARK_AS_UNREAD';
export function markAsUnread(messages) {
    return async (dispatch) => {
        await fetch(`${process.env.REACT_APP_API_URL}/api/messages`, {
            method: 'PATCH',
            body: JSON.stringify({
                messageIds: messages.filter(message => message.selected)
                    .map(msg => msg.id),
                command: 'read',
                read: false
            }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        });

        const newMessages = messages.map(message => {
            let msg = message;
            msg.read = message.selected ? false : message.read;
            msg.selected = false;
            return msg;
        });

        dispatch({
            type: MARK_AS_UNREAD,
            newMessages
        });
    }
}
