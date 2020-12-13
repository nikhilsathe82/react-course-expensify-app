//to connect to the firebase database. other modules can use the db  by importing from this js file.
import * as firebase from 'firebase'; //* takes all named export from firebase and dumps them in to a var called firebase 

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
  };

 // Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();


const database = firebase.database();
// a provider provides a way to provide authenticaiton. we can have for fb, twiter, google etc
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { firebase, googleAuthProvider, database as default };

// // child_removed (this event is get fired when one of the expenses is deleted )

// database.ref('expenses').on('child_removed', (snapshot) => {
//      console.log(snapshot.key,snapshot.val());
// });

// // child_changed event fires when one of your child changes.
// database.ref('expenses').on('child_changed', (snapshot) => {
//    console.log(snapshot.key,snapshot.val());
// });

// //child_added event fires every time a child adds. it gets also called for existing onces besides new ones also
// database.ref('expenses').on('child_added', (snapshot) => {
//    console.log(snapshot.key,snapshot.val());
// });

// // to print each item in the arry in proper format
// // database.ref('expenses')
// //    .once('value')
// //    .then((snapshot) => {
// //       const expenses = [];
      
// //       snapshot.forEach((childSnapShot) =>{ //take return value from snapshot and print on screen
// //          expenses.push({
// //            id: childSnapShot.key,
// //            ...childSnapShot.val() // use spread operator to assign whatever coming from childsnapshot in expenses array
// //          });
// //       }); 
// //       console.log(expenses);
// //    });

// //subscription to expenses every time expenses changes in firebase
// // database.ref('expenses').on('value', (snapshot) => {
// //        const expenses = [];
      
// //       snapshot.forEach((childSnapShot) =>{ //take return value from snapshot and print on screen
// //          expenses.push({
// //            id: childSnapShot.key,
// //            ...childSnapShot.val() // use spread operator to assign whatever coming from childsnapshot in expenses array
// //          });
// //       }); 
// //       console.log(expenses);
// // });

// // database.ref('expenses').push({
// //    description: 'Rent',
// //    note: 'rent',
// //    amount: 100,
// //    createdAt: 243473928749
// // });


// // database.ref('notes/-MMijZCG5p4Xb2qn4nZT').update({
// //    body:'Buy Food'
// // });

// // to store data in the form of list in firebase, use push() as arrays are not supported.
// // database.ref('notes').push({
// //    title: 'Course Topics',
// //    body: 'React, React Native, Angular'
// // });

// // const firebaseNotes = {
// //    notes: {
// //       aaa: {
// //          title: 'First Note',
// //          body: 'This is my note'
// //       },
// //       bbb: {
// //          title: 'Second Note',
// //          body: 'This is my note'
// //       }
// //    }
// // };
// // const notes = [{
// //    id: '12',
// //    title: 'First Note',
// //    body: 'This is my note'
// // },
// // {
// //    id: '13',
// //    title: 'Second Note',
// //    body: 'This is my note'
// // }];
// // database.ref('notes').set(notes);

// // to fetch data from Firebase and print on console
// // database.ref().on('value', (snapshot) => {
// //    const val = snapshot.val();
// //    console.log(`${val.name} is a ${val.job.title} at ${val.job.company}`);
// // });

// // const onValueChange = database.ref().on('value', (snapshot) =>{
// //     console.log(snapshot.val());
// // }, (e) => {
// //    console.log('Error with data fetching',e);
// // });

// // setTimeout(() => {
// //    database.ref('age').set(39);
// // },4000);

// // setTimeout(() => {
// //     database.ref().off(onValueChange); // just remove on subscription without removing other subscriptions
// //  },7000);

// //  setTimeout(() => {
// //     database.ref('age').set(40);
// //  },10500);
 
// // using once()  to retrieve data from firebase
// // database.ref('location/city').once('value')
// //     .then((snapshot) => { //we get data in snapshot and we have access to it
// //       const val = snapshot.val(); //fetches entire data
// //       console.log (val);
// // })
// // .catch((e) => {
// //    console.log('Error fetching data',e);
// // });

// // database.ref().set({ //set can take any value i.e. string or num
// //     name:'Nikhil Sathe',
// //     age: 26,
// //     job: {
// //         title: 'Software Developer',
// //         company: 'Google'
// //     },
// //     stressLevel: 6,
// //     isSingle: true,
// //     location:{
// //         city: "Gandhinagar",
// //         country: 'India'
// //     }
// // }).then(()=>{
// //     console.log('Data is saved');
// // }).catch((error) =>{ //catch will have arrow func with some error
// //    console.log('This failed', error);
// // });

// // // database.ref('age').set(39);
// // // database.ref('location/city').set('Ahmedabad');
// // database.ref('attributes').set({
// //     height: 172,
// //     weight: 75
// // });
// // database.ref('email').set('sat.nikhil@gmail.com')
// //         .then(() => {
// //             console.log('Data is saved!!')
// //         }).catch((error) => {
// //             console.log('This is for failed error', error);
// //         });

// //Passing null for the new value is equivalent to calling remove(); namely, all data at this location and all child locations will be deleted.
// // database.ref('isSingle').set(null);

// // to update specific attributes in db in firebase with single call. update only updates at root level
// // database.ref().update({
// //     job: 'Manager',
// //     'location/city': 'Ahmedabad'
// // });
//  // name: 'Mike',
//     // age: 29,
//     // job: 'Software Engineer',
//     // isSingle: true
//     //isSingle: null -> setting it to null allows you to remove 
    
// //to remove a single attribute from the database in firebase
// // database.ref('isSingle')
// //     .remove()
// //     .then(() => {
// //           console.log('Data was removed');
// //     }).catch((e) => {
// //         console.log('Data was not removed');
// //     });




