import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Writers from './writers'
import {NotFound} from './errors'
import Layout from './Layout'

 
export default class extends Component {
  state = {
    writers: []
  }

  componentDidMount() {
    fetch('http://localhost:3004/writers?_embed=texts')
      .then(res => res.json())
      .then(writers => this.setState({writers}))
  }

  render() {
    
    const {writers} = this.state

    return (
      <BrowserRouter>
        <Layout writers={writers}>

          {/** Without Route exact the content of Home is displayed for the Writers link 
            as well. */}
          <Switch>
            <Route exact path="/" render={() => <div>Home</div>}></Route>
            <Route path="/writers" render={props => <Writers {...props} writers={writers}/>}/>
            {/**<Route render={() => <h3>404 - Page not found</h3>}/>*/}
            <Route component={NotFound}/>
          </Switch>
        </Layout>
      </BrowserRouter>
    )
  }
}
