import React, { Component, Fragment } from 'react'
import { BrowserRouter, Link, Route } from 'react-router-dom'
import Writers from './writers'
export default class extends Component {
  state = {
    writers: []
  }

  componentDidMount() {
    fetch('http://localhost:3004/writers')
      .then(res => res.json())
      .then(writers => this.setState({writers}))
  }

  render() {
    
    const {writers} = this.state

    return (
      <BrowserRouter>
        <Fragment>
          <ul>
            <li>
              {/** Link will help us keeping this a single page application by
                  making sure the page doesn't reload even though we change the url */}
              <Link to="/">Home</Link>
            </li>
            <li> 
              <Link to="/writers">Writers </Link>
            </li>
          </ul>

          <hr/>
          {/** Without Route exact the content of Home is displayed for the Writers link 
            as well. */}
          <Route exact path="/" render={() => <div>Home</div>}></Route>
          <Route path="/writers" render={props => <Writers {...props} writers={writers}/>}/>
        </Fragment>
      </BrowserRouter>
    )
  }
}
