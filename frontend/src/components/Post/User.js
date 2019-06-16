import React, { Component } from 'react'
import { DropdownItem } from 'reactstrap'

class User extends Component {

	handleAuthor(id, name) {
		this.props.handleAuthor(id, name)
	}

	render() {
		var currentId = this.props.data.id
		var currentName = this.props.data.name
		return (
			<DropdownItem id={currentId} onClick={() => this.handleAuthor(currentId, currentName)}>
			{currentName}
			</DropdownItem>
		)
	}
}

export default User;