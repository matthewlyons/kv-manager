function permutations(...args) {
  let r = [];
  let max = args.length - 1;

  function helper(arr, i) {
    for (let j = 0, k = args[i].length; j < k; j++) {
      let a = arr.slice(0); // clone arr
      a.push(args[i][j]);
      console.log(i, j, a);
      if (i == max) r.push(a);
      else helper(a, i + 1);
    }
  }
  helper([], 0);
  return r;
}

let values = permutations(['1/4', '1/2', '4/4'], ['Blue', 'Red']);
console.log(values);
