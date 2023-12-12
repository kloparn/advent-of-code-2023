export default function parse(data) {
  data = data.reduce((universe, row, rowIndex, checkedArray) => {
    if (!row.includes("#")) {
      universe.push(row);
    }

    universe.push(row);

    return universe;
  }, []);

  const newData = [];

  for (let i = 0; i < data[0].length; i++) {
    const tempArr = [];
    for (let j = 0; j <= data.length; j++) {
      if (data[j]?.[i]) tempArr.push(data[j][i]);
    }

    if (!tempArr.includes("#")) {
      for (let j = 0; j <= tempArr.length; j++) {
        if (!newData[j]) newData[j] = [];
        newData[j].push(tempArr[j]);
      }
    }

    for (let j = 0; j <= tempArr.length; j++) {
      if (!newData[j]) newData[j] = [];
      newData[j].push(tempArr[j]);
    }
  }

  // last entry is undefined, so we remove it.
  newData.pop();

  return newData;
}
