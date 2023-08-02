function objectToOption(object, indexes) {
  // first filter the index has value then if no value the id will be use
  return {
    label:
      indexes
        .filter((index) => object[index])
        .map((index) => object[index])
        .join(" ") || object.id,
    value: object.id,
    object: object,
  };
}

export default objectToOption;
