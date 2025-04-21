const getMean = (array) => array.reduce((acc, el) => acc + el, 0) / array.length;

const getMedian = (array) => {
  const sorted = array.toSorted((a, b) => a - b);
  const median =
    sorted.length % 2 === 0
      ? getMean([sorted[sorted.length / 2], sorted[sorted.length / 2 - 1]])
      : sorted[Math.floor(sorted.length / 2)];
  return median;
}

const getMode = (array) => {
  const counts = {};
  array.forEach((el) => {
    counts[el] = (counts[el] || 0) + 1;
  })

  let highest = 0;
  let highestNum = 0;

  for(let i = 0; i < Object.keys(counts).length; i++) {
    
    if(Object.values(counts)[i] > highestNum) {
      highest = Object.keys(counts)[i];
      highestNum = Object.values(counts)[i];
    } else if (Object.values(counts)[i] === highestNum) {
      highest = `${highest}, ${Object.keys(counts)[i]}`
    } else {
      continue
    }

    console.log(Object.keys(counts))
    console.log(Object.keys(counts)[i])
    console.log(Object.values(counts))
    console.log(Object.values(counts)[i])
    console.log(highest)
    console.log(highestNum)
  }

  if(highestNum === 1) {
    return 'All numbers appear the same amount of times'
  } else {
    return highest
  }

  // if (new Set(Object.values(counts)).size === 1) {
  //   return null;
  // }
  // const highest = Object.keys(counts).sort(
  //   (a, b) => counts[b] - counts[a]
  // )[0];
  // const mode = Object.keys(counts).filter(
  //   (el) => counts[el] === counts[highest]
  // );
  // return mode.join(", ");
}


const calculate = () => {
  const value = document.querySelector("#numbers").value;
  const array = value.split(/,\s*/g);
  const numbers = array.map(el => Number(el)).filter(el => !isNaN(el));
  
  const mean = getMean(numbers);
  const median = getMedian(numbers);
  const mode = getMode(numbers);


  document.querySelector("#mean").textContent = mean;
  document.querySelector("#median").textContent = median;
  document.querySelector("#mode").textContent = mode;

}

// const products = [
//   {
//     id: 1,
//     name: "p1",
//     priceCents: 2999,
//     rating: "4/5"
//   },
//   {
//     id: 2,
//     name: "p2",
//     priceCents: 2999,
//     rating: "4/5"
//   },
//   {
//     id: 3,
//     name: "p3",
//     priceCents: 2999,
//     rating: "4/5"
//   },
//   {
//     id: 4,
//     name: "p4",
//     priceCents: 2999,
//     rating: "4/5"
//   },
//   {
//     id: 5,
//     name: "p5",
//     priceCents: 2999,
//     rating: "4/5"
//   },
//   {
//     id: 6,
//     name: "p6",
//     priceCents: 2999,
//     rating: "4/5"
//   },
//   {
//     id: 7,
//     name: "p7",
//     priceCents: 2999,
//     rating: "4/5"
//   },
// ]

// const getNames = (arr) => {
//   return arr.map((el) => el.name)
// }

// console.log(getNames(products))

var findMedianSortedArrays = function(nums1, nums2) {

  const numsTotal = nums1.concat(nums2);

  console.log(numsTotal)
  
  const numsSorted = numsTotal.sort(function(a, b) {
      return a - b;
  });

  console.log(numsSorted)

  if(numsSorted.length % 2 === 1) {
      return numsSorted[Math.floor(numsSorted.length / 2)];
      
  } else {
      return (numsSorted[numsSorted.length - 1] + numsSorted[numsSorted.length])/2
  }
}

console.log(findMedianSortedArrays([1,3], [2]))