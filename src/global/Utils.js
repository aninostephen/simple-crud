
import swal from "sweetalert";

const objReconstruct = (data, newKey) => {
    if (!data) {
        return [];
    }
    return Object.keys(data).map((key) => ({
        id: key,
        name: data[key][newKey],
        ...data[key],
    }));
}

const multSelectConstruct = (data, val, value) => {
    if (!data || !val) {
        return [];
    }

    const options = [];
    const idsArray = val.split(', ');
    idsArray 
        && idsArray.map((val) => {
            if (data[val]) {
                options.push({
                    label: data[val][value],
                    value: val
                });
            }
        })

    return options;
}

const removeItemById = (item, idToRemove) => {
    const updatedItems = {};
    for (const itemId in item) {
        if (itemId !== idToRemove) {
            updatedItems[itemId] = item[itemId];
        }
    }
    return updatedItems;
};

const confirmDialog = async (title, text) => {
    const result = await swal({
      title: title,
      text: text,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    });

    return result;
};

function capitalizeFirstWord(sentence) {
    const words = sentence.split(" ");
    words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
    return words.join(" ");
}

const populateSelectFromFormData = (data = [], targetField, newKey, newValue) => {

    if (data.length === 0) {
        return []
    }

    data.map((input, index) => {
        targetField.map((field, idx) => {
            if (input.name === field) {
                data[index][newKey] = newValue[idx];
            }
        })
    });
    return data;
}

export {
    objReconstruct,
    removeItemById,
    confirmDialog,
    capitalizeFirstWord,
    populateSelectFromFormData,
    multSelectConstruct,
};
