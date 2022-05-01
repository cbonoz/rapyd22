import React from 'react'
import PropTypes from 'prop-types'

function ApiDoc({
    title,
    route,
    description,
    request,
    response
}) {
  return (
    <div>
        <h2>{title}</h2>
        <hr/>
        <p>{description}</p>
        <h4>Route:</h4>
        <pre className='code-block'>{route}</pre>

        <h4>Example Request:</h4>
        <pre className='code-block'>{request}</pre>
        <h4>Example Response:</h4>
        <pre className='code-block'>{response}</pre>

    </div>
  )
}

export default ApiDoc
