import React from 'react'
import InputBox from 'components/ui/form/InputBox'
import { Input } from 'components/ui/redux-form-fields/Input'

export class BoxedInput extends React.Component {
    render() {
        return (
            <InputBox showErrors={this.props.showErrors}
                        label={this.props.label}
                        labelClass={this.props.labelClass}
                        errors={this.props.meta.error}>
                <Input input={this.props.input} 
                        placeholder={this.props.placeholder}
                        meta={this.props.meta}
                        label={this.props.label} />
            </InputBox>
        );
    }
}