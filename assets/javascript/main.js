var config = {
  apiKey: "AIzaSyAcbSVi8gvVrVzlV3Qe9ObntGO53yl4fmw",
  authDomain: "choochoo-d4202.firebaseapp.com",
  databaseURL: "https://choochoo-d4202.firebaseio.com",
  projectId: "choochoo-d4202",
  storageBucket: "choochoo-d4202.appspot.com",
  messagingSenderId: "103519842177"
};
firebase.initializeApp(config);

var database = firebase.database();

$("#train-submit").on("click", function() {
  event.preventDefault();

  var trainName = $("#input-train-name")
    .val()
    .trim();
  var trainDestination = $("#input-train-destination")
    .val()
    .trim();
  var initialTrain = $("#input-initial-time")
    .val()
    .trim();
  var trainFrequency = $("#input-train-frequency")
    .val()
    .trim();

  var newTrain = {
    name: trainName,
    destination: trainDestination,
    time: initialTrain,
    frequency: trainFrequency
  };

  database.ref().push(newTrain);

  alert("Train added");

  $("#input-train-name").val("");
  $("#input-train-destination").val("");
  $("#input-initial-time").val("");
  $("#input-train-frequency").val("");
});

database.ref().on("child_added", function(childSnapshot, prevChildKey) {
  console.log(childSnapshot.val());

  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var initialTrain = childSnapshot.val().time;
  var trainFrequency = childSnapshot.val().frequency;

  var initialTrainConverted = moment(initialTrain, "hh:mm").subtract(
    1,
    "years"
  );

  var currentTime = moment();

  var diffTime = moment().diff(moment(initialTrainConverted), "minutes");

  var trainTimeRemainder = diffTime % trainFrequency;

  var trainXminsAway = trainFrequency - trainTimeRemainder;

  var nextTrainArrival = moment()
    .add(trainXminsAway, "minutes")
    .format("hh:mm A");

  $("#train-table > tbody").append(
    `<tr id="train-table-body">
               <td> ${trainName} </td>
               <td> ${trainDestination} </td>
               <td> ${trainFrequency} </td>
               <td> ${nextTrainArrival} </td>
               <td> ${trainXminsAway} </td>
           </tr>
          `
  );
});
