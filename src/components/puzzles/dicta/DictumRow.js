import React from 'react';
import { observer, inject } from 'mobx-react';
import Fa from 'react-fontawesome';
import 'components/puzzles/dicta/DictumRow.scss';

@inject('dictaStore')
@observer
export class DictumRow extends React.Component {
  drop() {
    // this.props.wordsStore.remove(this.props.ind);
  }

  render() {
    return (
      <tr>
        <td>{this.props.word.spelling}</td>
        <td></td>
        <td>
          <div className="word-actions">
            <button type="button" onClick={this.drop.bind(this)} className="btn btn-link pd-0 no-outline word-drop">
              <Fa name="trash-o" />
            </button>
            <button type="submit" className="btn btn-link pd-0 no-outline word-ok">
              <Fa name="check" />
            </button>
          </div>
        </td>
      </tr>
    );
  }
}