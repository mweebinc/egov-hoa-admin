import objectToOption from "./objectToOption";

let timeout;

function getOption(collection, word, indexes, find, where, callback) {
  const query = { count: true, limit: 100, where: { ...where } }; // don't mutate where
  if (word && indexes.length > 0) {
    query.where["$or"] = indexes.map((index) => {
      const or = {};
      or[index] = { $regex: word, $options: "i" };
      return or;
    });
  }
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    find?.execute(collection, query).then(({ objects }) => {
      // sort the result
      callback(
        objects
          .map((obj) => objectToOption(obj, indexes))
          .sort((a, b) => {
            if (a.label < b.label) {
              return -1;
            }
            if (a.label > b.label) {
              return 1;
            }
            return 0;
          })
      );
    });
  }, 300);
}

export default getOption;
