import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import { DictumForm } from "components/puzzles/dicta/DictumForm"
import Fa from 'react-fontawesome'
import classNames from 'classnames'
import 'components/puzzles/dicta/DictumFormModal.scss'

export class DictumFormModal extends React.Component {
  state = {
    formType: 'simple',
  }

  switchSimpleType() {
    this.setState({formType: 'simple'})
  }

  switchComplexType() {
    this.setState({formType: 'complex'})
  }

  save() {
    console.log("save")
    // const values = this.form.values();
    // values.dataType = this.state.formType;
    // this.props.onSave(this.props.dictum, values);
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