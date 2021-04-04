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

export function customReducer(obj, ...args) {
  const initialValue = obj;
  const reduced = [...args].reduce((accumulator, currentValue) => {
    accumulator = accumulator[currentValue];

    return accumulator;
  }, initialValue);

  return reduced;
}

function numberSort(obj, sortDirection, ...args) {
  obj.sort(function (a, b) {
    if (sortDirection === -1) {
      return customReducer(b, ...args) - customReducer(a, ...args);
    }
    return customReducer(a, ...args) - customReducer(b, ...args);
  });
}

function stringSort(obj, sortDirection, ...args) {
  obj.sort(function (a, b) {
    const stringA = customReducer(a, ...args).toUpperCase();
    const stringB = customReducer(b, ...args).toUpperCase();

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
      return (
        new Date(customReducer(b, ...args)) -
        new Date(customReducer(a, ...args))
      );
    }
    return (
      new Date(customReducer(a, ...args)) - new Date(customReducer(b, ...args))
    );
  });
}

export function sortData(type, data, sortDirection, ...args) {
  const newCopyObj = data.map((item) => {
    return {
      ...item,
    };
  });

  //sortDirection: -1 descending, 1 ascending
  sortDirection = Number(sortDirection);

  if (type === "date") {
    dateSort(newCopyObj, sortDirection, ...args);
  } else if (type === "number") {
    numberSort(newCopyObj, sortDirection, ...args);
  } else if (type === "string") {
    stringSort(newCopyObj, sortDirection, ...args);
  }
  return newCopyObj;
}
