
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

const objToArray = (data, idKey, isReverse) => {
    if (!data) {
        return [];
    }

    const arr = [];
    Object.keys(data).map((key) => {
        arr.push({
            id: key,
            name: data[key][idKey],
            ...data[key],
        });
    });

    if (isReverse) {
        arr.reverse();
    }

    return arr;
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

const removeItemById = (items, idToRemove) => {
    return items.filter(item => item.id !== idToRemove);
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

const btnAction = (action, loading, moduleName) => {
    let btnAction = action === 'edit' ? 'Edit' : 'Add';
    let btnName = `${btnAction} ${capitalizeFirstWord(moduleName)}`
    if (loading) {
        btnAction = action === 'edit' ? 'Updating' : 'Adding';
        btnName = `${btnAction} ${capitalizeFirstWord(moduleName)}...`;
    }

    return btnName;
}

const embedMultipleElement = (source, data, target) => {
    source.map((src) => {
        const targetData = src[target];
        let elems = [];
        if (targetData.includes(',')) {
            const splitValues = targetData.split(',').map(value => value.trim());
            splitValues.map((idx) => elems.push(data[idx].slug))
        } else {
            elems = [data[targetData].slug];
        }
        src[`multiple_${target}`] = elems;
    });

    return source;
}

export {
    objReconstruct,
    removeItemById,
    confirmDialog,
    capitalizeFirstWord,
    populateSelectFromFormData,
    multSelectConstruct,
    objToArray,
    btnAction,
    embedMultipleElement,
};
