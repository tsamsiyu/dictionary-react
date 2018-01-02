import React from 'react';
import get from 'lodash/get';


export class Grid extends React.Component {
    columnValue(column, row) {
        if (column.value) {
            if (column.value instanceof Function) {
                return column.value(row);
            } else {
                return column.value;
            }
        } else {
            return get(row, column.key);
        }
    }

    render() {
        return (
            <table className="table table-bordered">
                <thead>
                    <tr>
                        { this.props.columns.map((column, index) => (
                            <th key={index}>{ column.hasOwnProperty('title') ? column.title : column.key }</th>
                        )) }
                    </tr>
                </thead>
                <tbody>
                    { this.props.rows && this.props.rows.map((row, rIndex) => (
                        <tr key={rIndex}>
                            { this.props.columns.map((column, cIndex) => (
                                <td key={cIndex}>{ this.columnValue(column, row) }</td>
                        )) }
                        </tr>
                    )) }
                </tbody>
            </table>
        );
    }
}