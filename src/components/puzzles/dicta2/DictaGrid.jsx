import React from 'react';
import { Grid } from 'components/ui/grid/Grid';
import Dotdotdot from 'react-dotdotdot';
import { Button } from 'react-bootstrap';
import Fa from 'react-fontawesome';

export class DictaGrid extends React.Component {
    columns = [
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
                { row.translation_groups && row.translation_groups.map((group) => {
                    return group.translations.map((t) => t.spelling).join(', ')
                }).join(' | ') }
                { row.translations && row.translations.map((t) => t ? t.spelling : '').join(', ') }
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
                <Button bsStyle="link" className="pd-0" onClick={() => this.props.remove(row)}>
                  <Fa name="trash"/>
                </Button>
                <Button bsStyle="link" className="pd-0" onClick={() => this.props.edit(row)}>
                  <Fa name="edit"/>
                </Button>
              </div>
            )
          }
        }
      ];

    render() {
        return (
            <Grid columns={this.columns} rows={this.props.dicta} />
        );
    }
}