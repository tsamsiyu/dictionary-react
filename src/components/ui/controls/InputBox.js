import React from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames';

export default observer(({field, children, hideErrors}) => {
  return (
    <div className={classNames('form-group', {'has-error': field.error})}>
      {children}
      {!hideErrors && field.error && (<p className="text-danger">{field.error}</p>)}
    </div>
  );
});