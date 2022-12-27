import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { isEmpty, isNil } from 'lodash-es';
import { InputFieldPropertiesControl } from './Input';

const TextAreaControl = ({ fieldProperties, fieldValue, setFieldValue }) => {
  const { label, isMandatory } = fieldProperties;

  const handleValueChange = (e) => {
    setFieldValue(e.target.value);
  };

  const labelDisplayValue = isEmpty(label) ? '' : label;

  return (
    <>
      <Form.Label>{`${labelDisplayValue} ${isMandatory ? '*' : ''}`}</Form.Label>
      <Form.Control
        as="textarea"
        value={isNil(fieldValue) ? '' : fieldValue}
        type="text"
        onChange={handleValueChange}
      />
    </>
  );
};

const TextArea = {
  type: 'MULTILINE_INPUT',
  displayName: 'Multiline Input',
  Control: TextAreaControl,
  FieldPropertiesControl: InputFieldPropertiesControl,
  onChange: () => {},
};

TextAreaControl.propTypes = {
  fieldValue: PropTypes.string,
  setFieldValue: PropTypes.func.isRequired,
  fieldProperties: PropTypes.object.isRequired,
};

TextAreaControl.defaultProps = {
  fieldValue: '',
};

export default TextArea;
