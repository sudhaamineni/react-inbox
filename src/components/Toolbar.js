import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link, Route, Switch, withRouter } from 'react-router-dom'

const Toolbar = ({
                      messages,
                     handleToolbarMessageCheckboxClick,
                     markAsRead,
                     markAsUnread,
                     deleteSelected,
                     applyLabel,
                    removeLabel,
                     toggleComposMessage
                 }) => {

    let isMessagesSelected = true
    let checkedMessagesStyle = "fa fa-minus-square-o"
    let selectedMessages = messages.filter(message => message.selected === true)
    if (selectedMessages.length === 0) {
        isMessagesSelected = false
        checkedMessagesStyle = "fa fa-square-o"
    } else if (selectedMessages.length === messages.length) {
        checkedMessagesStyle = "fa fa-check-square-o"
    }

    const unreadMessages = messages.filter(message => message.read === false)

    return (
      <div className="row toolbar">
  <div className="col-md-12">
    <p className="pull-right">
    <span className="badge badge">{unreadMessages.length}</span>
                  {unreadMessages.length === 1 ? `unread message` : `unread messages`}
    </p>
    <Switch>
           <Route path="/compose" render={ () => (
             <Link className="btn btn-danger" to="/">
               <i className={`fa fa-plus`}></i>
             </Link>
           )} />
           <Route render={ () => (
             <Link className="btn btn-danger" to="/compose">
               <i className={`fa fa-plus`}></i>
             </Link>
           )} />
    </Switch>

   <button className="btn btn-default">
     <i className="fa fa-minus-square-o"></i>
   </button>
    <button className="btn btn-default" onClick={handleToolbarMessageCheckboxClick}>
                    <i className={checkedMessagesStyle}></i>
    </button>

    <button className="btn btn-default" disabled={!isMessagesSelected} onClick={()=>markAsRead(messages)}>
      Mark As Read
    </button>

    <button title="Mark as Unread" className="btn btn-default" disabled={!isMessagesSelected} onClick={()=>markAsUnread(messages)}>
      Mark As Unread
    </button>

    <select className="form-control label-select" disabled={!isMessagesSelected}
                        value="Apply label"
                        onChange={(e) => applyLabel(e.target.value, messages)}>
      <option>Apply label</option>
      <option value="dev">dev</option>
      <option value="personal">personal</option>
      <option value="gschool">gschool</option>
    </select>

    <select className="form-control label-select"  disabled={!isMessagesSelected}
                    value="Remove label"
                    onChange={(e) => removeLabel(e.target.value, messages)}>
      <option>Remove label</option>
      <option value="dev">dev</option>
      <option value="personal">personal</option>
      <option value="gschool">gschool</option>
    </select>

    <button className="btn btn-default" disabled={!isMessagesSelected} onClick={() => deleteSelected(messages)}>
                    <i className="fa fa-trash-o"></i>
                </button>
  </div>
</div>

    )
}
export default Toolbar;
