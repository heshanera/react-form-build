var p=Object.defineProperty;var o=(t,e)=>p(t,"name",{value:e,configurable:!0});import{r as n}from"./index-3595f5fd.js";import{F as r,a as s,N as a,T as d,C as f}from"./NumberInput-5c488bd1.js";import{j as y}from"./jsx-runtime-6852a3d8.js";import"./es.object.get-own-property-descriptor-0acb476b.js";import"./index-a2f37619.js";import"./index-0379a24b.js";const R={title:"Components/Edit Mode",component:r,argTypes:{setLayout:{description:"```func```",type:"function",default:()=>{}},setValue:{description:"```func```",type:"function",default:()=>{}},formState:{description:"```LAYOUT_EDIT | FORM_EDIT | FORM_VIEW```",type:"string"}},parameters:{storySource:{source:`import { useState } from 'react';
import { FormGenerator, FormStates } from '../lib';
import { CUSTOM_ELEMENTS_FORM, TEST_FORM } from './assets/forms';
import NumberInput from './assets/NumberInput';

export default {
  title: 'Components/Edit Mode',
  component: FormGenerator,
  argTypes: {
    setLayout: { description: '\`\`\`func\`\`\`', type: 'function', default: () => {} },
    setValue: { description: '\`\`\`func\`\`\`', type: 'function', default: () => {} },
    formState: {
      description: '\`\`\`LAYOUT_EDIT | FORM_EDIT | FORM_VIEW\`\`\`',
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
`,locationsMap:{"default-elements":{startLoc:{col:27,line:26},endLoc:{col:1,line:33},startBody:{col:27,line:26},endBody:{col:1,line:33}},"custom-elements":{startLoc:{col:27,line:26},endLoc:{col:1,line:33},startBody:{col:27,line:26},endBody:{col:1,line:33}}}},docs:{description:{component:"Editable form generated from the layout generator"}}}},u=o(t=>{const{layout:e}=t,[l,m]=n.exports.useState(e||[]),[c,i]=n.exports.useState({});return y(r,{...t,value:c,setValue:i,layout:l,setLayout:m})},"FromLayoutTemplate"),E=u.bind({});E.args={formState:s.FORM_EDIT,customFieldTypes:[a],layout:d,value:{}};const T=u.bind({});T.args={formState:s.FORM_EDIT,allowDefaults:!0,customFieldTypes:[a],layout:f,value:{}};const g=["DefaultElements","CustomElements"];export{T as CustomElements,E as DefaultElements,g as __namedExportsOrder,R as default};
//# sourceMappingURL=EditMode.stories-9c3a3a07.js.map
