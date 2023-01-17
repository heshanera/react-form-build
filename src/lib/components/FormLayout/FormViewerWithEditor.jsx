import React from 'react';
import PropTypes from 'prop-types';
import { get, noop } from 'lodash-es';
import { getColumnWidthClass } from '../utils';
import { FORM_STATES } from '../../constants';
import FormField from './FormField';

const FormViewerWithEditor = (props) => {
  const { fieldTypes, popoverTarget, setPopoverTarget, layout, setLayout, formState, value, setValue } = props;

  return (
    <div className="container">
      <div>
        {Array.isArray(layout) &&
          layout.map((row, rowIndex) => (
            <div className="row form-row" key={get(row, '[0].id')} id={get(row, '[0].id')} data-rowindex={rowIndex}>
              {row.map((column, colIndex) => (
                <div className={`form-element ${getColumnWidthClass(column.width)}`} key={column.id}>
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
              ))}
            </div>
          ))}
      </div>
    </div>
  );
};

FormViewerWithEditor.propTypes = {
  fieldTypes: PropTypes.object.isRequired,
  layout: PropTypes.arrayOf(PropTypes.array).isRequired,
  setLayout: PropTypes.func.isRequired,
  formState: PropTypes.string,
  value: PropTypes.object,
  setValue: PropTypes.func,
  setPopoverTarget: PropTypes.func.isRequired,
  popoverTarget: PropTypes.object.isRequired,
};

FormViewerWithEditor.defaultProps = {
  formState: FORM_STATES.FORM_VIEW,
  value: {},
  setValue: noop,
};

export default FormViewerWithEditor;
