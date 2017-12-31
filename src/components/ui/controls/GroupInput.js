import React from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames';

export default observer(({field, hideErrors, noLabel}) => {
  return (
    <div className={classNames('form-group', {'has-error': field.error})}>
      { !noLabel && (<label htmlFor={field.id} className="control-label">{field.label}</label>) }
      <input {...field.bind()} className="form-control"/>
      {!hideErrors && field.error && (<p className="text-danger">{field.error}</p>)}
    </div>
  );
});