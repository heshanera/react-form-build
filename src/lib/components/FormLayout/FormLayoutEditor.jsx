import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { get, isEmpty, noop } from 'lodash-es';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';
import {
  getAvailableColumnWidth,
  getColumnWidthClass,
  getEditSelectModeClasses,
  getIsFormLayoutEdit,
  handleShowPopupWithAdd,
  reorderFormLayout,
} from '../utils';
import AddUpdatePopover from './AddUpdatePopover';
import { ELEMENT_ACTION_TYPE, FORM_STATES } from '../../constants';
import FormField from './FormField';

const FormLayoutEditor = (props) => {
  const { fieldTypes, popoverTarget, setPopoverTarget, layout, setLayout, formState, value, setValue } = props;

  const popoverRef = useRef(null);

  const handleReorderLayout = (currentPos, newPos) => () => {
    if (currentPos + newPos >= 0) {
      const orderedLayout = reorderFormLayout(layout, currentPos, newPos);
      setLayout(orderedLayout);
    }
  };

  const renderAddElementPopupButton = (rowIndex, colIndex) => (
    <div style={{ width: '100%' }}>
      <button
        data-action-type="add"
        onClick={handleShowPopupWithAdd(ELEMENT_ACTION_TYPE.ADD, rowIndex, colIndex, setPopoverTarget)}
        type="button"
        className="add-elem-popup-btn"
      >
        + Add
      </button>
    </div>
  );

  return (
    <>
      {popoverTarget && !isEmpty(fieldTypes) && (
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
                        <FormField
                          fieldData={column}
                          rowIndex={rowIndex}
                          colIndex={colIndex}
                          value={value}
                          setValue={setValue}
                          formState={formState}
                          layout={layout}
                          fieldTypes={fieldTypes}
                          setLayout={setLayout}
                          popoverTarget={popoverTarget}
                          setPopoverTarget={setPopoverTarget}
                        />
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
};

FormLayoutEditor.propTypes = {
  fieldTypes: PropTypes.object.isRequired,
  layout: PropTypes.arrayOf(PropTypes.array).isRequired,
  setLayout: PropTypes.func.isRequired,
  formState: PropTypes.string,
  value: PropTypes.object,
  setValue: PropTypes.func,
  setPopoverTarget: PropTypes.func.isRequired,
  popoverTarget: PropTypes.object.isRequired,
};

FormLayoutEditor.defaultProps = {
  formState: FORM_STATES.FORM_VIEW,
  value: {},
  setValue: noop,
};

export default FormLayoutEditor;
