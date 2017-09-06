import React,{form} from 'react'
class ComposeMessage extends React.Component {
  constructor(props) {
    super(props)
    this.state = ({
      subject: "",
      body: ""
    })
  }
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
    <label for="body" className="col-sm-2 control-label">Body</label>
    <div className="col-sm-8">
           <textarea name="body" id="body" className="form-control" onChange={(e) => this.onBodyChanged(e.target.value)}></textarea></div>
  </div>
  <div className="form-group">
    <div className="col-sm-8 col-sm-offset-2">
    <input type="submit" value="Send" className="btn btn-primary" onClick={
            (e) => {
              e.preventDefault()
              this.props.onSendMessageClick(this.state.subject, this.state.body)
            }}/>
    </div>
  </div>
</form>
)
}
}

export default ComposeMessage;
