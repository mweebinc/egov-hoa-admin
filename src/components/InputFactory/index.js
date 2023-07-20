import React from 'react';
import {
    InputRelation,
    InputString,
    InputPassword,
    InputNumber,
    InputText,
    Checkbox,
    InputJson,
    InputImage,
    InputFile,
    InputSignature,
    InputPointer,
    InputSelect,
} from "nq-component";
import {findObjectUseCase} from "../../usecases/object";
import {saveFileUseCase, saveImageUseCase} from "../../usecases/file";
import Context from "../../AppContext";
import InputIcon from "../InputIcon";

const findObject = findObjectUseCase();
const saveImage = saveImageUseCase();
const saveFile = saveFileUseCase();
const defaultProps = {}

function InputFactory({type, _type, field, object, schemas, hidden, required, onChange, ...props}) {
    const context = React.useContext(Context);
    const value = object && object[field];

    function _onChange(field, value) {
        if (object) {
            object[field] = value;
        }
        onChange(value, field);
    }

    switch (_type || type) {
        case 'Email':
        case 'String':
            return <InputString
                defaultValue={value}
                onChange={_onChange.bind(this, field)}
                type={type.toLowerCase()}
                required={required}
                {...props}/>;
        case 'Date':
            return <InputString
                defaultValue={value && value.slice(0, 10)}
                onChange={_onChange.bind(this, field)}
                type={type.toLowerCase()}
                required={required}
                {...props}/>;
        case 'Password':
            return <InputPassword
                onChange={_onChange.bind(this, field)}
                {...props}/>;
        case 'Number':
        case 'Tel':
            return <InputNumber
                defaultValue={value}
                onChange={_onChange.bind(this, field)}
                required={required}
                {...props}/>;
        case 'Text':
            return <InputText
                defaultValue={value}
                onChange={_onChange.bind(this, field)}
                required={required}
                {...props}/>;
        case 'Relation':
            return <InputRelation
                defaultValue={value}
                onChange={_onChange.bind(this, field)}
                isMulti={type === 'Relation'}
                schema={props.schema || (schemas || context.schemas).find(s => s.collection === props.target)}
                find={findObject}
                required={required}
                {...props}/>;
        case 'Pointer':
            return <InputPointer
                defaultValue={value}
                onChange={_onChange.bind(this, field)}
                schema={props.schema || (schemas || context.schemas).find(s => s.collection === props.target)}
                find={findObject}
                required={required}
                {...props}/>;
        case 'Image':
            return <InputImage
                value={value}
                onChange={_onChange.bind(this, field)}
                save={saveImage}
                required={required}
                {...props}/>;
        case 'File':
            return <InputFile
                value={value}
                onChange={_onChange.bind(this, field)}
                save={saveFile}
                required={required}
                {...props}/>;
        case 'Signature':
            return <InputSignature
                value={value}
                onChange={_onChange.bind(this, field)}
                save={saveFile}
                required={required}
                {...props}/>;
        case 'Boolean':
            return <Checkbox
                defaultChecked={value}
                onChange={_onChange.bind(this, field)}
                id={field}
                required={required}
                {...props}/>;
        case 'Object':
        case 'Array':
            return <InputJson
                defaultValue={value}
                onChange={_onChange.bind(this, field)}
                required={required}
                {...props}/>;
        case 'Enum':
            return <InputSelect
                defaultValue={value}
                onChange={_onChange.bind(this, field)}
                type={type.toLowerCase()}
                options={props.options}
                placeholder={props.placeholder || ((props.dynamic ? "Select of type " : "Select ") + (props.label || field))}
                required={required}
                {...props}/>;
        case 'Icon':
            return <InputIcon
                defaultValue={value}
                onChange={_onChange.bind(this, field)}
                options={props.options}
                required={required}
                {...props}/>;
        default:
            return null;
    }
}

InputFactory.defaultProps = defaultProps;
export default InputFactory;
