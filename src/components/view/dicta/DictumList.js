import React from 'react';
import { observer, inject } from 'mobx-react';
import { DictumFormModal } from "components/puzzles/dicta/DictumFormModal";
import { ValidationError } from "errors/ValidationError";
import { DictaGrid } from 'components/puzzles/dicta/DictaGrid';

@inject('dictaStore')
@observer
export class DictumList extends React.Component {
  state = {
    formEnabled: false,
    formDictum: null,
    formErrors: null,
  };

  disableForm() {
    this.setState({formEnabled: false});
  }

  saveChanges(model, values) {
    let promise;
    if (model && model.id) {
      promise = this.props.dictaStore.update(model, values);
    } else {
      promise = this.props.dictaStore.create(values);
    }
    promise.then(() => {
      this.disableForm();
      this.props.dictaStore.load();
    })
    .catch((err) => {
      if (err instanceof ValidationError) {
        this.setState({formErrors: err.fails})
      } else {
        // TODO
      }
    });
  }

  add() {
    this.setState({formDictum: null});
    this.setState({formEnabled: true});
  }

  edit(dictum) {
    this.setState({formDictum: dictum});
    this.setState({formEnabled: true});
  }

  remove(dictum) {
    this.props.dictaStore.remove(dictum).then(() => {
      this.props.dictaStore.load();
    });
  }

  componentWillMount() {
    this.props.dictaStore.load();
  }

  render() {
    return (
      <div className="row">
        <button type="button" className="btn btn-primary mg-b-10" onClick={this.add.bind(this)}>New</button>

        <DictaGrid  dicta={this.props.dictaStore.originalDicta}
                    edit={this.edit.bind(this)}
                    remove={this.remove.bind(this)} />

        <DictumFormModal isOpen={this.state.formEnabled}
                         errors={this.state.formErrors}
                         dictum={this.state.formDictum}
                         onHide={this.disableForm.bind(this)}
                         onSave={this.saveChanges.bind(this)}/>
      </div>
    );
  }
}