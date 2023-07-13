import {InputString} from "nq-component";
import React from "react";

function DeleteCollection({schema, onSubmit, onCancel}) {
    const [collection, setCollection] = React.useState('');

    function _onSubmit(e) {
        e.preventDefault();
        if (collection.toLowerCase() === schema.collection.toLowerCase()) {
            onSubmit();
        }
    }

    return (
        <div className="p-3 pb-4">
            <h4 className="fw-bold">Delete Collection</h4>
            <form onSubmit={_onSubmit}>
                <div>
                    <label className="form-label">Collection name</label>
                    <InputString
                        placeholder="Enter Current Collection"
                        required
                        onChange={setCollection}/>
                </div>
                <div className="mt-3 text-end">
                    <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        onClick={onCancel}>CANCEL
                    </button>
                    <button
                        type="submit"
                        className="btn btn-outline-danger btn-sm ms-3">
                        <i className="bi bi-trash me-2"></i>YES, DELETE
                    </button>
                </div>
            </form>
        </div>
    );
}

export default DeleteCollection;
