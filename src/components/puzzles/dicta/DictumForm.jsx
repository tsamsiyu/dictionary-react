import 'components/puzzles/dicta/DictumForm.scss'
import React from 'react'
import { Field, FieldArray, reduxForm } from 'redux-form'
import Fa from 'react-fontawesome'
import { Button, Panel } from "react-bootstrap"
import classNames from 'classnames'
import { TranslationBox } from "components/puzzles/dicta/TranslationBox"
import { connect } from "react-redux"
import { BoxedInput } from 'components/ui/redux-form-fields/BoxedInput'

const renderTranslations = ({fields}) => {
    return fields.map((translation, index) => (
                <TranslationBox key={index}
                                controlName={`${translation}.spelling`} 
                                delete={ () => fields.remove(index) }
                                canDelete={fields.length > 1} />
            ));
}

const renderGroups = ({fields, addTranslation}) => {
    const renderGroupHeader = (group, index) => {

        const btnGroupDropClass = classNames('translation-group-drop', {inactive: fields.length < 2});
        return (
            <div>
                <Field name={`${group}.explanation`} component={BoxedInput} placeholder="Group" />
                <div className="translation-group-actions">
                    <Button onClick={() => addTranslation(index) } bsStyle="link" className="translation-group-add">
                        <Fa name="plus"/>
                    </Button>
                    <Button onClick={ () => fields.remove(index) } bsStyle="link" className={btnGroupDropClass}>
                        <Fa name="trash"/>
                    </Button>
                </div>
            </div>
        );
    }

    return fields.map((group, index) => (
                <Panel key={index} header={renderGroupHeader(group, index)}  className="translation-group">
                    <FieldArray key={index} name={`${group}.translations`} component={renderTranslations} />
                </Panel>
            ));
}

@connect((state) => ({
    initialValues: {
        translations: [{}],
        groups: [{translations: [{}]}],
    }
}))
@reduxForm({
    form: 'dictumForm',
})
export class DictumForm extends React.Component {
    addEntity() {
        if (this.props.type === 'simple') {
            this.props.array.push('translations', {});
        } else {
            this.props.array.push('groups', {translations: [{}]});
        }
    }

    addTranslationToGroup(index) {
        this.props.array.push(`groups[${index}].translations`, {})
    }

    render() {
        const entityName = this.props.type === 'simple' ? 'Translations' : 'Groups';
        return (
            <div id="dictum-form">
                <form onSubmit={this.props.handleSubmit}>
                    <Field name="spelling" component={BoxedInput} placeholder="Original" />

                    <fieldset>
                        <legend id="translation-legend">
                            <Button onClick={ () => this.addEntity() } bsStyle="link">
                                <Fa name="plus"/>
                            </Button>
                            <p>{entityName}</p>
                        </legend>
                        { this.props.type === 'simple' && (
                            <FieldArray name="translations" component={renderTranslations} />
                        ) }
                        { this.props.type === 'complex' && (
                            <FieldArray name="groups" 
                                        component={renderGroups} 
                                        addTranslation={this.addTranslationToGroup.bind(this)}/>
                        ) }
                    </fieldset>
                </form>
            </div>
        )
    }
}
