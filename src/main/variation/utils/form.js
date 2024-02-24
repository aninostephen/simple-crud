import { INDEX_NAME } from "./application";

const inputsForm = [
    {
        id: 1,
        name: INDEX_NAME,
        type: 'text',
        label: 'Variation Name',
        required: true,
        errorMsg: 'Variation Name Required',
    },
    {
        id: 2,
        name: 'description',
        type: 'textarea',
        label: 'Description',
        required: false,
        errorMsg: '',
    }
];

export default inputsForm;
