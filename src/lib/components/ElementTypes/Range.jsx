import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash-es';
import { FORM_STATES } from '../../constants';

const FIELD_PROPERTIES = {
  LABEL: 'label',
  IS_MANDATORY: 'isMandatory',
  MIN: 'min',
  MAX: 'max',
  STEP: 'step',
};

const RangeControl = ({ fieldProperties, fieldValue, setFieldValue, formState }) => {
  const { label, isMandatory, min, max, step } = fieldProperties;

  const handleValueChange = (e) => {
    setFieldValue(e.target.value);
  };

  const labelDisplayValue = isEmpty(label) ? '' : label;
  const value = isEmpty(fieldValue) ? '' : fieldValue;

  return (
    <>
      <Form.Label>{`${labelDisplayValue} ${isMandatory ? '*' : ''}: ${value}`}</Form.Label>
      <Form.Range
        min={min}
        max={max}
        step={step}
        disabled={formState === FORM_STATES.FORM_VIEW}
        onChange={handleValueChange}
        value={value}
      />
    </>
  );
};

const RangeControlFieldPropertiesControl = ({ setProperties, fieldProperties }) => {
  const handleOptionChange = (type) => (e) => {
    const updatedProps = { ...fieldProperties };
    switch (type) {
      case FIELD_PROPERTIES.LABEL:
      case FIELD_PROPERTIES.MIN:
      case FIELD_PROPERTIES.MAX:
      case FIELD_PROPERTIES.STEP:
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
      <div className="row">
        <div className="col">
          <Form.Group>
            <Form.Control
              type="number"
              placeholder="Min"
              value={fieldProperties[FIELD_PROPERTIES.MIN] || ''}
              onChange={handleOptionChange(FIELD_PROPERTIES.MIN)}
            />
          </Form.Group>
        </div>
        <div className="col">
          <Form.Group>
            <Form.Control
              type="number"
              placeholder="Max"
              value={fieldProperties[FIELD_PROPERTIES.MAX] || ''}
              onChange={handleOptionChange(FIELD_PROPERTIES.MAX)}
            />
          </Form.Group>
        </div>
        <div className="col">
          <Form.Group>
            <Form.Control
              type="number"
              placeholder="Step"
              value={fieldProperties[FIELD_PROPERTIES.STEP] || ''}
              onChange={handleOptionChange(FIELD_PROPERTIES.STEP)}
            />
          </Form.Group>
        </div>
      </div>
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

const Range = {
  type: 'RANGE',
  displayName: 'Range',
  Control: RangeControl,
  FieldPropertiesControl: RangeControlFieldPropertiesControl,
  onChange: () => {},
};

RangeControl.propTypes = {
  fieldValue: PropTypes.string,
  setFieldValue: PropTypes.func.isRequired,
  fieldProperties: PropTypes.object.isRequired,
  formState: PropTypes.string.isRequired,
};

RangeControl.defaultProps = {
  fieldValue: '',
};

RangeControlFieldPropertiesControl.propTypes = {
  setProperties: PropTypes.func.isRequired,
  fieldProperties: PropTypes.object.isRequired,
};

export default Range;
