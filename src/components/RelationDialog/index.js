import React, { useEffect, useState } from "react";
import { findObjectUseCase, saveObjectUseCase } from "../../usecases/object";
import { Table } from "nq-component";
import Search from "../Search";
import FormFactory from "../FormFactory";

const defaultProps = {
  where: {},
};

function RelationDialog({ schema, where, onCancel }) {
  const [showTable, setShowTable] = useState(true);
  const [objects, setObjects] = useState([]);
  const [progress, setProgress] = useState(false);
  const [query, setQuery] = useState({});
  const [selected, setSelected] = useState([]);

  React.useEffect(() => {
    const query = { where };

    async function fetch() {
      try {
        setProgress(true);
        const find = findObjectUseCase();
        const objects = await find.execute(schema.collection, query);
        setObjects(objects);
        setProgress(false);
      } catch (error) {
        setProgress(false);
        console.error(error);
      }
    }

    fetch();
  }, [schema, where]);

  async function onSubmitForm(e) {
    e.preventDefault();

    try {
      const save = saveObjectUseCase();
      await save.execute(schema.collection, query);
      setShowTable(true);
    } catch (error) {
      console.error("FAILED SEND", error);
    }
  }

  const handleChange = (value, field) => {
    setQuery((prevQuery) => ({
      ...prevQuery,
      [field]: value,
    }));
  };

  async function searchSubmit(where) {
    const query = { where };

    try {
      setProgress(true);
      const find = findObjectUseCase();
      const objects = await find.execute(schema.collection, query);
      setObjects(objects);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setProgress(false);
    }
  }

  function onAddForm() {
    setShowTable(!showTable);
  }

  function onSelect(index) {
    const selectedObjects = [...selected];
    const selectedObject = objects[index];
    const selectedIndex = selectedObjects.indexOf(selectedObject);

    if (selectedIndex > -1) {
      selectedObjects.splice(selectedIndex, 1);
    } else {
      selectedObjects.push(selectedObject);
    }

    setSelected(selectedObjects);
  }

  function onSelectAll(allChecked) {
    if (allChecked) {
      setSelected([...objects]);
    } else {
      setSelected([]);
    }
  }

  function cancel() {
    onCancel();
  }

  function onClickAdd() {
    console.log("button Select", selected);
    cancel();
  }

  console.log("Selected", selected);

  return (
    <div className="p-3 pb-4">
      <div className="text-end">
        {" "}
        <button
          onClick={onCancel}
          type="button"
          className="btn btn-sm btn-primary fs-sm "
        >
          <i class="bi bi-x-lg"></i>
        </button>
      </div>

      {showTable ? (
        <h4 className="fw-bold">Data List</h4>
      ) : (
        <h4 className="fw-bold">Add New Data</h4>
      )}
      <hr />
      {showTable ? (
        <Search
          fields={schema.fields}
          onSubmit={(where) => searchSubmit(where)}
        />
      ) : null}
      <div className="overflow-auto mt-3" style={{ maxHeight: "400px" }}>
        {showTable ? (
          <Table
            fields={schema.fields}
            hasSelect
            objects={objects}
            progress={progress}
            selected={selected}
            onSelect={(index) => onSelect(index)}
            onSelectAll={(allChecked) => onSelectAll(allChecked)}
            excludeFields={["id", "createdAt", "updatedAt", "acl"]}
          />
        ) : (
          <div className="mt-3  p-3  ">
            <form onSubmit={(e) => onSubmitForm(e)}>
              <div className="row g-3">
                <FormFactory
                  schema={schema}
                  onChange={(value, field) => handleChange(value, field)}
                />
              </div>

              <div className="mt-4 text-end">
                <button type="submit" className="btn btn-primary fs-sm me-3">
                  <i className="bi bi-file-earmark-check me-2"></i>SAVE &
                  ASSOCIATE
                </button>
                <button type="submit" className="btn btn-primary fs-sm">
                  SAVE
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
      {showTable ? (
        <div className="text-end mt-3">
          <button onClick={onClickAdd} className="btn btn-sm btn-primary fs-sm">
            ADD
          </button>
          <button
            onClick={onAddForm}
            type="button"
            className="btn btn-sm btn-primary fs-sm ms-2"
          >
            <i class="bi bi-plus me-2"></i>ADD NEW
          </button>
        </div>
      ) : null}
    </div>
  );
}
RelationDialog.defaultProps = defaultProps;
export default RelationDialog;
