import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash-es';
import DefaultElementTypes from '../ElementTypes';
import FormLayout from '../FormLayout';
import { getIsFieldValid, getIsFormLayoutValid } from '../utils';

const FormGenerator = (props) => {
  const { customFieldTypes, allowDefaults, layout, ...rest } = props;
  const [fieldTypes, setFieldTypes] = useState({});

  useEffect(() => {
    const customTypes = {};
    if (!isEmpty(customFieldTypes)) {
      customFieldTypes.forEach((field) => {
        // validate field type mandatory keys and throw errors
        const { isFieldValid, errorMessage } = getIsFieldValid(field);

        if (!isFieldValid) {
          throw new Error(errorMessage);
        }

        if (field.type) {
          customTypes[field.type] = field;
        }
      });
    }

    if (allowDefaults) {
      setFieldTypes({
        ...customTypes,
        ...DefaultElementTypes,
      });
    } else {
      setFieldTypes(customTypes);
    }
  }, []);

  useEffect(() => {
    const { isLayoutValid, errorMessage } = getIsFormLayoutValid(layout);

    if (!isLayoutValid) {
      throw new Error(errorMessage);
    }
  }, [layout]);

  return <FormLayout fieldTypes={fieldTypes} layout={layout} {...rest} />;
};

FormGenerator.propTypes = {
  allowDefaults: PropTypes.bool,
  customFieldTypes: PropTypes.array,
  layout: PropTypes.arrayOf(PropTypes.array).isRequired,
};

FormGenerator.defaultProps = {
  allowDefaults: true,
  customFieldTypes: [],
};

export default FormGenerator;
