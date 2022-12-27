import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { isEmpty, isNil } from 'lodash-es';

const FIELD_PROPERTIES = {
  LABEL: 'label',
  IS_MANDATORY: 'isMandatory',
};

const InputControl = ({ fieldProperties, fieldValue, setFieldValue }) => {
  const { label, isMandatory } = fieldProperties;

  const handleValueChange = (e) => {
    setFieldValue(e.target.value);
  };

  const labelDisplayValue = isEmpty(label) ? '' : label;

  return (
    <>
      <Form.Label>{`${labelDisplayValue} ${isMandatory ? '*' : ''}`}</Form.Label>
      <Form.Control value={isNil(fieldValue) ? '' : fieldValue} type="text" onChange={handleValueChange} />
    </>
  );
};

export const InputFieldPropertiesControl = ({ setProperties, fieldProperties }) => {
  const handleOptionChange = (type) => (e) => {
    const updatedProps = { ...fieldProperties };
    switch (type) {
      case FIELD_PROPERTIES.LABEL:
        updatedProps[type] = e.target.value;
        break;
      case FIELD_PROPERTIES.IS_MANDATORY:
        updatedProps[type] = !updatedProps[type];
        break;
      default:
        break;
    }

    setProperties(updatedProps);
  };

  return (
    <>
      <Form.Group>
        <Form.Label>Field Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Field Name"
          value={fieldProperties[FIELD_PROPERTIES.LABEL] || ''}
          onChange={handleOptionChange(FIELD_PROPERTIES.LABEL)}
        />
      </Form.Group>
      <br />
      <Form.Check
        type="checkbox"
        id="mandatory-checkbox"
        label="Mandatory"
        checked={fieldProperties[FIELD_PROPERTIES.IS_MANDATORY] || false}
        onChange={handleOptionChange(FIELD_PROPERTIES.IS_MANDATORY)}
      />
    </>
  );
};

const Input = {
  type: 'INPUT',
  displayName: 'Input',
  Control: InputControl,
  FieldPropertiesControl: InputFieldPropertiesControl,
  onChange: () => {},
};

InputControl.propTypes = {
  fieldValue: PropTypes.string,
  setFieldValue: PropTypes.func.isRequired,
  fieldProperties: PropTypes.object.isRequired,
};

InputControl.defaultProps = {
  fieldValue: '',
};

InputFieldPropertiesControl.propTypes = {
  setProperties: PropTypes.func.isRequired,
  fieldProperties: PropTypes.object.isRequired,
};

export default Input;
