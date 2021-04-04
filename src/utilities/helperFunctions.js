export function formatDate(date) {
  const newDate = new Date(date);
  const formattedDate =
    String(newDate.getDate()).padStart(2, "0") +
    "/" +
    String(newDate.getMonth() + 1).padStart(2, "0") +
    "/" +
    String(newDate.getFullYear()) +
    " " +
    String(newDate.getHours()).padStart(2, "0") +
    ":" +
    String(newDate.getMinutes()).padStart(2, "0") +
    ":" +
    String(newDate.getSeconds()).padStart(2, "0");
  return formattedDate;
}

export function changeArrayValue(array, indexToBeChanged, prop, value) {
  return array.map((item, index) => {
    if (Number(index) !== Number(indexToBeChanged)) {
      return item;
    }
    return {
      ...item,
      [prop]: value,
    };
  });
}

function reducer(obj, ...args) {
  const reduced = [...args].reduce((acc, cur) => {
    acc = acc[cur];

    return acc;
  }, obj);

  return reduced;
}

function numberSort(obj, sortDirection, ...args) {
  obj.sort(function (a, b) {
    if (sortDirection === -1) {
      return reducer(b, ...args) - reducer(a, ...args);
    }
    return reducer(a, ...args) - reducer(b, ...args);
  });
}

function stringSort(obj, sortDirection, ...args) {
  obj.sort(function (a, b) {
    const stringA = reducer(a, ...args).toUpperCase();
    const stringB = reducer(b, ...args).toUpperCase();

    if (stringA < stringB) {
      return sortDirection === 1 ? -1 : 1;
    }
    if (stringA > stringB) {
      return sortDirection === 1 ? 1 : -1;
    }

    //equal
    return 0;
  });
}

function dateSort(obj, sortDirection, ...args) {
  obj.sort(function (a, b) {
    if (sortDirection === -1) {
      return new Date(reducer(b, ...args)) - new Date(reducer(a, ...args));
    }
    return new Date(reducer(a, ...args)) - new Date(reducer(b, ...args));
  });
}

export function sortData(type, data, sortDirection, ...args) {
  const newCopyObj = data.map((item) => {
    return {
      ...item,
    };
  });

  if (type === "date") {
    dateSort(newCopyObj, Number(sortDirection), ...args);
  } else if (type === "number") {
    numberSort(newCopyObj, Number(sortDirection), ...args);
  } else if (type === "string") {
    stringSort(newCopyObj, Number(sortDirection), ...args);
  }
  return newCopyObj;
}
