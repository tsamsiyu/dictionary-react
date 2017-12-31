import React from 'react';
import GroupInput from "components/ui/controls/GroupInput";
import { observer } from 'mobx-react';
import Fa from 'react-fontawesome';
import "components/puzzles/dicta/DictumForm.scss";
import {Button} from "react-bootstrap";
import InputBox from 'components/ui/controls/InputBox';
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

  remove(group, translation) {
    if (translation !== null) {
      translation.del();
    } else {
      group.del();
    }
  }

  render() {
    return (
      <div>
        <form>
          <GroupInput field={this.props.form.$('spelling')} hideErrors={true}/>

          <fieldset>
            <legend id="translation-legend">
              <Button onClick={this.add.bind(this, null)} bsStyle="link"><Fa name="plus"/></Button>
              <p>Translations</p>
            </legend>

            { this.props.type === 'simple' && this.props.form.$('groups').map((group) => (
              <TranslationBox key={group.key}
                              field={group.$('translations[0].spelling')}
                              delete={this.remove.bind(this, group, null)}
                              canDelete={this.props.form.$('groups').size > 1}/>
            )) }

            { this.props.type === 'complex' && this.props.form.$('groups').map((group) => (
              <div key={group.key} className="complex-translation">
                <div className="group-control-wrap">
                  <Button onClick={this.add.bind(this, group)} bsStyle="link"><Fa name="plus"/></Button>
                  <Button onClick={this.remove.bind(this, group, null)}
                          bsStyle="link"
                          className={classNames({inactive: this.props.form.$('groups').size < 2})}>
                    <Fa name="trash"/>
                  </Button>
                  <label className="control-label" htmlFor={group.id}>Group:</label>
                  <InputBox field={group.$('explanation')} hideErrors={true}>
                      <input {...group.$(`explanation`).bind()} className="form-control"/>
                  </InputBox>
                </div>
                { group.$('translations').map((translation) => (
                  <TranslationBox key={translation.key}
                                  field={translation.$('spelling')}
                                  delete={this.remove.bind(this, group, translation)}
                                  canDelete={group.$('translations').size > 1}/>
                )) }
                <hr/>
              </div>
            )) }

          </fieldset>
        </form>
      </div>
    );
  }
}