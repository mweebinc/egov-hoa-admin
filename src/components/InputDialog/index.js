import React, { useEffect, useState } from "react";
import { SelectSearch, dialog } from "nq-component";
import RelationDialog from "../RelationDialog";
import getOption from "./getOption";
import getIndexes from "./getIndexes";
import objectToOption from "./objectToOption";

function InputDialog({
  schema,
  object,
  pick,
  target,
  onChange,
  isMulti,
  find,
  where,
  indexes,
  field,
  defaultValue,
  ...props
}) {
  const [value, setValue] = useState();
  const [options, setOptions] = useState([]);

  console.log("Selected", pick);

  function handlePlusIconClick() {
    dialog.fire({
      html: (
        <RelationDialog
          schema={schema}
          objects={object}
          onCancel={() => dialog.close()}
        />
      ),
      footer: false,
    });
  }

  const _indexes = React.useMemo(() => {
    const items = indexes || getIndexes(schema.fields);

    return items.length > 0 ? items : ["name"];
  }, [schema]);

  useEffect(() => {
    if (isMulti) {
      defaultValue &&
        setValue(defaultValue.map((obj) => objectToOption(obj, _indexes)));
    } else {
      defaultValue && setValue(objectToOption(defaultValue, _indexes));
    }
  }, [_indexes, defaultValue, isMulti]);

  useEffect(() => {
    setValue({ label: "", value: "" });
    getOption(target, "", _indexes, find, where, setOptions);
  }, [schema, find, _indexes, where]);

  function _onChange(option) {
    setValue(option);
    onChange(isMulti ? option.map((o) => o.object) : option.object);
  }

  function onSearch(word) {
    getOption(target, word, _indexes, find, where, setOptions);
  }

  return (
    <div className="input-group">
      <SelectSearch
        label={`Select ${target}`}
        value={value}
        onChange={_onChange}
        onSearch={onSearch}
        options={options}
        focus
        {...props}
      />
      <button
        className="input-group-text btn btn-primary"
        style={{ cursor: "pointer" }}
        onClick={handlePlusIconClick}
        type="button"
      >
        <i className="bi bi-plus-lg"></i>
      </button>
    </div>
  );
}

export default InputDialog;
