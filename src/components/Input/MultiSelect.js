import React, { useEffect, useState } from "react";
import { MultiSelect } from "react-multi-select-component";

const MultipleSelect = (props) => {
    let options = [];
    const [selected, setSelected] = useState([]);

    useEffect(() => {
        setSelected(props.selectedmultiple);
    }, [props.selectedmultiple])

    const handleSelection = (selected) => {
        setSelected(selected);
        props.onChangeMultileSelect(selected, props.name);
    }

    props.values 
        && props.values.map((val) => {
            options.push({
                label: val.name,
                value: val.id
            })
        })

    return (
      <div>
        <MultiSelect
            name={props.name}
            options={options}
            value={selected}
            onChange={handleSelection}
            labelledBy="Select"
        />
      </div>
    );
  };
  
  export default React.memo(MultipleSelect);