var n = window.prompt("Enter the number of words");
var word, counter;
var result = "";
var bigArray = [];
var uniqueWords = [];
for (var i = 0; i < n; i++) {
  if (i === 0) {
    bigArray[i] = [];
    bigArray[i][0] = window.prompt("Enter words");
    bigArray[i][1] = 1;
    uniqueWords.push(word);

  } else {
    word = window.prompt("Enter words");
    for (var j = 0; j < i; j++) {
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
