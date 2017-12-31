import React from 'react';
import { observer, inject } from 'mobx-react';
import { DictumRow } from "components/puzzles/dicta/DictumRow";
import {DictumFormModal} from "components/puzzles/dicta/DictumFormModal";
import {ValidationError} from "errors/ValidationError";

@inject('dictaStore')
@observer
export class DictumList extends React.Component {
  state = {
    adding: false,
    formDictum: null,
    formErrors: null,
  };

  finishAdding() {
    this.setState({adding: false});
  }

  saveChanges(values) {
    this.props.dictaStore.create(values).catch((err) => {
      if (err instanceof ValidationError) {
        this.setState({formErrors: err.fails})
      }
    });
  }

  add() {
    this.setState({formDictum: null});
    this.setState({adding: true});
  }

  componentWillMount() {
    this.props.dictaStore.load();
  }

  render() {
    return (
      <div className="row">
        <button type="button" className="btn btn-primary mg-b-10" onClick={this.add.bind(this)}>New</button>

        <table className="table table-bordered">
          <thead>
            <tr className="text-center">
              <th>Original</th>
              <th>Translations</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            { this.props.dictaStore.list.map((word, ind) => (
              <DictumRow ind={ind} word={word} key={ind}/>
            )) }
          </tbody>
        </table>

        <DictumFormModal isOpen={this.state.adding}
                         errors={this.state.formErrors}
                         dictum={this.state.formDictum}
                         onHide={this.finishAdding.bind(this)}
                         onSave={this.saveChanges.bind(this)}/>
      </div>
    );
  }
}