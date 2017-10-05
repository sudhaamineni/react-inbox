import React,{form} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { toggleComposMessage, sendMessage } from '../actions'

class ComposeMessage extends React.Component {

  onSubjectChanged = (subject) => {
    this.setState({subject: subject})
  }

  onBodyChanged = (body) => {
    this.setState({body: body})
  }
render() {
        return (
<form className="form-horizontal well">
  <div className="form-group">
    <div className="col-sm-8 col-sm-offset-2">
      <h4>Compose Message</h4>
    </div>
  </div>
  <div className="form-group">
          <label htmlFor="subject" className="col-sm-2 control-label">Subject</label>
          <div className="col-sm-8">
            <input type="text" className="form-control" id="subject" placeholder="Enter a subject" name="subject" onChange={(e) => this.onSubjectChanged(e.target.value)} />
          </div>
  </div>
  <div className="form-group">
    <label htmlFor="body" className="col-sm-2 control-label">Body</label>
    <div className="col-sm-8">
           <textarea name="body" id="body" className="form-control" onChange={(e) => this.onBodyChanged(e.target.value)}></textarea></div>
  </div>
  <div className="form-group">
    <div className="col-sm-8 col-sm-offset-2">
    <input type="submit" value="Send" className="btn btn-primary" onClick={
            (e) => {
              e.preventDefault()
              this.props.sendMessage(this.state.subject, this.state.body,this.props.history)
            }}/>
    </div>
  </div>
</form>
)
}
}
const mapDispatchToProps = dispatch => bindActionCreators({
  toggleComposMessage, sendMessage
}, dispatch)

export default connect(null,
  mapDispatchToProps
)(ComposeMessage);
