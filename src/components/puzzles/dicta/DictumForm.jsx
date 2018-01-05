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
 
  add(group) {
    if (group) {
      group.$('translations').add();
    } else {
      this.props.form.$('groups').add();
    }
  }

  delete(group, translation) {
    console.log(translation);
    if (translation !== null) {
      translation.del();
    } else {
      group.del();
    }
  }

  renderGroupHeader(group) {
    const btnGroupDropClass = classNames('translation-group-drop', {inactive: this.props.form.$('groups').size < 2});
    return (
        <div>
          <GroupInput field={group.$('explanation')} hideErrors={true} noLabel={true} placeholder="Group"/>
          <div className="translation-group-actions">
            <Button onClick={this.add.bind(this, group)} bsStyle="link" className="translation-group-add">
              <Fa name="plus"/>
            </Button>
            <Button onClick={this.delete.bind(this, group, null)} bsStyle="link" className={btnGroupDropClass}>
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
              <Button onClick={this.add.bind(this, null)} bsStyle="link"><Fa name="plus"/></Button>
              <p>Translations</p>
            </legend>

            { this.props.type === 'simple' && this.props.form.$('groups').map((group) => (
              <TranslationBox key={group.key}
                              field={group.$('translations[0].spelling')}
                              delete={this.delete.bind(this, group, null)}
                              canDelete={this.props.form.$('groups').size > 1}/>
            )) }

            { this.props.type === 'complex' && this.props.form.$('groups').map((group) => (
              <Panel key={group.key} header={this.renderGroupHeader(group)}  className="translation-group">
                { group.$('translations').map((translation) => (
                <TranslationBox key={translation.key}
                                field={translation.$('spelling')}
                                delete={this.delete.bind(this, group, translation)}
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