import { isEmpty } from 'lodash-es';
import { ELEMENT_ACTION_TYPE, FORM_STATES, MAX_COLUMN_WIDTH } from '../constants';

export const getColumnWidth = (width) => {
  const widthNum = Number(width);

  if (Number.isNaN(widthNum)) {
    return MAX_COLUMN_WIDTH;
  }

  return widthNum;
};

export const getColumnWidthClass = (width) => {
  const widthNum = getColumnWidth(width);
  return `col col-sm-12 col-sm-12 col-md-${widthNum} col-lg-${widthNum}`;
};

export const getTotalColumnWidth = (row) => {
  if (isEmpty(row)) {
    return 0;
  }

  let totalWidth = 0;
  row.forEach((column) => {
    totalWidth += getColumnWidth(column.width);
  });

  return totalWidth;
};

export const getAvailableColumnWidth = (row) => {
  const totalWidth = getTotalColumnWidth(row);
  return totalWidth < MAX_COLUMN_WIDTH ? getColumnWidthClass(MAX_COLUMN_WIDTH - totalWidth) : null;
};

export const getAvailableColumnWidthValue = (row) => {
  const totalWidth = getTotalColumnWidth(row);
  return totalWidth < MAX_COLUMN_WIDTH ? MAX_COLUMN_WIDTH - totalWidth : null;
};

export const isUpdateAction = (action) => action === ELEMENT_ACTION_TYPE.UPDATE;

export const isElementUpdate = (target) => {
  if (!target) {
    return false;
  }

  return isUpdateAction(target.getAttribute('data-action-type'));
};

export const getIsFormLayoutEdit = (state) => state === FORM_STATES.LAYOUT_EDIT;

export const showEditButtons = (target, rowIndex, colIndex) => {
  if (!target) {
    return false;
  }

  const targetRowIndex = target.getAttribute('data-position-row');
  const targetColIndex = target.getAttribute('data-position-col');

  return Number(rowIndex) === Number(targetRowIndex) && Number(colIndex) === Number(targetColIndex);
};

export const getEditSelectModeClasses = (formState, popoverTarget, rowIndex, colIndex) => {
  const editModeClasses = getIsFormLayoutEdit(formState) ? 'form-element-edit' : '';
  const selectModeClasses = showEditButtons(popoverTarget, rowIndex, colIndex) ? 'selected-element-border' : '';

  return `${editModeClasses} ${selectModeClasses}`;
};

export const mutateObjectProperties = (object, newData) => {
  if (isEmpty(newData)) {
    return object;
  }

  Object.keys(newData).forEach((key) => {
    // eslint-disable-next-line no-param-reassign
    object[key] = newData[key];
  });

  return object;
};

/* *****************************  Validations *********************************** */

export const getIsFieldValid = (field) => {
  const MANDATORY_FIELD_PROPS = ['type', 'displayName', 'Control'];

  let errorMessage = '';
  let isFieldValid = true;

  if (isEmpty(field)) {
    isFieldValid = false;
    errorMessage = 'Field cannot be an empty object';
  } else {
    const fieldKeys = Object.keys(field) || [];

    MANDATORY_FIELD_PROPS.forEach((mandatoryKey) => {
      if (!fieldKeys.includes(mandatoryKey)) {
        isFieldValid = false;
        errorMessage = `Field should have the mandatory property '${mandatoryKey}'`;
      }
    });
  }

  return { isFieldValid, errorMessage };
};

export const getIsFormLayoutValid = (layout) => {
  let errorMessage = '';
  let isLayoutValid = true;

  // handle invalid form layout
  if (!Array.isArray(layout)) {
    isLayoutValid = false;
    errorMessage = 'Form layout should be an array';
  } else {
    layout.forEach((formField) => {
      // handle invalid field data types and throw an error
      if (isEmpty(formField)) {
        isLayoutValid = false;
        errorMessage = 'Form field cannot be empty or null';
      }
    });
  }

  return { isLayoutValid, errorMessage };
};
