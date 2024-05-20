import {Link} from 'react-router-dom'

import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      className="not-found-image"
      alt="not found"
      src="https://assets.ccbp.in/frontend/react-js/not-found-blog-img.png"
    />
    <h1 className="not-found-heading">Page Not Found</h1>
    <Link to="/">
      <button type="button" className="go-home-button">
        Go Home
      </button>
    </Link>
  </div>
)

export default NotFound
