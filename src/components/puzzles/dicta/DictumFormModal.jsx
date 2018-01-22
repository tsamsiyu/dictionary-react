import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import { DictumForm } from "components/puzzles/dicta/DictumForm"
import { submit } from 'redux-form'
import { connect } from 'react-redux'
import actions from 'store/dicta/actionCreators'
import { SubmissionError } from 'redux-form'

@connect(null, (dispatch) => ({
  create: (dictum) => dispatch(actions.createRequest(dictum)),
  submit: (formName) => dispatch(submit(formName)),
}))
export class DictumFormModal extends React.Component {
  triggerSubmittion() {
    this.props.submit('dictumForm')
  }

  onSubmit(dictum) {
    return this.props.create(dictum).catch(err => {
      console.log(err.formFails)
      throw new SubmissionError(err.formFails)
    })
  }

  render() {
    return (
      <Modal show={this.props.isOpen} onHide={this.props.onHide}>
        <Modal.Header>
          <h4 className="pull-left">Dictum form</h4>
        </Modal.Header>

        <Modal.Body>
          <DictumForm onSubmit={this.onSubmit.bind(this)}/>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={this.props.onHide} bsStyle="danger">Close</Button>
          <Button onClick={this.triggerSubmittion.bind(this)} bsStyle="success">Save</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}