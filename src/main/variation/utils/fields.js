import { INDEX_NAME } from "./application";

const formNameFields = {
    [INDEX_NAME]:"",
    description:"",
}

const formFieldOrder = [INDEX_NAME];

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
