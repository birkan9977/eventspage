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

export function customReducer(obj, keysIndexesArray) {
  const initialValue = obj;
  const reduced = keysIndexesArray.reduce((accumulator, currentValue) => {
    accumulator = accumulator[currentValue];

    return accumulator;
  }, initialValue);

  return reduced;
}

function numberSort(obj, sortDirection, keysIndexesArray) {
  obj.sort(function (a, b) {
    if (sortDirection === -1) {
      return (
        customReducer(b, keysIndexesArray) - customReducer(a, keysIndexesArray)
      );
    }
    return (
      customReducer(a, keysIndexesArray) - customReducer(b, keysIndexesArray)
    );
  });
}

function stringSort(obj, sortDirection, keysIndexesArray) {
  obj.sort(function (a, b) {
    const stringA = customReducer(a, keysIndexesArray).toUpperCase();
    const stringB = customReducer(b, keysIndexesArray).toUpperCase();

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

function dateSort(obj, sortDirection, keysIndexesArray) {
  obj.sort(function (a, b) {
    if (sortDirection === -1) {
      return (
        new Date(customReducer(b, keysIndexesArray)) -
        new Date(customReducer(a, keysIndexesArray))
      );
    }
    return (
      new Date(customReducer(a, keysIndexesArray)) -
      new Date(customReducer(b, keysIndexesArray))
    );
  });
}

export function sortData(type, data, sortDirection, keysIndexesArray) {
  const newCopyObj = data.map((item) => {
    return {
      ...item,
    };
  });

  //sortDirection: -1 descending, 1 ascending
  sortDirection = Number(sortDirection);

  if (type === "date") {
    dateSort(newCopyObj, sortDirection, keysIndexesArray);
  } else if (type === "number") {
    numberSort(newCopyObj, sortDirection, keysIndexesArray);
  } else if (type === "string") {
    stringSort(newCopyObj, sortDirection, keysIndexesArray);
  }
  return newCopyObj;
}
