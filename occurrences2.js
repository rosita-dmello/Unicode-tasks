
var n = window.prompt("Enter the number of words");
var word, counter;
var bigArray = {};

for(var i =0;i<n;i++){
  word = window.prompt("word");
  if(word in bigArray){
    bigArray[word]+=1;
  } else{
    bigArray[word]=1;
  }
}
console.log(Object.keys(bigArray).length);
var result =""
for (const word in bigArray){
  result+=bigArray[word].toString()+" "
}
console.log(result);
