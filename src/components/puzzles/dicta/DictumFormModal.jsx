import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import { DictumForm } from "components/puzzles/dicta/DictumForm"
import Fa from 'react-fontawesome'
import classNames from 'classnames'
import { submit } from 'redux-form'
import { connect } from 'react-redux'
import 'components/puzzles/dicta/DictumFormModal.scss'
import actions from 'store/dicta/actionCreators'
import { SubmissionError } from 'redux-form'

@connect(null, (dispatch) => ({
  create: (dictum) => dispatch(actions.createRequest(dictum)),
  submit: (formName) => dispatch(submit(formName)),
}))
export class DictumFormModal extends React.Component {
  state = {
    formType: 'simple',
  }

  turnSimpleType() {
    this.setState({formType: 'simple'})
  }

  turnComplexType() {
    this.setState({formType: 'complex'})
  }

  triggerSubmittion() {
    this.props.submit('dictumForm')
  }

  onSubmit(dictum) {
    dictum.dataType = this.state.formType;
    return this.props.create(dictum).catch(err => {
      throw new SubmissionError(err.formFails)
    })
  }

  render() {
    return (
      <Modal show={this.props.isOpen} onHide={this.props.onHide}>
        <Modal.Header>
          <h4 className="pull-left">Dictum form</h4>
          <div id="form-type" className="pull-right">
            <button className={classNames({'active' : this.state.formType === 'simple'})}
                    title="Simple"
                    onClick={this.turnSimpleType.bind(this)}>
              <Fa name="columns"/>
            </button>
            <button className={classNames({'active' : this.state.formType === 'complex'})}
                    title="Complex"
                    onClick={this.turnComplexType.bind(this)}>
              <Fa name="table"/>
            </button>
          </div>
        </Modal.Header>

        <Modal.Body>
          <DictumForm type={this.state.formType} onSubmit={this.onSubmit.bind(this)}/>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={this.props.onHide} bsStyle="danger">Close</Button>
          <Button onClick={this.triggerSubmittion.bind(this)} bsStyle="success">Save</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}