import React from 'react';
import { Form } from 'core/Form';
import { Modal, Button } from 'react-bootstrap';
import { DictumForm } from "components/puzzles/dicta/DictumForm";
import Fa from 'react-fontawesome';
import classNames from 'classnames';
import 'components/puzzles/dicta/DictumFormModal.scss';
import { observer } from 'mobx-react';

@observer
export class DictumFormModal extends React.Component {
  state = {
    formType: 'simple',
  };

  componentWillMount() {
    const fields = [
      'spelling',

      'groups',
      'groups[]',
      'groups[].explanation',

      'groups[].translations',
      'groups[].translations[]',
      'groups[].translations[].spelling',
    ];

    const labels = {
      'spelling': 'Original',
      'groups[].explanation': 'Group',
      'groups[].translations[].spelling': 'Translation',
    };

    let dictum;
    if (!this.props.dictum) {
      dictum = {
        groups: [{
          explanation: '',
          translations: [{
            spelling: '',
          }]
        }]
      };
    } else {
      dictum = this.props.dictum;
    }

    this.form = new Form({fields, labels, values: dictum});
  }

  componentWillUpdate(newProps) {
    if (newProps.errors) {
      this.form.showErrors(false);
      this.form.fillErrors(newProps.errors);
      console.log(this.form.errors());
    }
  }

  switchSimpleType() {
    this.form.showErrors(false); // TODO
    this.setState({formType: 'simple'});
  }

  switchComplexType() {
    this.form.showErrors(false); // TODO
    this.setState({formType: 'complex'});
  }

  save() {
    const values = this.form.values();
    values.dataType = this.state.formType;
    this.props.onSave(values);
  }

  render() {
    return (
      <Modal show={this.props.isOpen} onHide={this.props.onHide}>
        <Modal.Header>
          <h4 className="pull-left">
            Dictum form
          </h4>
          <div id="form-type" className="pull-right">
            <button className={classNames({'active' : this.state.formType === 'simple'})}
                    title="Simple"
                    onClick={this.switchSimpleType.bind(this)}>
              <Fa name="columns"/>
            </button>
            <button className={classNames({'active' : this.state.formType === 'complex'})}
                    title="Complex"
                    onClick={this.switchComplexType.bind(this)}>
              <Fa name="table"/>
            </button>
          </div>
        </Modal.Header>

        <Modal.Body>
          <DictumForm form={this.form} type={this.state.formType}/>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={this.props.onHide} bsStyle="danger">Close</Button>
          <Button onClick={this.save.bind(this)} bsStyle="success">Save</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}