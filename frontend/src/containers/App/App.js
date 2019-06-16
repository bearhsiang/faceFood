import React, { Component } from 'react';
import BottomNav from '../../components/BottomNav';
import TopNav from '../../components/TopNav';
// import BotBtn from '../../components/BotBtn';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.toggleBtn = this.toggleBtn.bind(this);
    this.handleAuthor = this.handleAuthor.bind(this);
    this.state = {
      dropdownOpen: props.dropdownOpen,
      openForm: props.openForm
    }
    
  }
  state = {
    formTitle: '',
    formBody: ''
  }

  handleFormSubmit = e => {
    e.preventDefault()

    const { formTitle, formBody } = this.state

    if (!formTitle || !formBody) return

    this.createPost({
      variables: {
        title: formTitle,
        body: formBody,
        published: true,
        authorId: 2
      }
    })

    this.setState({
      formTitle: '',
      formBody: ''
    })
  }
  // ------------------------------- USERS -----------------------------------
  toggleBtn() {
    this.setState({ dropdownOpen: !this.state.dropdownOpen})
  }

  handleAuthor(id, name) {
    this.setState({ 
      authorId: id,
      authorName: name,
      openForm: true
    })
  }

  render() {
    return (
      <div>
        <TopNav /><br/><br/>
        {/* <BotBtn /> */}
        <BottomNav/>
      </div>
    )
  }
}

export default App
