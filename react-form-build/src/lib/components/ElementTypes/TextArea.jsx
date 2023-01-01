import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { isEmpty, isNil } from 'lodash-es';
import { InputFieldPropertiesControl } from './Input';
import { FORM_STATES } from '../../constants';

const TextAreaControl = ({ fieldProperties, fieldValue, setFieldValue, formState }) => {
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
        disabled={formState === FORM_STATES.FORM_VIEW}
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
  formState: PropTypes.string.isRequired,
};

TextAreaControl.defaultProps = {
  fieldValue: '',
};

export default TextArea;
