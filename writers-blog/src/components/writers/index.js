import React, {Fragment} from 'react'
import {Link} from 'react-router-dom'

export default ({writers}) => 
    <Fragment>
        <ul>
            {writers.map(writer => 
                <li>
                    <Link to=" ">name</Link>
                </li>
            )}
        </ul>
    </Fragment>