import "components/puzzles/dicta/TranslationBox.scss"
import React from "react"
import { Field } from 'redux-form'
import InputBox from 'components/ui/form/InputBox'
import { Button } from "react-bootstrap"
import classNames from 'classnames'
import Fa from 'react-fontawesome'
import { Input } from 'components/ui/redux-form-fields/Input'

export class TranslationBox extends React.Component {
    renderInputComponent = ({input, meta}) => {
        return (
            <InputBox showErrors={false} className="translation-box" errors={meta.error}>
                <Input input={input} meta={meta} placeholder="Translation" className="md-control"/>
                <div className="translation-actions">
                    <Button bsStyle="link"
                            onClick={this.props.delete}
                            className={classNames({inactive: !this.props.canDelete})}>
                        <Fa name="trash" />
                    </Button>
                </div>
            </InputBox>
        );
    }

    constructor(...args) {
        super(...args);
        this.renderInputComponent = this.renderInputComponent.bind(this);
    }

    render() {
        return (
            <Field name={this.props.controlName} component={this.renderInputComponent} />
        )
    }
}
