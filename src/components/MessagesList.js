import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Message from './Message'
import {Route, withRouter} from 'react-router-dom'

const MessagesList = ({
                         messages,
    checkboxChange,
    starChange,
                     }) => (
    <div>
        {messages.map(message =>
            <Message
                key={message.id}
                id={message.id}
                message={message}
                checkboxChange={checkboxChange}
                starChange={starChange}
            />)}
    </div>
)
const mapStateToProps=(state, props) =>({
  messages: state.messages.all,
  requestData:state.requestData
})
const mapDispatchToProps=dispatch=> bindActionCreators({

}, dispatch)
export default withRouter( connect(mapStateToProps, mapDispatchToProps)(MessagesList))
