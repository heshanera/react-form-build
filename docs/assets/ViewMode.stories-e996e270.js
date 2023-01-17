var E=Object.defineProperty;var o=(e,t)=>E(e,"name",{value:t,configurable:!0});import{r as n}from"./index-3595f5fd.js";import{F as a,a as s,N as r,T as f,b as d,C as F,c as T}from"./NumberInput-5c488bd1.js";import{j as y}from"./jsx-runtime-6852a3d8.js";import"./es.object.get-own-property-descriptor-0acb476b.js";import"./index-a2f37619.js";import"./index-0379a24b.js";const U={title:"Components/View Mode",component:a,argTypes:{setLayout:{description:"```func```",type:"function",default:()=>{}},setValue:{description:"```func```",type:"function",default:()=>{}},formState:{description:"```LAYOUT_EDIT | FORM_EDIT | FORM_VIEW```",type:"string"},value:{description:"```object```",type:"object",default:{}}},parameters:{storySource:{source:`import { useState } from 'react';
import { FormGenerator, FormStates } from '../lib';
import { CUSTOM_ELEMENTS_FORM, CUSTOM_ELEMENTS_FORM_VALUES, TEST_FORM, TEST_FORM_VALUES } from './assets/forms';
import NumberInput from './assets/NumberInput';

export default {
  title: 'Components/View Mode',
  component: FormGenerator,
  argTypes: {
    setLayout: { description: '\`\`\`func\`\`\`', type: 'function', default: () => {} },
    setValue: { description: '\`\`\`func\`\`\`', type: 'function', default: () => {} },
    formState: {
      description: '\`\`\`LAYOUT_EDIT | FORM_EDIT | FORM_VIEW\`\`\`',
      type: 'string',
    },
    value: { description: '\`\`\`object\`\`\`', type: 'object', default: {} },
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
`,locationsMap:{"default-elements":{startLoc:{col:27,line:27},endLoc:{col:1,line:34},startBody:{col:27,line:27},endBody:{col:1,line:34}},"custom-elements":{startLoc:{col:27,line:27},endLoc:{col:1,line:34},startBody:{col:27,line:27},endBody:{col:1,line:34}}}},docs:{description:{component:"Read only view of the generated form"}}}},u=o(e=>{const{layout:t,value:l}=e,[m,c]=n.exports.useState(t||[]),[i,p]=n.exports.useState(l||{});return y(a,{...e,value:i,setValue:p,layout:m,setLayout:c})},"FromLayoutTemplate"),S=u.bind({});S.args={formState:s.FORM_VIEW,customFieldTypes:[r],layout:f,value:d};const _=u.bind({});_.args={formState:s.FORM_VIEW,allowDefaults:!0,customFieldTypes:[r],layout:F,value:T};const v=["DefaultElements","CustomElements"];export{_ as CustomElements,S as DefaultElements,v as __namedExportsOrder,U as default};
//# sourceMappingURL=ViewMode.stories-e996e270.js.map
