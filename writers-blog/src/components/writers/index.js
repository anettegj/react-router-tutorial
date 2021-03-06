import React, {Fragment} from 'react'
import {Link, Route} from 'react-router-dom'
import Writer from './Writer'

export default ({ match: {url}, writers}) => 
    <Fragment>
        <ul>
            {writers.map(({id, name}) => 
                <li key={id}>
                    <Link to={`${url}/${id}`}>{name}</Link>
                </li>
            )}
        </ul>
        <Route exact path={url} render={() => <h3>Please select a writer from above</h3>}/>
        <Route path={`${url}/:writerId`} render={
            props => {
                const writer = writers.find(writer => writer.id === props.match.params.writerId)
                if (writer)
                    return <Writer {...props} {...writer}/> 
                else 
                    // Redirect you to 404-page
                    // return <Redirect to={'/404'}/>
                    // don't redirect, just stay on the writers page and 
                    // let user select an author from the lit
                    return <h3>Unknown author</h3>  
                }}
                
                />
    </Fragment>