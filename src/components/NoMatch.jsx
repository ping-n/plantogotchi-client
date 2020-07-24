import React, { Component } from 'react'
import { Header } from 'semantic-ui-react'

export class NoMatch extends Component {
  render() {
    return (
      <div>
        <Header as="h1" color="black" >NO MATCH</Header>
        <p>Pages Not Found !!!</p>
      </div>
    )
  }
}

export default NoMatch

