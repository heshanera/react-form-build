import React from 'react';
import PropTypes from 'prop-types';
import { get, isEmpty, noop } from 'lodash-es';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import { ELEMENT_ACTION_TYPE, FORM_STATES } from '../../constants';
import { getIsFormLayoutEdit, handleShowPopupWithAdd, mutateObjectProperties, showEditButtons } from '../utils';

const FormField = (props) => {
  const {
    fieldData,
    rowIndex,
    colIndex,
    value,
    setValue,
    formState,
    layout,
    fieldTypes,
    setLayout,
    popoverTarget,
    setPopoverTarget,
  } = props;

  // handle invalid field data types and throw an error
  if (isEmpty(fieldData)) {
    throw new Error('Form field cannot be empty or null');
  }

  const { id, type, fieldProperties } = fieldData;

  // get control component from field types
  const Control = get(fieldTypes, [type, 'Control']);

  const handleFieldValueUpdate = (fieldId) => (fieldValue) => {
    if (typeof value === 'object') {
      const updatedValue = { ...value };
      updatedValue[fieldId] = fieldValue;
      setValue(updatedValue);
    }
  };

  const handleFieldDelete = () => () => {
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
            onClick={handleShowPopupWithAdd(ELEMENT_ACTION_TYPE.UPDATE, rowIndex, colIndex, setPopoverTarget)}
            className="elem-btn elem-edit-button"
            type="button"
          >
            <FaPencilAlt />
          </button>
        </div>
      )}
      {Control ? (
        <Control
          fieldProperties={fieldProperties}
          setProperties={(newData) => mutateObjectProperties(fieldProperties, newData)}
          fieldValue={get(value, id, null)}
          setFieldValue={handleFieldValueUpdate(id)}
          formState={formState}
        />
      ) : (
        <div className="error-elem">Error!</div>
      )}
    </div>
  );
};

FormField.propTypes = {
  fieldData: PropTypes.object.isRequired,
  fieldTypes: PropTypes.object.isRequired,
  layout: PropTypes.arrayOf(PropTypes.array).isRequired,
  setLayout: PropTypes.func.isRequired,
  formState: PropTypes.string,
  value: PropTypes.object,
  setValue: PropTypes.func,
  rowIndex: PropTypes.number.isRequired,
  colIndex: PropTypes.number.isRequired,
  setPopoverTarget: PropTypes.func.isRequired,
  popoverTarget: PropTypes.object.isRequired,
};

FormField.defaultProps = {
  formState: FORM_STATES.FORM_VIEW,
  value: {},
  setValue: noop,
};

export default FormField;
