# react-form-build
Dynamic form creation module implemented using react. Can generate forms and interact with the generated from with view and edit modes. Layout generator has build in field element types and allows adding custom elements.

## Modes

<div style={{ display: 'flex', justifyContent: 'space-between' }}>
  <img src="https://github.com/heshanera/assets/blob/master/react-form-build/layoutEditMode.png" alt="Layout Edit" width="33%">
  <img src="https://github.com/heshanera/assets/blob/master/react-form-build/editMode.png" alt="Form Edit" width="33%">
  <img src="https://github.com/heshanera/assets/blob/master/react-form-build/viewMode.png" alt="Form View" width="33%">
</div>

## Usage

```js
import { FormGenerator, FormStates } from 'react-form-build';
import 'react-form-build/dist/style.css';

const FormGenerator = () => {
  const [form, setFormLayout] = useState([]);
  const [value, setValue] = useState({});

  return (
    <div>
      <FormGenerator
        formState={FormStates.LAYOUT_EDIT}
        value={value}
        setValue={setValue}
        layout={form}
        setLayout={setFormLayout}
        allowDefaults
        customFieldTypes={[]}
      />
    </div>;
  )
}
```

<br/>

## Component Props

| Prop             | Type       | Description                                                                                                                                                                                             |
| :--------------- | :--------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| formState        | `string`   | State of the form component. This can be layout editable, form editable or form view. <br /> <code>LAYOUT_EDIT \| FORM_EDIT \| FORM_VIEW</code>                                                         |
| layout           | `array[]`  | Structure of the form. This is an array of arrays. Each array in the layout structure represent a row and the inner array has objects which has each column data. <code>[[{}, {}], [{}, {}, {}]]</code> |
| setLayout        | `func`     | Method to update the form structure when the form layout is updated. Takes the updated layout as the argument                                                                                           |
| allowDefaults    | `bool`     | To allow or to hide the inbuild field element types                                                                                                                                                     |
| customFieldTypes | `array`    | List of [custom elements](https://github.com/heshanera/react-form-generator/blob/master/src/stories/assets/NumberInput.jsx). These elements will be available in the layout generation once added       |
| value            | `object`   | Object with key value pairs which has the form data. <code>Key: Field Id</code> <code>Value: Value</code>                                                                                               |
| setValue         | `function` | Method to update the form field values. Takes the updated field values object as the argument                                                                                                           |

<br/>

## Custom Field Element

Custom field elements can be passed to the component to be available in the form generation.<br/>
Sample Element: [Number Input](https://github.com/heshanera/react-form-generator/blob/master/src/stories/assets/NumberInput.jsx)
| Prop | Type | Description |
| :---------- | :----------- | :----------- |
| type | `string` | Key to uniquely idenitify the element |
| displayName | `string` | Display name for the field |
| Control | `React Component` | Rendering logic for the field component |
| FieldPropertiesControl | `React Component` | Rendering logic for the field select view |
<br/>

## Running Locally with Storybook

```bash
~$ npm install
~$ npm run storybook
```
