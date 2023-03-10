import { useState } from 'react';
import { FormGenerator, FormStates } from '../lib';
import { CUSTOM_ELEMENTS_FORM, TEST_FORM } from './assets/forms';
import NumberInput from './assets/NumberInput';

export default {
  title: 'Components/Edit Mode',
  component: FormGenerator,
  argTypes: {
    setLayout: { description: '```func```', type: 'function', default: () => {} },
    setValue: { description: '```func```', type: 'function', default: () => {} },
    formState: {
      description: '```LAYOUT_EDIT | FORM_EDIT | FORM_VIEW```',
      type: 'string',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'Editable form generated from the layout generator',
      },
    },
  },
};

const FromLayoutTemplate = (args) => {
  const { layout } = args;

  const [form, setFormLayout] = useState(layout || []);
  const [value, setValue] = useState({});

  return <FormGenerator {...args} value={value} setValue={setValue} layout={form} setLayout={setFormLayout} />;
};

export const DefaultElements = FromLayoutTemplate.bind({});
DefaultElements.args = {
  formState: FormStates.FORM_EDIT,
  customFieldTypes: [NumberInput],
  layout: TEST_FORM,
  value: {},
};

export const CustomElements = FromLayoutTemplate.bind({});
CustomElements.args = {
  formState: FormStates.FORM_EDIT,
  allowDefaults: true,
  customFieldTypes: [NumberInput],
  layout: CUSTOM_ELEMENTS_FORM,
  value: {},
};
