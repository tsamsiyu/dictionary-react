import React from 'react';
import { observer, inject } from 'mobx-react';
import { DictumFormModal } from "components/puzzles/dicta/DictumFormModal";
import { ValidationError } from "errors/ValidationError";
import { Grid } from 'components/ui/grid/Grid';
import { Button } from 'react-bootstrap';
import Fa from 'react-fontawesome';
import Dotdotdot from 'react-dotdotdot'

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
    this.props.dictaStore.create(values)
    .then(() => {
      this.setState({adding: false});
    })
    .catch((err) => {
      if (err instanceof ValidationError) {
        this.setState({formErrors: err.fails})
      }
    });
  }

  add() {
    this.setState({formDictum: null});
    this.setState({adding: true});
  }

  drop(dictum) {
    this.props.dictaStore.remove(dictum);
  }

  componentWillMount() {
    this.props.dictaStore.load();
    this.columns = [
      {
        key: 'id',
        title: 'ID',
      },
      {
        key: 'spelling',
        title: 'Original',
      },
      {
        key: 'translation',
        title: 'Translation',
        value: (row) => {
          return (
            <Dotdotdot clamp='auto'>
              { row.translations.map((t) => t ? t.spelling : '').join(', ') }
            </Dotdotdot>
          )
        }
      },
      {
        key: 'action',
        title: '',
        value: (row) => {
          return (
            <div className="dictum-actions">
              <Button bsStyle="link" className="pd-0" onClick={this.drop.bind(this, row)}>
                <Fa name="trash"/>
              </Button>
            </div>
          )
        }
      }
    ];
  }

  render() {
    return (
      <div className="row">
        <button type="button" className="btn btn-primary mg-b-10" onClick={this.add.bind(this)}>New</button>

        <Grid columns={this.columns} rows={this.props.dictaStore.originalDicta} />

        <DictumFormModal isOpen={this.state.adding}
                         errors={this.state.formErrors}
                         dictum={this.state.formDictum}
                         onHide={this.finishAdding.bind(this)}
                         onSave={this.saveChanges.bind(this)}/>
      </div>
    );
  }
}