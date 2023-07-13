import React from "react";
import {Table} from "nq-component";
import {findObjectUseCase} from "../../usecases/object";
import {exportCSVUseCase} from "../../usecases/csv/usecases";

const defaultProps = {
    where: {}
};

function DialogTable({schema, where, onCancel, title}) {
    const [objects, setObjects] = React.useState([]);
    const [progress, setProgress] = React.useState(false);
    React.useEffect(() => {
        const query = {where};

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

    async function onClickExport() {
        const exportCSV = exportCSVUseCase();
        exportCSV.execute(objects, schema.collection)
            .then(() => {
                onCancel();
            });
    }

    return (
        <div className="p-3 pb-4">
            <h4 className="fw-bold">{title}</h4>
            <div className="overflow-auto mt-3" style={{maxHeight: "400px"}}>
                <Table
                    fields={schema.fields}
                    progress={progress}
                    objects={objects}
                    excludeFields={
                        Object.keys(schema.fields)
                            .reduce((acc, key) => {
                                const options = schema.fields[key];
                                if (options.read === false) {
                                    acc.push(key);
                                }
                                switch (options._type || options.type) {
                                    case 'Relation':
                                    case 'Array':
                                    case 'Object':
                                    case 'File':
                                        acc.push(key);
                                        break;
                                    default:
                                }
                                return acc;
                            }, ['id', 'acl', 'password'])
                    }
                    className="mt-3"
                />
            </div>
            <div className="text-end mt-3">
                <button
                    onClick={onClickExport}
                    type="button"
                    className="btn btn-sm btn-primary fs-sm">
                    <i className="bi bi-file-spreadsheet me-2"></i>EXPORT EXCEL
                </button>
                <button
                    type="button"
                    className="btn btn-light btn-sm fs-sm ms-2"
                    onClick={onCancel}>CANCEL
                </button>
            </div>
        </div>
    )
}

DialogTable.defaultProps = defaultProps;
export default DialogTable;