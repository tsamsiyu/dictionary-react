import React from 'react'
import Fa from 'react-fontawesome'
import { TranslationBox } from "components/puzzles/dicta/TranslationBox"
import { Button, Panel } from "react-bootstrap"
import { Field, FieldArray } from 'redux-form'
import classNames from 'classnames'
import { BoxedInput } from 'components/ui/redux-form-fields/BoxedInput'

export class DictumFormGroup extends React.Component {
    constructor(...args) {
        super(...args)
        this.renderTranslations = this.renderTranslations.bind(this);
        this.renderGroupHeader = this.renderGroupHeader.bind(this);
    }

    renderGroupHeader = (group, index) => {
        const btnGroupDropClass = classNames('translation-group-drop', {inactive: this.props.fields.length < 2});
        return (
            <div>
                <Field name={`${group}.explanation`} component={BoxedInput} placeholder="Group" />
                <div className="translation-group-actions">
                    <Button onClick={() => this.props.addTranslation(index) } bsStyle="link" className="translation-group-add">
                        <Fa name="plus"/>
                    </Button>
                    <Button onClick={ () => this.props.fields.remove(index) } bsStyle="link" className={btnGroupDropClass}>
                        <Fa name="trash"/>
                    </Button>
                </div>
            </div>
        );
    }

    renderTranslations = ({fields}) => {
        return fields.map((translation, index) => (
                    <TranslationBox key={index}
                                    controlName={`${translation}.spelling`} 
                                    delete={ () => fields.remove(index) }
                                    canDelete={fields.length > 1} />
                ));
    }

    render() {
        return this.props.fields.map((group, index) => (
            <Panel key={index} header={this.renderGroupHeader(group, index)}  className="translation-group">
                <FieldArray name={`${group}.translations`} component={this.renderTranslations} />
            </Panel>
        ));
    }
}
