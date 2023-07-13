import React from 'react';
import {Checkbox} from "nq-component";
import {Switch} from "nq-component";
import AddAccess from "../AddAccess";
import InputFactory from "../../../../components/InputFactory";


const permissionKeys = ['read', 'write'];

function FormAccess({currentUser, acl, onSubmit, onCancel}) {
    const [isAdd, setIsAdd] = React.useState(false);
    const [access, setAccess] = React.useState(acl);
    const keys = Array.from(new Set(['*', currentUser.id, ...acl.read, ...acl.write]));
    const [isAdvanced, setAdvanced] = React.useState(false);

    // when check change
    function permissionChange(id, key, checked) {
        setAccess(state => {
            let access = {...state};  // clone the previous state
            if (checked) {
                access[key].push(id); // add id to the array
            } else {
                access[key] = access[key].filter(el => el !== id);  // remove id from the array
            }
            return access;
        });
    }

    function onClickAdd() {
        setIsAdd(true);
    }

    function _onSubmit(e) {
        e.preventDefault();
        onSubmit(access);
    }

    // when advance json change
    function onChange(value) {
        setAccess({...value});
    }

    function onSubmitAddAccess(key) {
        access.read.push(key);
        access.write.push(key);
        setAccess({...access});
        setIsAdd(false);
    }

    if (isAdd) return <AddAccess onSubmit={onSubmitAddAccess} onBack={() => setIsAdd(false)}/>;
    return (
        <div className="p-2 pb-3">
            <h4 className="fw-bold">Access Control List</h4>
            <div className="bg-light p-2">
                <div className="d-flex justify-content-between">
                    <label>ACL</label>
                    <Switch onChange={setAdvanced} id="object-advance" label="Advanced"/>
                </div>
            </div>
            <form className="mt-3" onSubmit={_onSubmit}>
                <div className="row g-3">
                    {
                        isAdvanced && (
                            <div className="col-md-12">
                                <InputFactory
                                    type="Object"
                                    object={{access}}
                                    field="access"
                                    rows="10"
                                    onChange={onChange}
                                />
                            </div>
                        )
                    }
                    {
                        !isAdvanced && (
                            <div className="col-md-12">
                                <div className="table-responsive shadow-sm mb-3">
                                    <table className="table mb-0 w-100 table-striped">
                                        <thead className="table-dark">
                                        <tr>
                                            <th className="fs-xs align-middle">Name</th>
                                            {
                                                permissionKeys.map(key => {
                                                    return (
                                                        <th key={key}
                                                            className="fs-xs align-middle text-capitalize">{key}</th>
                                                    )
                                                })
                                            }
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            keys.map(id => {
                                                const label = currentUser.id === id ? '(me)' : '(other)';
                                                const name = `${id} ${label}`
                                                return (
                                                    <tr
                                                        key={id}>
                                                        <td className="fs-sm">{id === '*' ? 'Everyone' : name}</td>
                                                        {
                                                            permissionKeys.map(key => {
                                                                const check = access[key].includes(id);
                                                                return (
                                                                    <td key={id + key}>
                                                                        <Checkbox
                                                                            checked={check}
                                                                            onChange={permissionChange.bind(this, id, key)}/>
                                                                    </td>
                                                                )
                                                            })
                                                        }
                                                    </tr>
                                                )
                                            })
                                        }
                                        <tr>
                                            <td colSpan="3">
                                                <button
                                                    type="button"
                                                    onClick={onClickAdd}
                                                    className="btn btn-outline-primary btn-sm fs-sm">
                                                    <i className="bi bi-plus me-2"/>Add Others
                                                </button>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )
                    }
                    <div className="col-md-12 text-end">
                        <button
                            type="submit"
                            className="btn btn-primary btn-sm">
                            <i className="bi bi-file-earmark-check me-2"></i>SAVE
                        </button>
                        <button
                            type="button"
                            className="btn btn-outline-primary btn-sm ms-3"
                            onClick={onCancel}>CANCEL
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default FormAccess;
