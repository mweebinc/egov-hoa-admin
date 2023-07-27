import React from "react";
import classNames from "../../classNames";
import { SelectSearch, dialog } from "nq-component";
// import RelationDialog from "../RelationDialog2/index1";

import InputFactory from "../InputFactory";
import FormFactory from "../FormFactory";
import RelationDialog from "../RelationDialog";

function InputDialog({ schema, object, onChange, field, defaultValue }) {
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

  console.log("get?", schema);

  return (
    <div className="input-group">
      <input
      //   className={classNames("form-control", className)}
      //   onInput={onInput}
      //   {...props}
      />
      {/* <FormFactory schema={schema} /> */}
      {/* <SelectSearch /> */}

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
