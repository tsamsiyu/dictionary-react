import React from 'react';
import InputBox from "components/ui/controls/InputBox";
import { observer } from 'mobx-react';
import classNames from 'classnames';
import {Button} from "react-bootstrap";
import Fa from 'react-fontawesome';

@observer
export class TranslationBox extends React.Component {
  render() {
    return (
      <InputBox field={this.props.field} hideErrors={true} className="translation-box">
          <input {...this.props.field.bind()} className="form-control"/>          
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
}