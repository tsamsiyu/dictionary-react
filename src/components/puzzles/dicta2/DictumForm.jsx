import React from 'react';
import GroupInput from "components/ui/controls/GroupInput";
import { observer } from 'mobx-react';
import Fa from 'react-fontawesome';
import "components/puzzles/dicta/DictumForm.scss";
import { Button, Panel } from "react-bootstrap";
import {TranslationBox} from "./TranslationBox";
import classNames from 'classnames';

@observer
export class DictumForm extends React.Component {
 
  addTranslation(group) {
    if (group) {
      group.$('translations').add();
    } else {
      this.props.form.$('translations').add();
    }
  }

  addGroup() {
    this.props.form.$('translation_groups').add();
  }

  deleteField(field) {
    field.del();
  }

  renderGroupHeader(group) {
    const btnGroupDropClass = classNames('translation-group-drop', {inactive: this.props.form.$('translation_groups').size < 2});
    return (
        <div>
          <GroupInput field={group.$('explanation')} hideErrors={true} noLabel={true} placeholder="Group"/>
          <div className="translation-group-actions">
            <Button onClick={this.addTranslation.bind(this, group)} bsStyle="link" className="translation-group-add">
              <Fa name="plus"/>
            </Button>
            <Button onClick={this.deleteField.bind(this, group)} bsStyle="link" className={btnGroupDropClass}>
              <Fa name="trash"/>
            </Button>
          </div>
        </div>
    );
  }

  render() {
    return (
      <div id="dictum-form">
        <form onSubmit={this.props.form.onSubmit}>
          <GroupInput field={this.props.form.$('spelling')} hideErrors={true} placeholder="Original" noLabel={true}/>

          <fieldset>
            <legend id="translation-legend">
              <Button onClick={this.addGroup.bind(this)} bsStyle="link"><Fa name="plus"/></Button>
              <p>Translations</p>
            </legend>

            { this.props.type === 'simple' && this.props.form.$('translations').map((translation) => (
              <TranslationBox key={translation.key}
                              field={translation.$('spelling')}
                              delete={this.deleteField.bind(this, translation)}
                              canDelete={this.props.form.$('translations').size > 1}/>
            )) }

            { this.props.type === 'complex' && this.props.form.$('translation_groups').map((group) => (
              <Panel key={group.key} header={this.renderGroupHeader(group)}  className="translation-group">
                { group.$('translations').map((translation) => (
                <TranslationBox key={translation.key}
                                field={translation.$('spelling')}
                                delete={this.deleteField.bind(this, translation)}
                                canDelete={group.$('translations').size > 1}/>
                )) }
              </Panel>
            )) }

          </fieldset>
        </form>
      </div>
    );
  }
}