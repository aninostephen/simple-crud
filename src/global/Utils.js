
import swal from "sweetalert";

const objReconstruct = data => {
    if (!data) {
        return [];
    }
    return Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
    }));
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

const populateSelectFromFormData = (data, targetField, newKey, newValue) => {
    data.map((input, index) => {
        if (input.name === targetField) {
            data[index][newKey] = newValue;
        }
    });

    return data;
}

export {
    objReconstruct,
    removeItemById,
    confirmDialog,
    capitalizeFirstWord,
    populateSelectFromFormData,
};
