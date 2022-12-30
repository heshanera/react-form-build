import { useState } from 'react';
import { FormGenerator, FormStates } from '../lib';
import { CUSTOM_ELEMENTS_FORM, ONLY_CUSTOM_ELEMENTS_FORM, TEST_FORM } from './assets/forms';
import NumberInput from './assets/NumberInput';

export default {
  title: 'Components/Form Layout',
  component: FormGenerator,
  argTypes: { setLayout: { type: 'function', default: () => {} } },
};

const FromLayoutTemplate = (args) => {
  const { layout } = args;

  const [form, setFormLayout] = useState(layout || []);
  const [value, setValue] = useState({});

  return <FormGenerator {...args} value={value} setValue={setValue} layout={form} setLayout={setFormLayout} />;
};

export const EmptyLayout = FromLayoutTemplate.bind({});
EmptyLayout.args = {
  formState: FormStates.LAYOUT_EDIT,
  allowDefaults: true,
  customFieldTypes: [],
  layout: [],
};

export const EditableLayout = FromLayoutTemplate.bind({});
EditableLayout.args = {
  formState: FormStates.LAYOUT_EDIT,
  allowDefaults: true,
  customFieldTypes: [],
  layout: TEST_FORM,
};

export const CustomElements = FromLayoutTemplate.bind({});
CustomElements.args = {
  formState: FormStates.LAYOUT_EDIT,
  allowDefaults: true,
  customFieldTypes: [NumberInput],
  layout: CUSTOM_ELEMENTS_FORM,
};

export const OnlyCustomElements = FromLayoutTemplate.bind({});
OnlyCustomElements.args = {
  formState: FormStates.LAYOUT_EDIT,
  allowDefaults: false,
  customFieldTypes: [NumberInput],
  layout: ONLY_CUSTOM_ELEMENTS_FORM,
};
