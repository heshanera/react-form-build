// TODO: update the implementation
// TODO: integrate lint
// TODO: get the mandatory fields for layout and field types
// TODO: normalize styles
// TODO: handle drag and drop
// TODO: view mode
// TODO: edit mode
// Test Page
import React, { useState } from 'react';
import { FormGenerator, FormStates } from '../../../lib';

const layout = [
  [
    {
      id: '1',
      type: 'INPUT',
      width: 6,
      fieldProperties: {
        label: 'First Name',
      },
    },
    {
      id: '2',
      type: 'INPUT',
      width: 6,
      fieldProperties: {
        label: 'Last Name',
      },
    },
  ],
  [
    {
      id: '3',
      type: 'INPUT',
      width: 3,
      fieldProperties: {
        label: 'First Name',
      },
    },
    {
      id: '4',
      type: 'INPUT',
      width: 3,
      fieldProperties: {
        label: 'Last Name',
      },
    },
    {
      id: '8',
      type: 'INPUT',
      width: 3,
      fieldProperties: {
        label: 'Last Name',
      },
    },
    {
      id: '9',
      type: 'INPUT',
      width: 3,
      fieldProperties: {
        label: 'Last Name',
      },
    },
  ],
  [
    {
      id: '5',
      type: 'INPUT',
      width: 4,
      fieldProperties: {
        label: 'First Name',
      },
    },
    {
      id: '6',
      type: 'INPUT',
      width: 4,
      fieldProperties: {
        label: 'Last Name',
      },
    },
    {
      id: '10',
      type: 'INPUT',
      width: 4,
      fieldProperties: {
        label: 'Last Name',
      },
    },
  ],
  [
    {
      id: '7',
      type: 'INPUT',
      width: 12,
      fieldProperties: {
        label: 'Test',
      },
    },
  ],
];

const TestPage = () => {
  const [form, setFormLayout] = useState(layout);
  const [value, setValue] = useState({});

  const renderTestPageView = () => (
    <FormGenerator
      formState={FormStates.LAYOUT_EDIT}
      value={value}
      setValue={setValue}
      layout={form}
      setLayout={setFormLayout}
      allowDefaults
      customFieldTypes={[]}
    />
  );

  return <div style={{ paddingTop: 40 }}>{renderTestPageView()}</div>;
};

export default TestPage;
