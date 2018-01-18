import React from 'react'
import { Field, FieldArray, reduxForm } from 'redux-form'
import InputBox from 'components/ui/form/InputBox'
import Fa from 'react-fontawesome'
import { Button, Panel } from "react-bootstrap"
import update from 'immutability-helper'
import 'components/puzzles/dicta/DictumForm.scss'

@reduxForm({
    form: 'dictumForm'
})
export class DictumForm extends React.Component {
    state = {
        translationFields: [],
    }

    handleSubmit() {
        console.log("handle submit");
        return false;
    }

    addGroup() {
        const newState = update(this.state, {translationFields : {$push: [{}]}})
        this.setState(newState)
        console.log(this.state)
        // this.setState({});
    }

    renderTranslations({fields}) {
        console.log(fields)
        return (
            <div>
                { fields.map((field, index) => (
                    <InputBox showErrors={false} key={index}>
                        <Field name={`translations[${index}][spelling]`}
                                component="input"
                                type="text" 
                                className="form-control"
                                placeholder="Translation" />
                    </InputBox>
                )) }
            </div>
        )
    }

    render() {
        return (
            <div id="dictum-form">
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <InputBox showErrors={false}>
                        <Field name="spelling" 
                                component="input"
                                type="text" 
                                className="form-control"
                                placeholder="Original" />
                    </InputBox>

                    <fieldset>
                        <legend id="translation-legend">
                            <Button onClick={this.addGroup.bind(this)} bsStyle="link">
                                <Fa name="plus"/>
                            </Button>
                            <p>Translations</p>
                        </legend>

                        <FieldArray name="translations" 
                                    fields={this.state.translationFields}
                                    component={this.renderTranslations} />

                        {/* { this.props.type === 'simple' && this.state.translations.map((translation) => (
                            // <TranslationBox key={translation.key}
                            //                 field={translation.$('spelling')}
                            //                 delete={this.deleteField.bind(this, translation)}
                            //                 canDelete={this.props.form.$('translations').size > 1}/>
                        )) } */}
                    </fieldset>
                </form>
            </div>
        )
    }
}