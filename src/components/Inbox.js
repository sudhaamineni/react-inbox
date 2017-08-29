import React, {Component} from 'react'
import MessageList from './MessagesList'
import Toolbar from './Toolbar'

export class Inbox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            messages: props.messages
        }
    }
    handleCheckboxChange = (e, id) => {
       const newMessages = this.state.messages.map(message => {
           if (message.id === id) {
               message.selected = e.target.checked
           }
           return message
       })

       this.setState({messages: newMessages})
   }

   handleStarChange = (e, id) => {
       const newMessages = this.state.messages.map(message => {
           if (message.id === id) {
               message.starred = !message.starred
           }
           return message
       })

       this.setState({messages: newMessages})
   }

   handleToolbarMessageCheckboxClick = () => {
       let newMessages
       const selectedMessages = this.state.messages.filter(message => message.selected === true)
       if (selectedMessages.length === this.state.messages.length) {
           newMessages = this.state.messages.map(message => {
               if (message.selected) {
                   message.selected = false
               }
               return message
           })
       } else {
           newMessages = this.state.messages.map(message => {
               if (!message.selected) {
                   message.selected = true
               }
               return message
           })
       }

       this.setState({messages: newMessages})
   }

   handleMarkAsRead = () => {
       const newMessages = this.state.messages.map(message => {
           if (message.selected) {
               message.read = true
           }
           return message
       })

       this.setState({messages: newMessages})
   }

   handleMarkAsUnread = () => {
       const newMessages = this.state.messages.map(message => {
           if (message.selected) {
               message.read = false
           }
           return message
       })

       this.setState({messages: newMessages})
   }

   handleDeleteMessages = () => {
       const newMessages = this.state.messages.filter(message => !message.selected)
       this.setState({messages: newMessages})
   }

   handleApplyLabel = (e) => {
       const newMessages = this.state.messages.map(message => {
           if (message.selected) {
               if (!message.labels.includes(e.target.value)) {
                   message.labels.push(e.target.value)
               }
           }
           return message
       })

       this.setState({messages: newMessages})
   }

   handleRemoveLabel = (e) => {
       const newMessages = this.state.messages.map(message => {
           if (message.selected) {
               message.labels = message.labels.filter(message => message !== e.target.value)
           }
           return message
       })

       this.setState({messages: newMessages})
   }

    render() {
            return (
                <div>
                <Toolbar
                   messages={this.state.messages}
                   handleToolbarMessageCheckboxClick={this.handleToolbarMessageCheckboxClick}
                   handleMarkAsRead={this.handleMarkAsRead}
                   handleMarkAsUnread={this.handleMarkAsUnread}
                   handleDeleteMessages={this.handleRemoveMessages}
                   handleApplyLabel={this.handleApplyLabel}
                   handleRemoveLabel={this.handleRemoveLabel}
               />
               <MessageList
                   messages={this.state.messages}
                   checkboxChange={this.handleCheckboxChange}
                   starChange={this.handleStarChange}
               />
                 </div>
        )
    }
}
export default Inbox
