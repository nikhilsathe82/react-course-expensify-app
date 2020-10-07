console.log('utils.js is running!');

export const square = (x) => x * x;
export const multiply = (a,b) => a*b;

//const subtract = (a,b) => a-b;

export default (a,b) => a-b;
//export { square,multiply,subtract as default }; //named export. you can have only one default export