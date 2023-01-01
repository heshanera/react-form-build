import { useState } from 'react';
import { FormGenerator, FormStates } from '../lib';
import { CUSTOM_ELEMENTS_FORM, CUSTOM_ELEMENTS_FORM_VALUES, TEST_FORM, TEST_FORM_VALUES } from './assets/forms';
import NumberInput from './assets/NumberInput';

export default {
  title: 'Components/View Mode',
  component: FormGenerator,
  argTypes: {
    setLayout: { description: '```func```', type: 'function', default: () => {} },
    setValue: { description: '```func```', type: 'function', default: () => {} },
    formState: {
      description: '```LAYOUT_EDIT | FORM_EDIT | FORM_VIEW```',
      type: 'string',
    },
    value: { description: '```object```', type: 'object', default: {} },
  },
  parameters: {
    docs: {
      description: {
        component: 'Read only view of the generated form',
      },
    },
  },
};

const FromLayoutTemplate = (args) => {
  const { layout, value } = args;

  const [form, setFormLayout] = useState(layout || []);
  const [formValue, setFormValue] = useState(value || {});

  return <FormGenerator {...args} value={formValue} setValue={setFormValue} layout={form} setLayout={setFormLayout} />;
};

export const DefaultElements = FromLayoutTemplate.bind({});
DefaultElements.args = {
  formState: FormStates.FORM_VIEW,
  customFieldTypes: [NumberInput],
  layout: TEST_FORM,
  value: TEST_FORM_VALUES,
};

export const CustomElements = FromLayoutTemplate.bind({});
CustomElements.args = {
  formState: FormStates.FORM_VIEW,
  allowDefaults: true,
  customFieldTypes: [NumberInput],
  layout: CUSTOM_ELEMENTS_FORM,
  value: CUSTOM_ELEMENTS_FORM_VALUES,
};
