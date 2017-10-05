import React from 'react'
import { selectMessage, handleStarChange } from '../actions'
import {connect }  from 'react-redux'
import { bindActionCreators }  from 'redux'
import {Link, Route, withRouter} from 'react-router-dom'
import {MessageBody} from './MessageBody'

const Message = ({
                     id,
                     message,
                     selectMessage,
                     handleStarChange,
                 }) => {

    let rowStyle = "row message"
    if (message.selected === true) {
        rowStyle += " selected"
    }
    if (message.read === true) {
        rowStyle += " read"
    } else {
        rowStyle += " unread"
    }

    let starStyle = "star fa fa-star"
    if (message.starred !== true) {
        starStyle += "-o"
    }

    return (
        <div className={rowStyle}>
            <div className="col-xs-1">
                <div className="row">
                    <div className="col-xs-2">
                        <input
                            type="checkbox"
                            name="checkbox"
                            onChange={(e) => selectMessage(id)}
                            checked={message.selected ? true : false}
                        />
                    </div>
                    <div className="col-xs-2">
                        <i className={starStyle} onClick={(e) => handleStarChange(id)}></i>
                    </div>
                </div>
            </div>
            <div className="col-xs-11">
                {message.labels.map((msg, i) =>
                    <span key={i} className="label label-warning">{msg}</span>
                )
                }
              <Link to={`/messages/${id}`}>{message.subject}</Link>

                    <Route
                  key="message-body"
                  path={ `/messages/${id}` }
                  render={ props => {
                    return <MessageBody id={id} {...props} />
                  }} />
            </div>
        </div>

    )
}

const mapStateToProps = state =>({

})

const mapDispatchToProps = dispatch => bindActionCreators({
  selectMessage,handleStarChange
}, dispatch)
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Message))
