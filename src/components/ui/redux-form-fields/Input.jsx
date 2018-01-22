import React from 'react'
import classnames from 'classnames'

export class Input extends React.Component {
    render() {
        const controlClass = classnames('form-control', this.props.className)

        return (
            <input {...this.props.input}
                type={this.props.type || 'text'} 
                placeholder={this.props.placeholder}
                className={controlClass} />
        );
    }
}