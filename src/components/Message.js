import React from 'react'

const Message = ({
                     id,
                     message,
                     checkboxChange,
                     starChange,
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
                            onChange={(e) => checkboxChange(e, id)}
                            checked={message.selected ? true : false}
                        />
                    </div>
                    <div className="col-xs-2">
                        <i className={starStyle} onClick={(e) => starChange(e, id)}></i>
                    </div>
                </div>
            </div>
            <div className="col-xs-11">
                {message.labels.map((msg, i) =>
                    <span key={i} className="label label-warning">{msg}</span>
                )
                }
                <a href="#">
                    {message.subject}
                </a>
            </div>
        </div>
    )
}

export default Message
