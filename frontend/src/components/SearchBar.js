import React, { Component, useEffect } from 'react';
import Autosuggest from 'react-autosuggest';
import './SearchBar.css'
import io from 'socket.io-client';
import {Router, NavLink, Redirect} from 'react-router-dom'

const getSuggestionValue = suggestion => {
  return suggestion.name;
}
const renderSuggestion = suggestion => (
    <NavLink to={`/${suggestion['type'] == 'post' ? 'post':'users'}/${suggestion['id']}`}>
      {suggestion['type'] == 'post'? suggestion.name:suggestion.name}
    </NavLink >
);

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
 
    this.socket = io.connect('http://localhost:3001');
    this.socket.emit('search', this.state.value);
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
    this.setState({
      suggestions: post_list.concat(user_list),
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
      onChange: this.onChange
    };

    return (
        <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
          />
    );
  }
}
