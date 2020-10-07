//yarn test -- --watch 

const add = (a,b) => a + b;
const generateGreeting = (name="Anonymous") => `Hello ${name}!`;

test('should add two numbers', () =>{
   const result = add(4,5);
   expect(result).toBe(9);
  
//    if (result !== 9){
//        throw new Error (`you added 4 and 5. the result was ${result}. Expected 9`);
//    }
});

test('should print the name',()=>{
    const res=generateGreeting("Nikhil");
    expect(res).toBe("Hello Nikhil!");
});

test('should print the name',()=>{
    const res=generateGreeting();
    expect(res).toBe("Hello Anonymous!");
});
