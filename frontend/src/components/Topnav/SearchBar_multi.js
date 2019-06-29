import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import './SearchBar.css'
import io from 'socket.io-client';
import {Link} from 'react-router-dom'
const getSuggestionValue = suggestion => {
  return suggestion.name;
}
const renderSuggestion = suggestion => (
    <Link to={`/${suggestion['type'] === 'post' ? 'post':'users'}/${suggestion['id']}`}>
      {suggestion['type'] === 'post'? suggestion.name:suggestion.name}
    </Link>
    // <div onDoubleClick={console.log('click')}>{suggestion['type'] == 'post'? suggestion.name:suggestion.name}</div>
);

const renderSectionTitle = section => {
  return <strong>{section['title']}</strong>
}
const getSectionSuggestions = section => {
  return section.elements;
}
const endpoint = process.env.REACT_APP_END_POINT;
export default class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      suggestions: [],
      contents: {
        users: [],
        posts: []
      }
    };
    // this.socket = this.props.socket;
    this.socket = io.connect(endpoint);
    this.socket.on('searchResult', data => {
      this.setState({ contents: data })
      this.onSuggestionsFetchRequested({value: ''});
    });  
  }
  

  onChange = (event, { newValue }) => {
    this.socket.emit('search', newValue);
    this.setState({
      value: newValue,
      suggestions: [],
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    // change here for the dropdown menu
    // this.setState({
    //   suggestions: value.length === 0 ? [] : this.state.contents.filter(content =>
    //     content.name.toLowerCase().slice(0, value.length) === value
    //   )
    // });
    let post_list = this.state.contents['posts'].map(post => {
      return { type: 'post', id: post.id, name: post.name}
    })
    let user_list = this.state.contents['users'].map(user => {
      return {type: 'user', id: user.id, name: user.name}
    })
    let sug = []
    if(user_list.length > 0) sug.push({title: 'user', elements: user_list});
    if(post_list.length > 0) sug.push({title: 'post', elements: post_list});
    this.setState({
      suggestions: sug,
    })
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };


  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: '🔍Search...',
      value,
      onChange: this.onChange,
      
    };

    return (
        <div>
        <Autosuggest
            multiSection={true}
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            renderSectionTitle={renderSectionTitle}
            getSectionSuggestions={getSectionSuggestions}
            inputProps={inputProps}
          />
          {/* <button>Search</button> */}
        </div>
    );
  }
}
