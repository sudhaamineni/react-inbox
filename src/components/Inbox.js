import React, {Component} from 'react'
import MessageList from './MessagesList'
import Compose from './ComposeMessage'
import Toolbar from './Toolbar'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createMessage, updteMessage, toggleComposMessage, markAsRead, markAsUnread, deleteSelected , applyLabel, removeLabel} from '../actions'
import {Route, withRouter} from 'react-router-dom'
import { fetchMessages } from '../actions'
export class Inbox extends React.Component {
  propTypes:{
    messages:React.propTypes.array.isRequired
  }
  componentDidMount() {
   fetchMessages();
  }
  async componentWillReceiveProps(nextProps) {

      this.setState({composeMessage: true,
                    displayBodyOfMessageId: -1})
  }
    render() {
            return (
                <div>
                <Toolbar  messages={this.props.messages}
                markAsRead={this.props.markAsRead}
                markAsUnread={this.props.markAsUnread}
                applyLabel={this.props.applyLabel}
                removeLabel={this.props.removeLabel}
                deleteSelected={this.props.deleteSelected}
                toggleComposMessage ={this.props.toggleComposMessage}/>
                <Route  path="/compose" render={ (props) => (
                <Compose onSendMessageClick={this.onSendMessageClick}{...props} />)} />
               <MessageList
                   messages={this.props.messages}
                   checkboxChange={this.handleCheckboxChange}
                   starChange={this.handleStarChange}
               />
                 </div>
        )
    }
}
const mapStateToProps = state => ({
  messages: state.messages.all,
  composeMessage:state.messages.ComposeMessage,
  requestData:state.messages.requestData
})

const mapDispatchToProps = dispatch => bindActionCreators({
   createMessage,
   fetchMessages,
  updteMessage,
  toggleComposMessage,
  deleteSelected,
  applyLabel,
  markAsRead,
  markAsUnread,
  removeLabel
}, dispatch)

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Inbox))
