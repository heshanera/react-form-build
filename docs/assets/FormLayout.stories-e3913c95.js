var i=Object.defineProperty;var a=(t,n)=>i(t,"name",{value:n,configurable:!0});import{r as s}from"./index-3595f5fd.js";import{F as r,a as o,T as p,N as l,C as T,O as E}from"./NumberInput-5c488bd1.js";import{j as d}from"./jsx-runtime-6852a3d8.js";import"./es.object.get-own-property-descriptor-0acb476b.js";import"./index-a2f37619.js";import"./index-0379a24b.js";const U={title:"Components/Form Layout",component:r,argTypes:{setLayout:{description:"```func```",type:"function",default:()=>{}},formState:{description:"```LAYOUT_EDIT | FORM_EDIT | FORM_VIEW```",type:"string"}},parameters:{storySource:{source:`import { useState } from 'react';
import { FormGenerator, FormStates } from '../lib';
import { CUSTOM_ELEMENTS_FORM, ONLY_CUSTOM_ELEMENTS_FORM, TEST_FORM } from './assets/forms';
import NumberInput from './assets/NumberInput';

export default {
  title: 'Components/Form Layout',
  component: FormGenerator,
  argTypes: {
    setLayout: { description: '\`\`\`func\`\`\`', type: 'function', default: () => {} },
    formState: {
      description: '\`\`\`LAYOUT_EDIT | FORM_EDIT | FORM_VIEW\`\`\`',
      type: 'string',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'Editable form layout to create form elements',
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
`,locationsMap:{"empty-layout":{startLoc:{col:27,line:25},endLoc:{col:1,line:32},startBody:{col:27,line:25},endBody:{col:1,line:32}},"editable-layout":{startLoc:{col:27,line:25},endLoc:{col:1,line:32},startBody:{col:27,line:25},endBody:{col:1,line:32}},"custom-elements":{startLoc:{col:27,line:25},endLoc:{col:1,line:32},startBody:{col:27,line:25},endBody:{col:1,line:32}},"only-custom-elements":{startLoc:{col:27,line:25},endLoc:{col:1,line:32},startBody:{col:27,line:25},endBody:{col:1,line:32}}}},docs:{description:{component:"Editable form layout to create form elements"}}}},e=a(t=>{const{layout:n}=t,[m,u]=s.exports.useState(n||[]),[c,y]=s.exports.useState({});return d(r,{...t,value:c,setValue:y,layout:m,setLayout:u})},"FromLayoutTemplate"),L=e.bind({});L.args={formState:o.LAYOUT_EDIT,allowDefaults:!0,customFieldTypes:[],layout:[]};const F=e.bind({});F.args={formState:o.LAYOUT_EDIT,allowDefaults:!0,customFieldTypes:[],layout:p};const f=e.bind({});f.args={formState:o.LAYOUT_EDIT,allowDefaults:!0,customFieldTypes:[l],layout:T};const O=e.bind({});O.args={formState:o.LAYOUT_EDIT,allowDefaults:!1,customFieldTypes:[l],layout:E};const N=["EmptyLayout","EditableLayout","CustomElements","OnlyCustomElements"];export{f as CustomElements,F as EditableLayout,L as EmptyLayout,O as OnlyCustomElements,N as __namedExportsOrder,U as default};
//# sourceMappingURL=FormLayout.stories-e3913c95.js.map
