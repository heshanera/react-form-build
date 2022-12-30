import React, { useRef, useState } from 'react';
import { get, isEmpty, noop } from 'lodash-es';
import PropTypes from 'prop-types';
import { FaArrowDown, FaArrowUp, FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import {
  getAvailableColumnWidth,
  getColumnWidthClass,
  getEditSelectModeClasses,
  getIsFormLayoutEdit,
  mutateObjectProperties,
  reorderFormLayout,
  showEditButtons,
} from '../utils';

import '../../../index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddUpdatePopover from './AddUpdatePopover';
import { ELEMENT_ACTION_TYPE, FORM_STATES } from '../../constants';

const FormLayout = (props) => {
  const { fieldTypes, layout, setLayout, formState, value, setValue } = props;

  const popoverRef = useRef(null);
  const [popoverTarget, setPopoverTarget] = useState(null);

  const handleShowPopupWithAdd = (actionType, rowIndex, colIndex) => (e) => {
    e.target.setAttribute('data-action-type', actionType);
    e.target.setAttribute('data-position-row', rowIndex);
    e.target.setAttribute('data-position-col', colIndex);
    setPopoverTarget(e.target);
  };

  const handleFieldDelete = (fieldId, rowIndex, colIndex) => () => {
    const updatedLayout = [];
    layout.forEach((row, OriginalRow) => {
      if (OriginalRow === rowIndex) {
        const updatedRow = [...row];
        updatedRow.splice(colIndex, 1);
        if (!isEmpty(updatedRow)) {
          updatedLayout.push(updatedRow);
        }
      } else {
        updatedLayout.push([...row]);
      }
    });

    setLayout(updatedLayout);
  };

  const handleFieldValueUpdate = (fieldId) => (fieldValue) => {
    if (typeof value === 'object') {
      const updatedValue = { ...value };
      updatedValue[fieldId] = fieldValue;
      setValue(updatedValue);
    }
  };

  const handleReorderLayout = (currentPos, newPos) => () => {
    if (currentPos + newPos >= 0) {
      const orderedLayout = reorderFormLayout(layout, currentPos, newPos);
      setLayout(orderedLayout);
    }
  };

  const renderField = (fieldData, rowIndex, colIndex) => {
    // handle invalid field data types and throw an error
    if (isEmpty(fieldData)) {
      throw new Error('Form field cannot be empty or null');
    }

    const { id, type, fieldProperties } = fieldData;

    // get control component from field types
    const Control = get(fieldTypes, [type, 'Control']);

    const buttonWrapperClass = `form-element-edit-buttons ${
      showEditButtons(popoverTarget, rowIndex, colIndex) ? 'always-show' : ''
    }`;

    return (
      <div>
        {getIsFormLayoutEdit(formState) && (
          <div className={buttonWrapperClass}>
            <button
              onClick={handleFieldDelete(id, rowIndex, colIndex)}
              className="elem-btn elem-delete-button"
              type="button"
            >
              <FaTrashAlt />
            </button>
            <button
              data-action-type="update"
              onClick={handleShowPopupWithAdd(ELEMENT_ACTION_TYPE.UPDATE, rowIndex, colIndex)}
              className="elem-btn elem-edit-button"
              type="button"
            >
              <FaPencilAlt />
            </button>
          </div>
        )}
        {Control && (
          <Control
            fieldProperties={fieldProperties}
            setProperties={(newData) => mutateObjectProperties(fieldProperties, newData)}
            fieldValue={get(value, id, null)}
            setFieldValue={handleFieldValueUpdate(id)}
            formState={formState}
          />
        )}
      </div>
    );
  };

  const renderAddElementPopupButton = (rowIndex, colIndex) => (
    <div style={{ width: '100%' }}>
      <button
        data-action-type="add"
        onClick={handleShowPopupWithAdd(ELEMENT_ACTION_TYPE.ADD, rowIndex, colIndex)}
        type="button"
        className="add-elem-popup-btn"
      >
        + Add
      </button>
    </div>
  );

  const renderLayoutEditMode = () => (
    <>
      {popoverTarget && (
        <AddUpdatePopover
          popoverRef={popoverRef}
          popoverTarget={popoverTarget}
          fieldTypes={fieldTypes}
          layout={layout}
          setLayout={setLayout}
          setPopoverTarget={setPopoverTarget}
        />
      )}
      <div className="container" ref={popoverRef}>
        <div>
          {Array.isArray(layout) &&
            layout.map((row, rowIndex) => {
              const emptySpace = getAvailableColumnWidth(row);
              return (
                <div
                  className="row form-row form-row-editable"
                  key={get(row, '[0].id')}
                  id={get(row, '[0].id')}
                  data-rowindex={rowIndex}
                >
                  {getIsFormLayoutEdit(formState) && (
                    <div className="">
                      <div className="row-position-button" aria-label="First group">
                        <button
                          onClick={handleReorderLayout(rowIndex, rowIndex - 1)}
                          className="position-btn left-button"
                          type="button"
                        >
                          <FaArrowUp />
                        </button>
                        <button
                          onClick={handleReorderLayout(rowIndex, rowIndex + 1)}
                          className="position-btn right-button"
                          type="button"
                        >
                          <FaArrowDown />
                        </button>
                      </div>
                    </div>
                  )}
                  {row.map((column, colIndex) => {
                    const editSelectModeClasses = getEditSelectModeClasses(
                      formState,
                      popoverTarget,
                      rowIndex,
                      colIndex,
                    );
                    return (
                      <div
                        className={`form-element ${editSelectModeClasses} ${getColumnWidthClass(column.width)}`}
                        key={column.id}
                      >
                        {renderField(column, rowIndex, colIndex)}
                      </div>
                    );
                  })}
                  {emptySpace && getIsFormLayoutEdit(formState) && (
                    <div className={`form-element add-elem-popup-btn-container ${emptySpace}`}>
                      {renderAddElementPopupButton(rowIndex, null)}
                    </div>
                  )}
                </div>
              );
            })}
        </div>
        {getIsFormLayoutEdit(formState) && (
          <div className="row form-row-editable">
            <div className="form-element">{renderAddElementPopupButton(null, null)}</div>
          </div>
        )}
      </div>
    </>
  );

  const renderFormViewAndEditMode = () => (
    <div className="container">
      <div>
        {Array.isArray(layout) &&
          layout.map((row, rowIndex) => (
            <div className="row form-row" key={get(row, '[0].id')} id={get(row, '[0].id')} data-rowindex={rowIndex}>
              {row.map((column, colIndex) => (
                <div className={`form-element ${getColumnWidthClass(column.width)}`} key={column.id}>
                  {renderField(column, rowIndex, colIndex)}
                </div>
              ))}
            </div>
          ))}
      </div>
    </div>
  );

  return getIsFormLayoutEdit(formState) ? renderLayoutEditMode() : renderFormViewAndEditMode();
};

FormLayout.propTypes = {
  fieldTypes: PropTypes.object.isRequired,
  layout: PropTypes.arrayOf(PropTypes.array).isRequired,
  setLayout: PropTypes.func.isRequired,
  formState: PropTypes.string,
  value: PropTypes.object,
  setValue: PropTypes.func,
};

FormLayout.defaultProps = {
  formState: FORM_STATES.FORM_VIEW,
  value: {},
  setValue: noop,
};

export default FormLayout;
