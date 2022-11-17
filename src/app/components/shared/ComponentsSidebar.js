import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

export class ComponentsSidebar extends Component {
  render() {
    return (
      <div>
        <div className="az-content-left az-content-left-components">
          <div className="component-item">
          </div>{/* component-item */}
        </div>{/* az-content-left */}
      </div>
    )
  }

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }
}

export default withRouter(ComponentsSidebar)
