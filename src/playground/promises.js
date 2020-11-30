
const promise = new Promise((resolve,reject) => {
  setTimeout(() => {
    resolve({
        name: 'Andrew',
        age: 39
    });
    // reject('Something went wrong');
},5000);
  
});

console.log('before');

//register a call back. and the callback fires when a promise resolves. data is any data that might have got passed into resolve.
//catch defines a function which fires when promise fails and we get access to data passed into promise

promise.then((data) => {
  console.log('1',data);

  // return 'some data';// this is str that gets passed down to .then that can be used. pass data from one success callback to another. 
  return new Promise ((resolve,reject) => { // the .then below is the success case for this promise. and only executes when this promise resolves
    setTimeout(() => {
      resolve('This is my another promise');
      // reject('Something went wrong');
  },5000);
}).then((str) =>{
    console.log('does this run?',str);
}).catch((error)=>{ //catch handles error with single function. this func gets called when promise rejects and we get access to some error or data it passes
   console.log('error:', error);
});




console.log('after');