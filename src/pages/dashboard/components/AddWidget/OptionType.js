import TypeRelation from "./TypeRelation";

function OptionType({type, collections, onChange}) {
    switch (type) {
        case 'Relation':
        case 'Pointer':
            return <TypeRelation
                onChange={onChange}
                collections={collections}/>
        default:
            return null;
    }
}

export default OptionType;
