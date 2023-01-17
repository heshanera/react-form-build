import React, { useState } from 'react';
import { noop } from 'lodash-es';
import PropTypes from 'prop-types';
import { getIsFormLayoutEdit } from '../utils';

import '../../../index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FORM_STATES } from '../../constants';
import FormLayoutEditor from './FormLayoutEditor';
import FormViewerWithEditor from './FormViewerWithEditor';

const FormLayout = (props) => {
  const { fieldTypes, layout, setLayout, formState, value, setValue } = props;

  const [popoverTarget, setPopoverTarget] = useState(null);

  return getIsFormLayoutEdit(formState) ? (
    <FormLayoutEditor
      fieldTypes={fieldTypes}
      popoverTarget={popoverTarget}
      setPopoverTarget={setPopoverTarget}
      layout={layout}
      setLayout={setLayout}
      formState={formState}
      value={value}
      setValue={setValue}
    />
  ) : (
    <FormViewerWithEditor
      fieldTypes={fieldTypes}
      popoverTarget={popoverTarget}
      setPopoverTarget={setPopoverTarget}
      layout={layout}
      setLayout={setLayout}
      formState={formState}
      value={value}
      setValue={setValue}
    />
  );
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
