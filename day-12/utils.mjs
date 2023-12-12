const isArrayEqual = (arr1, arr2) => {
  if (arr1.length !== arr2.length) return false;

  for (let i = 0; i < arr1.length; i++) {
    if (Number(arr1[i]) !== Number(arr2[i])) return false;
  }

  return true;
};

const countSpring = (spring) => {
  let counter = 0,
    n = [];

  for (let i = 0; i < spring.length; i++) {
    if (spring[i] === "#") counter++;
    else if (spring[i] === ".") counter > 0 && n.push(counter) && (counter = 0);
  }

  counter > 0 && n.push(counter);
  return n;
};

export { isArrayEqual, countSpring };
