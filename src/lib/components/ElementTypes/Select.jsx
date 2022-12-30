import { Form } from 'react-bootstrap';
import CreatableSelect from 'react-select/creatable';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { isEmpty } from 'lodash-es';
import { useState } from 'react';
import { FORM_STATES } from '../../constants';

const FIELD_PROPERTIES = {
  LABEL: 'label',
  IS_MANDATORY: 'isMandatory',
  OPTIONS: 'options',
};

const SelectControl = ({ fieldProperties, fieldValue, setFieldValue, formState }) => {
  const { label, isMandatory, options } = fieldProperties;

  const handleValueChange = (e) => {
    setFieldValue(e.target.value);
  };

  const labelDisplayValue = isEmpty(label) ? '' : label;
  const value = isEmpty(fieldValue) ? '' : fieldValue;

  return (
    <>
      <Form.Label>{`${labelDisplayValue} ${isMandatory ? '*' : ''}`}</Form.Label>
      <Form.Select
        disabled={formState === FORM_STATES.FORM_VIEW}
        value={value}
        onChange={handleValueChange}
        aria-label=""
      >
        {Object.values(options || []).map((optionValue) => (
          <option key={optionValue.value} value={optionValue.value}>
            {optionValue.label}
          </option>
        ))}
      </Form.Select>
    </>
  );
};

const components = {
  DropdownIndicator: null,
};

const createOption = (label) => ({
  label,
  value: uuidv4(),
});

const WithCreatableSelect = (props) => {
  const { value, setValue } = props;

  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (event) => {
    if (!inputValue) return;
    switch (event.key) {
      case 'Enter':
      case 'Tab': {
        setValue([...value, createOption(inputValue)]);
        setInputValue('');
        event.preventDefault();
        break;
      }
      default:
        break;
    }
  };

  return (
    <CreatableSelect
      components={components}
      inputValue={inputValue}
      isClearable
      isMulti
      menuIsOpen={false}
      onChange={(newValue) => setValue(newValue)}
      onInputChange={(newValue) => setInputValue(newValue)}
      onKeyDown={handleKeyDown}
      placeholder="Type option and press enter"
      value={value}
    />
  );
};

const SelectControlFieldPropertiesControl = ({ setProperties, fieldProperties }) => {
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

  const handleOptionCreate = (value) => {
    const updatedProps = { ...fieldProperties };
    updatedProps[FIELD_PROPERTIES.OPTIONS] = value;
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
      <Form.Group>
        <Form.Label>Options</Form.Label>
        <WithCreatableSelect value={fieldProperties[FIELD_PROPERTIES.OPTIONS] || []} setValue={handleOptionCreate} />
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
  type: 'SELECT',
  displayName: 'Select',
  Control: SelectControl,
  FieldPropertiesControl: SelectControlFieldPropertiesControl,
  onChange: () => {},
};

SelectControl.propTypes = {
  fieldValue: PropTypes.string,
  setFieldValue: PropTypes.func.isRequired,
  fieldProperties: PropTypes.object.isRequired,
  formState: PropTypes.string.isRequired,
};

SelectControl.defaultProps = {
  fieldValue: '',
};

WithCreatableSelect.propTypes = {
  value: PropTypes.array.isRequired,
  setValue: PropTypes.func.isRequired,
};

SelectControlFieldPropertiesControl.propTypes = {
  setProperties: PropTypes.func.isRequired,
  fieldProperties: PropTypes.object.isRequired,
};

export default Input;
