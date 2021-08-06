var n = window.prompt("Enter the number of words");
var word, counter;
var result = "";
var bigArray = []; // We'll use an array within an array - a table with the first column with the words and second column with the counters
var uniqueWords = [];
for (var i = 0; i < n; i++) {
  if (i === 0) {
    bigArray[i] = []; // First word pushed in by default
    bigArray[i][0] = window.prompt("Enter words");
    bigArray[i][1] = 1;
    uniqueWords.push(word);

  } else {
    word = window.prompt("Enter words");
    for (var j = 0; j < i; j++) { // Go through the inner arrays
      if (j == bigArray.length - 1) {
        if (bigArray[j][0] === word) {
          bigArray[j][1] += 1;

          break
        } else {
          bigArray.push([word, 1]);
          uniqueWords.push(word);
          break
        }
      }
      else if (bigArray[j][0] == word) {
        bigArray[j][1] += 1;

        break
      }
    }
  }
}
console.log(uniqueWords.length);
for (var k = 0; k < uniqueWords.length; k++) {
  result += bigArray[k][1].toString() + " ";

}
console.log(result);



             // BONUS Part
var newArray = bigArray;
for(var i = 0; i < newArray.length; i++){
for(var j = 0; j < ( newArray.length - i -1 ); j++){

  if(newArray[1][j] < newArray[1][j+1]){

    var temp = newArray[0][j]
    newArray[0][j] = newArray[0][j+1]
    newArray[0][j+1] = temp
  }
}
}

// Print the sorted array
var descending = "";
for (var k = 0; k < newArray.length; k++) {
  descending += newArray[k][0] + ",";

}
console.log("Descending order of occurences: " + descending);
console.log("Most repeated: " + newArray[0][0]);
console.log("Least repeated: " + newArray[newArray.length-1][0]);
