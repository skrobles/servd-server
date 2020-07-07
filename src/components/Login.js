import React from 'react';
import LoginForm from './LoginForm'
import axios from 'axios'


export default class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(evt) {
    this.setState({[evt.target.name]: evt.target.value})
  }

  async handleSubmit(evt) {
    evt.preventDefault()

  }

  render() {
    return (
      <LoginForm
        onChange={this.handleChange}
        onSubmit={this.handleSubmit}
        state={this.state}
        />
    )
  }
}
