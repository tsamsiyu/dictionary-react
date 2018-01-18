import React from 'react';
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

  createForm() {
    const fields = [
      'spelling',

      'translation_groups',
      'translation_groups[]',
      'translation_groups[].explanation',

      'translation_groups[].translations',
      'translation_groups[].translations[]',
      'translation_groups[].translations[].spelling',

      'translations',
      'translations[]',
      'translations[].spelling',
    ];

    const labels = {
      'spelling': 'Original',
      'translation_groups[].explanation': 'Group',
      'translation_groups[].translations[].spelling': 'Translation',
    };

    this.form = new Form({fields, labels, values: this.getFormValues(), hooks: {onSuccess: this.save}});
  }

  getFormValues(model) {
    model = model !== undefined ? model : this.props.dictum;
    if (model) {
      return model.literal();
    } else {
      return {
        translation_groups: [{
          explanation: '',
          translations: [{
            spelling: '',
          }]
        }],
        translations: [{
          spelling: '',
        }],
      };
    }
  }

  componentWillMount() {
    this.createForm();
  }

  componentWillUpdate(newProps) {
    if (newProps.dictum !== this.props.dictum) {
      this.form.update(this.getFormValues(newProps.dictum));

      if (newProps.dictum && newProps.dictum.translation_groups.length) {
        this.setState({formType: 'complex'});
      } else {
        this.setState({formType: 'simple'});
      }
    }
    if (newProps.errors) {
      this.form.showErrors(false);
      this.form.fillErrors(newProps.errors);
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
    this.props.onSave(this.props.dictum, values);
  }

  render() {
    return (
      <Modal show={this.props.isOpen} onHide={this.props.onHide}>
        <Modal.Header>
          <h4 className="pull-left">Dictum form</h4>
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