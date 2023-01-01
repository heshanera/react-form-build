export const TEST_FORM = [
  [
    {
      id: '524672f8-8033-4ce4-a9be-b5ecb639d452',
      type: 'INPUT',
      width: '6',
      fieldProperties: {
        label: 'First Name',
        isMandatory: true,
      },
    },
    {
      id: 'dc8cf7ca-5339-40dd-a238-59140fd53fe8',
      type: 'INPUT',
      width: '6',
      fieldProperties: {
        label: 'Last Name',
        isMandatory: true,
      },
    },
  ],
  [
    {
      id: 'ccfab9fc-37bd-4776-a6c8-c238ea355a46',
      type: 'TEXT',
      width: '12',
      fieldProperties: {
        textContent:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      },
    },
  ],
  [
    {
      id: '8f0bc024-c202-47fd-8a6e-c1794d233df0',
      type: 'DIVIDER',
      width: '12',
      fieldProperties: {},
    },
  ],
  [
    {
      id: 'f4a0f631-19d3-4b60-b114-c82c539e7ddd',
      type: 'INPUT',
      width: '6',
      fieldProperties: {
        label: 'Test Field',
        isMandatory: false,
      },
    },
    {
      id: '5ada1eca-31bd-4521-8c7f-801f6ba86726',
      type: 'INPUT',
      width: 3,
      fieldProperties: {
        label: 'Test Field 2',
      },
    },
  ],
  [
    {
      id: 'aae3786f-214c-4bfc-bff7-db39356371f3',
      type: 'MULTILINE_INPUT',
      width: '6',
      fieldProperties: {
        label: 'Description',
      },
    },
    {
      id: 'ff10bcc6-8ec7-4c03-b48f-907e1fced444',
      type: 'SELECT',
      width: '6',
      fieldProperties: {
        label: 'Test',
        options: [
          {
            label: 'option1',
            value: 'd4641c7d-0c5c-4899-b38c-8c32eade107a',
          },
          {
            label: 'option2',
            value: '19cb096f-752c-4332-9cac-48f540c31e4e',
          },
          {
            label: 'option 3',
            value: 'fe0f22a5-336d-49ea-80fc-246636462b75',
          },
        ],
      },
    },
  ],
  [
    {
      id: '971c0caa-6bb0-4055-b302-0ff6d0777a3f',
      type: 'RANGE',
      width: '12',
      fieldProperties: {
        label: 'Level',
        min: '0',
        max: '5',
        step: '1',
      },
    },
  ],
];

export const TEST_FORM_VALUES = {
  '524672f8-8033-4ce4-a9be-b5ecb639d452': 'John',
  'dc8cf7ca-5339-40dd-a238-59140fd53fe8': 'Smith',
  '5ada1eca-31bd-4521-8c7f-801f6ba86726': 'Lorem ipsum',
  '971c0caa-6bb0-4055-b302-0ff6d0777a3f': '3',
  'aae3786f-214c-4bfc-bff7-db39356371f3':
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  'ff10bcc6-8ec7-4c03-b48f-907e1fced444': '19cb096f-752c-4332-9cac-48f540c31e4e',
  'f4a0f631-19d3-4b60-b114-c82c539e7ddd': 'Excepteur',
};

export const CUSTOM_ELEMENTS_FORM = [
  [
    {
      id: '524672f8-8033-4ce4-a9be-b5ecb639d452',
      type: 'INPUT',
      width: '6',
      fieldProperties: {
        label: 'First Name',
        isMandatory: true,
      },
    },
    {
      id: 'dc8cf7ca-5339-40dd-a238-59140fd53fe8',
      type: 'INPUT',
      width: '6',
      fieldProperties: {
        label: 'Last Name',
        isMandatory: true,
      },
    },
  ],
  [
    {
      id: 'ccfab9fc-37bd-4776-a6c8-c238ea355a46',
      type: 'TEXT',
      width: '12',
      fieldProperties: {
        textContent:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      },
    },
  ],
  [
    {
      id: '8f0bc024-c202-47fd-8a6e-c1794d233df0',
      type: 'DIVIDER',
      width: '12',
      fieldProperties: {},
    },
  ],
  [
    {
      id: 'f4a0f631-19d3-4b60-b114-c82c539e7ddd',
      type: 'NUMBER_INPUT',
      width: '6',
      fieldProperties: {
        label: 'Custom Element Field',
        isMandatory: true,
      },
    },
    {
      id: '5ada1eca-31bd-4521-8c7f-801f6ba86726',
      type: 'NUMBER_INPUT',
      width: 3,
      fieldProperties: {
        label: 'Test Field 2',
      },
    },
  ],
];

export const CUSTOM_ELEMENTS_FORM_VALUES = {
  '524672f8-8033-4ce4-a9be-b5ecb639d452': 'John',
  'dc8cf7ca-5339-40dd-a238-59140fd53fe8': 'Doe',
  'f4a0f631-19d3-4b60-b114-c82c539e7ddd': '120',
  '5ada1eca-31bd-4521-8c7f-801f6ba86726': '51.12',
};

export const ONLY_CUSTOM_ELEMENTS_FORM = [
  [
    {
      id: 'f4a0f631-19d3-4b60-b114-c82c539e7ddd',
      type: 'NUMBER_INPUT',
      width: '6',
      fieldProperties: {
        label: 'Custom Element Field',
        isMandatory: true,
      },
    },
    {
      id: '5ada1eca-31bd-4521-8c7f-801f6ba86726',
      type: 'NUMBER_INPUT',
      width: 3,
      fieldProperties: {
        label: 'Test Field 2',
      },
    },
  ],
];
