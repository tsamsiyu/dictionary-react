import React from 'react';
import classnames from 'classnames';

export default ({className, children, controlId, label, labelClass, errors, showErrors = true,}) => {
  const invalid = Array.isArray(errors) && errors.length;
  return (
    <div className={classnames('form-group', {'has-error': invalid}, className)}>
      { label && (<label for={controlId} className={classnames('control-label', labelClass)}>{label}</label>) }
      {children}
      { showErrors && invalid && (
        <div className="invalid-messages">
          {errors.map((msg, index) => (
            <p className="text-danger" key={index}>{msg}</p>
          ))}
        </div>
      ) }
    </div>
  );
};