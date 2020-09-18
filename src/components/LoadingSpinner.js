import React, { Component } from 'react'

class LoadingSpinner extends Component {
  render() {
    return (
      <div className="spinner-border text-primary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    )
  }
}

export default LoadingSpinner