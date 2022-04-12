import React from 'react';
import PropTypes from 'prop-types';
import { Field } from './Form'

const InputField = ({ type, change, placeholder }) => {
  return (
    <Field type={type} onChange={change} placeholder={placeholder}></Field>
  );
}

InputField.propTypes = {
  type: PropTypes.string.isRequired,
  change: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
}

export default InputField;