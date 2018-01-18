import React from 'react';
import classNames from 'classnames';

export default ({error, className, showErrors = true, children, noLabel, inputId, label}) => {
  return (
    <div className={classNames('form-group', {'has-error': error}, className)}>
      { label && (<label for={inputId}>{label}</label>) }
      {children}
      { showErrors && error && (<p className="text-danger">{error}</p>) }
    </div>
  );
};