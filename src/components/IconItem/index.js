function IconItem({value, label}) {
    return (
        <div className="react-select p-1 pl-3">
            <i className={value}></i>
            <span className="ms-3">{label}</span>
        </div>
    );
}

export default IconItem;
