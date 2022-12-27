import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { get, isEmpty, isNil } from 'lodash-es';
import { Button, CloseButton, Form, Overlay, Popover } from 'react-bootstrap';
import { FIELD_PROPERTIES, MAX_COLUMN_WIDTH } from '../../constants';
import { getTotalColumnWidth, isElementUpdate } from '../utils';

const AddUpdatePopover = (props) => {
  const { popoverRef, popoverTarget, fieldTypes, layout, setLayout, setPopoverTarget } = props;

  const [activeField, setActiveField] = useState(null);

  useEffect(() => {
    let activeFieldData = null;
    if (popoverTarget) {
      const rowIndex = popoverTarget.getAttribute('data-position-row');
      const colIndex = popoverTarget.getAttribute('data-position-col');

      if (isElementUpdate(popoverTarget)) {
        activeFieldData = { ...layout[rowIndex][colIndex] };
      } else {
        const firstField = Object.values(fieldTypes)[0];
        activeFieldData = {
          id: uuidv4(),
          type: firstField.type,
          width: 1,
          fieldProperties: {},
        };
      }
    }

    setActiveField(activeFieldData);
  }, [popoverTarget]);

  const handlePopoverHide = () => {
    setPopoverTarget(null);
  };

  const handleUpdateLayout = () => {
    const updatedLayout = [...layout];
    const rowIndex = popoverTarget.getAttribute('data-position-row');

    // updating existing field
    if (isElementUpdate(popoverTarget)) {
      const colIndex = popoverTarget.getAttribute('data-position-col');
      updatedLayout[rowIndex][colIndex] = activeField;
    } else if (isNil(rowIndex) || Number.isNaN(Number(rowIndex))) {
      // adding new field to the end of the form
      updatedLayout.push([activeField]);
    } else {
      // adding new field to the middle
      updatedLayout[rowIndex].push(activeField);
    }

    setLayout(updatedLayout);
    handlePopoverHide();
  };

  const handleActiveFieldDataChange = (type) => (e) => {
    const updatedActiveField = { ...activeField };

    switch (type) {
      case FIELD_PROPERTIES.WIDTH: {
        const rowIndex = popoverTarget.getAttribute('data-position-row');
        const colIndex = popoverTarget.getAttribute('data-position-col');
        // when updating width
        if (isElementUpdate(popoverTarget)) {
          const row = layout[rowIndex];
          const totalWidth = getTotalColumnWidth(row);
          const currentWidth = Number(get(layout, [rowIndex, colIndex, 'width']));
          // always allow when reducing existing width
          if (Number(e.target.value) <= currentWidth) {
            updatedActiveField[type] = e.target.value;
          } else if (Number(e.target.value) + totalWidth - currentWidth <= MAX_COLUMN_WIDTH) {
            // increasing existing field width
            updatedActiveField[type] = e.target.value;
          }
        } else if (!isNil(rowIndex) && Number(rowIndex) >= 0) {
          // check the available width when selecting the element width
          const row = layout[rowIndex];
          const totalWidth = getTotalColumnWidth(row);

          if (Number(e.target.value) + Number(totalWidth) <= MAX_COLUMN_WIDTH) {
            updatedActiveField[type] = e.target.value;
          }
        } else {
          // when adding to a anew line allow full width
          updatedActiveField[type] = e.target.value;
        }
        break;
      }
      case FIELD_PROPERTIES.TYPE:
        updatedActiveField[type] = e.target.value;
        break;
      default:
        break;
    }

    setActiveField(updatedActiveField);
  };

  const handleFieldProperties = (fieldProperties) => {
    const updatedActiveField = { ...activeField, fieldProperties };
    setActiveField(updatedActiveField);
  };

  const renderFieldPropertiesControl = () => {
    const { FieldPropertiesControl } = fieldTypes[activeField.type];

    if (isEmpty(FieldPropertiesControl)) {
      return null;
    }

    return (
      <FieldPropertiesControl fieldProperties={activeField.fieldProperties} setProperties={handleFieldProperties} />
    );
  };

  return (
    <Overlay
      rootClose
      onHide={handlePopoverHide}
      placement="bottom"
      show={!!popoverTarget}
      target={popoverTarget}
      container={popoverRef}
    >
      <Popover id="element-add-update-popover" className="add-element-popup">
        <Popover.Header as="h3">
          <div className="add-element-popup-header">
            {isElementUpdate(popoverTarget) ? 'Update Field' : 'Add New Field'}
            <CloseButton onClick={handlePopoverHide} />
          </div>
        </Popover.Header>
        <Popover.Body>
          {activeField && (
            <div>
              <div>
                <Form.Label>Field Width: {activeField[FIELD_PROPERTIES.WIDTH]}</Form.Label>
                <Form.Range
                  onChange={handleActiveFieldDataChange(FIELD_PROPERTIES.WIDTH)}
                  min="1"
                  value={activeField[FIELD_PROPERTIES.WIDTH]}
                  max="12"
                  step="1"
                />
              </div>
              <hr />
              <div>
                <Form.Group>
                  <Form.Label>Type</Form.Label>
                  <Form.Select
                    value={activeField[FIELD_PROPERTIES.TYPE]}
                    onChange={handleActiveFieldDataChange(FIELD_PROPERTIES.TYPE)}
                    aria-label=""
                  >
                    {Object.values(fieldTypes).map((fieldType) => (
                      <option key={fieldType.type} value={fieldType.type}>
                        {fieldType.displayName}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <br />
                {renderFieldPropertiesControl()}
              </div>
              <hr />
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button onClick={handleUpdateLayout} variant="outline-dark" className="add-elem-to-form-btn">
                  {isElementUpdate(popoverTarget) ? 'Update' : 'Add'}
                </Button>
              </div>
            </div>
          )}
        </Popover.Body>
      </Popover>
    </Overlay>
  );
};

AddUpdatePopover.propTypes = {
  popoverRef: PropTypes.object,
  popoverTarget: PropTypes.object,
  fieldTypes: PropTypes.object.isRequired,
  layout: PropTypes.array.isRequired,
  setLayout: PropTypes.func.isRequired,
  setPopoverTarget: PropTypes.func.isRequired,
};

AddUpdatePopover.defaultProps = {
  popoverRef: null,
  popoverTarget: null,
};

export default AddUpdatePopover;
