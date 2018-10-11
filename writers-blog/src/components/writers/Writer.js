import React, {Fragment} from 'react'

export default ({match, id, name, description, image}) => 
    console.log(match, id, name, description, image) ||
    <Fragment>
        <div>
            {id}
            {name}
            {description}
            {image}
        </div>
    </Fragment>