const inputsForm = [
    {
        id: 1,
        name: 'pname',
        type: 'text',
        label: 'Product Name',
        errorMsg: 'Product Name Required',
        required: true
    },
    {
        id: 2,
        name: 'category',
        type: 'select',
        label: 'Category',
        required: true,
        errorMsg: 'Category Required'
    },
    {
        id: 3,
        name: 'variation',
        type: 'text',
        label: 'Variation',
        required: true,
        errorMsg: 'Variation Required'
    },
    {
        id: 4,
        name: 'stock',
        type: 'number',
        label: 'Stock',
        required: true,
        errorMsg: 'Stock Required'
    },
    {
        id: 5,
        name: 'cost',
        type: 'number',
        label: 'Cost',
        required: true,
        errorMsg: 'Cost Required'
    },
    {
        id: 6,
        name: 'description',
        type: 'textarea',
        label: 'Description',
        required: false,
        errorMsg: ''
    }
];

export default inputsForm;
