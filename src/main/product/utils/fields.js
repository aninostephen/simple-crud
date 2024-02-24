const formNameFields = {
    pname:"",
    category: "",
    stock: "",
    description:"",
    cost: "",
    variation: "",
}

const formFieldOrder = ['pname', 'category', 'stock', 'cost']; //not include id and action column

const formFieldsValue = (data) => {
    Object.keys(formNameFields).forEach(field => {
        if (data.hasOwnProperty(field)) {
            formNameFields[field] = data[field];
        }
    });
    return formNameFields;
}

const formFieldValueClear = () => {
    Object.keys(formNameFields).forEach(field => {
        formNameFields[field] = '';
    });
    return formNameFields;
}

export {
    formFieldsValue,
    formNameFields,
    formFieldOrder,
    formFieldValueClear,
};