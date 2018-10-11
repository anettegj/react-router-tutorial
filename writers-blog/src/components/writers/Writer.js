import React, {Fragment} from 'react'
import { Link, Route } from 'react-router-dom'
import Text from './Text'

export default ({match: {url}, name, born, deceased, description, image, texts}) => 
    <Fragment>
        <img src={image} alt={name} style={{maxWidth:300}}/>
        <h1>{name}</h1>
        <h3>{born} &mdash; {deceased}</h3>
        <p>{description}</p>
        <ul>
            {texts.map(({id, title}) => 
            <li key={id}>
                <Link to={`${url}/texts/${id}`}>{title}</Link>
            </li>)}
        </ul>

        <Route path={`${url}/texts/:textId`} render={
            props => {
                const text = texts.find(t => t.id === props.match.params.textId)
                if(text) return <Text {...props} {...text}/>
                else return <h3>No text</h3>
            }
        }></Route>
    </Fragment>