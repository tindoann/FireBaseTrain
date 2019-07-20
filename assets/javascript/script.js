
// Initialize Firebase
let firebaseConfig = {
  apiKey: "AIzaSyCjr5k2ehfOc2wn3kFP7lwi2XUi1rTbUtg",
  authDomain: "fir-train-a82f9.firebaseapp.com",
  databaseURL: "https://fir-train-a82f9.firebaseio.com",
  projectId: "fir-train-a82f9",
  storageBucket: "",
  messagingSenderId: "965577337881",
  appId: "1:965577337881:web:21567438105ade94"
};

firebase.initializeApp(firebaseConfig);

let database = firebase.database();

// Button for train info
$("#add-train-btn").on("click", function (event) {
  event.preventDefault();

  // Grabs user input
  let trainName = $("#train-name").val().trim();
  let destination = $("#destination").val().trim();
  let frequency = moment($("#frequency").val().trim(), "MM/DD/YYYY").format("X");
  let first_train = $("#firstTrain").val().trim();

  // Creates local "temporary" object for holding train data
  let newTrain = {
    name: trainName,
    destination: destination,
    frequency: frequency,
    first_train: first_train
  };

  // Uploads train data to the database
  database.ref().push(newTrain);

  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-name").val("");
  $("#destination").val("");
  $("#frequency").val("");
  $("#firstTrain").val("");
});

// Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function (childSnapshot) {
  console.log(childSnapshot.val());

  const cv = childSnapshot.val()

  // Store everything into a variable.
  let trainName = cv.name;
  let destination = cv.destination;
  let frequency = cv.frequency;
  let first_train = cv.first_train;

  // train start
  let minAway = moment(frequency, "HH:mm");

  // Calculate 
  let nextArrival = moment().diff(moment(frequency, "X"), "months");
  console.log(nextArrival);

  // Create the new row with template strings

  let newRow =
    `<tr>
      <td id='trainName'>${trainName}</td>
      <td id='destination'>${destination}</td>
      <td id='nextArrival'>${nextArrival}</td>
      <td id='minAway'>${minAway}</td>
      <td id='ETA'>$</td>
   </tr>`

  // Append the new row to the table
  $("#train-table > tbody").append(newRow);

});


