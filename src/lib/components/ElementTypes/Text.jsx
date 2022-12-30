import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash-es';

const FIELD_PROPERTIES = {
  TEXT_CONTENT: 'textContent',
};

const TextControl = ({ fieldProperties }) => {
  const { textContent } = fieldProperties;
  const content = isEmpty(textContent) ? '' : textContent;
  return <div>{content}</div>;
};

const TextFieldPropertiesControl = ({ setProperties, fieldProperties }) => {
  const handleOptionChange = (type) => (e) => {
    const updatedProps = { ...fieldProperties };
    switch (type) {
      case FIELD_PROPERTIES.TEXT_CONTENT:
        updatedProps[type] = e.target.value;
        break;
      default:
        break;
    }

    setProperties(updatedProps);
  };

  return (
    <Form.Group>
      <Form.Label>Content</Form.Label>
      <Form.Control
        as="textarea"
        placeholder="Content"
        value={fieldProperties[FIELD_PROPERTIES.TEXT_CONTENT] || ''}
        onChange={handleOptionChange(FIELD_PROPERTIES.TEXT_CONTENT)}
      />
    </Form.Group>
  );
};

const Text = {
  type: 'TEXT',
  displayName: 'Text',
  Control: TextControl,
  FieldPropertiesControl: TextFieldPropertiesControl,
  onChange: () => {},
};

TextControl.propTypes = {
  fieldProperties: PropTypes.object.isRequired,
};

TextFieldPropertiesControl.propTypes = {
  setProperties: PropTypes.func.isRequired,
  fieldProperties: PropTypes.object.isRequired,
};

export default Text;
