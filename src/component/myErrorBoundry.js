import React, { Component } from 'react'

class myErrorBoundry extends Component {
    constructor(props) {
        super(props)

        this.state = {
            hasError: false,
        }
    }
    static getDerivedStateFromError(error) {
        return {
            hasError: true
        }
    }
    render() {
        if (this.state.hasError) {
            return (
                <div>
                    <h1>Something went Wrong</h1>
                </div>
            )
        }
        else {
            return this.props.children
        }

    }
}

export default myErrorBoundry
