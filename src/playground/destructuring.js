const person = {
    name: 'Nikhil',
    place: 'Gandhinagar',
    age: 38,
    location:{
        city:'Gandhinagar',
        temp: 555
    }
};

const {name='Anonymous', age} = person;
// const name = person.name;
// const age = person.age;
console.log(`${name} is ${age}.`);
const {city,temp:temparature} = person.location;
console.log(`${city} has ${temparature}.`);

//Array destructuring
const address = ['1688/1','sector 2D', 'Gandhinagar','Gujarat'];
const [street,sector,city1,state] = address;
console.log(`You are in ${street} ${sector} ${city1} ${state}`);