import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { isEmpty, isNil } from 'lodash-es';
import { FormStates as FORM_STATES } from '../../lib';

const FIELD_PROPERTIES = {
  LABEL: 'label',
  IS_MANDATORY: 'isMandatory',
};

const NumberInputControl = ({ fieldProperties, fieldValue, setFieldValue, formState }) => {
  const { label, isMandatory } = fieldProperties;

  const handleValueChange = (e) => {
    setFieldValue(e.target.value);
  };

  const labelDisplayValue = isEmpty(label) ? '' : label;

  return (
    <>
      <Form.Label>{`${labelDisplayValue} ${isMandatory ? '*' : ''}`}</Form.Label>
      <Form.Control
        disabled={formState === FORM_STATES.FORM_VIEW}
        value={isNil(fieldValue) ? '' : fieldValue}
        type="number"
        onChange={handleValueChange}
      />
    </>
  );
};

export const NumberInputFieldPropertiesControl = ({ setProperties, fieldProperties }) => {
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

const NumberInput = {
  type: 'NUMBER_INPUT',
  displayName: 'Number Input',
  Control: NumberInputControl,
  FieldPropertiesControl: NumberInputFieldPropertiesControl,
  onChange: () => {},
};

NumberInputControl.propTypes = {
  fieldValue: PropTypes.string,
  setFieldValue: PropTypes.func.isRequired,
  fieldProperties: PropTypes.object.isRequired,
  formState: PropTypes.string.isRequired,
};

NumberInputControl.defaultProps = {
  fieldValue: '',
};

NumberInputFieldPropertiesControl.propTypes = {
  setProperties: PropTypes.func.isRequired,
  fieldProperties: PropTypes.object.isRequired,
};

export default NumberInput;
