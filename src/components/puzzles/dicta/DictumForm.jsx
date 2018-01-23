import 'components/puzzles/dicta/DictumForm.scss'
import React from 'react'
import { Field, FieldArray, reduxForm } from 'redux-form'
import Fa from 'react-fontawesome'
import { Button } from "react-bootstrap"
import { connect } from "react-redux"
import { BoxedInput } from 'components/ui/redux-form-fields/BoxedInput'
import { DictumFormGroup } from 'components/puzzles/dicta/DictumFormGroup'

@connect((state) => ({
    initialValues: {
        groups: [{translations: [{}]}],
    }
}))
@reduxForm({
    form: 'dictumForm',
})
export class DictumForm extends React.Component {
    addGroup() {
        this.props.array.push('groups', {translations: [{}]});
    }

    addTranslationToGroup(index) {
        this.props.array.push(`groups[${index}].translations`, {})
    }

    render() {
        return (
            <div id="dictum-form">
                <form onSubmit={this.props.handleSubmit}>
                    <Field name="spelling" component={BoxedInput} placeholder="Original" controlClass="md-control" />

                    <fieldset>
                        <legend id="translation-legend">
                            <Button onClick={ () => this.addGroup() } bsStyle="link">
                                <Fa name="plus"/>
                            </Button>
                            <p>Groups</p>
                        </legend>
                        <FieldArray name="groups" component={DictumFormGroup} addTranslation={ (index) => this.addTranslationToGroup(index) } />
                    </fieldset>
                </form>
            </div>
        )
    }
}
