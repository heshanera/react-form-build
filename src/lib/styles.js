const getReactSelectBorderColor = (state) => {
  if (state.isFocused) {
    return {
      borderColor: '#86b7fe',
      outline: 0,
      boxShadow: '0 0 0 0.25rem rgb(13 110 253 / 25%)',
    };
  }

  return {};
};

export const ReactSelectStyles = {
  control: (baseStyles, state) => ({
    ...baseStyles,
    borderRadius: 6,
    ...getReactSelectBorderColor(state),

    '&:hover': {
      ...getReactSelectBorderColor(state),
    },
  }),
  valueContainer: (baseStyles) => ({
    ...baseStyles,
  }),
  multiValue: (baseStyles) => ({
    ...baseStyles,
  }),
  placeholder: (baseStyles) => ({
    ...baseStyles,
    fontSize: '1rem',
  }),
};
