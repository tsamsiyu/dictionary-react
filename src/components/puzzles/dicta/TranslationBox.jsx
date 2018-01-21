import "components/puzzles/dicta/TranslationBox.scss"
import React from "react"
import { Field } from 'redux-form'
import InputBox from 'components/ui/form/InputBox'
import { Button } from "react-bootstrap"
import classNames from 'classnames'
import Fa from 'react-fontawesome'

export class TranslationBox extends React.Component {
    render() {
        return (
            <InputBox showErrors={false} className="translation-box">
                <Field name={this.props.controlName}
                        component="input"
                        type="text" 
                        className="form-control"
                        placeholder="Translation" />
                <div className="translation-actions">
                    <Button bsStyle="link"
                            onClick={this.props.delete}
                            className={classNames({inactive: !this.props.canDelete})}>
                        <Fa name="trash" />
                    </Button>
                </div>
            </InputBox>
        )
    }
}
