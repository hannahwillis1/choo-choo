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

$("#add-train-btn").on("click", function() {
  event.preventDefault();

  var trainName = $("#train-name-input")
    .val()
    .trim();
  var trainDestination = $("#destination-input")
    .val()
    .trim();
  var firstTrain = $("#first-train-input")
    .val()
    .trim();
  var trainFrequency = $("#frequency-input")
    .val()
    .trim();

  var newTrain = {
    name: trainName,
    destination: trainDestination,
    time: firstTrain,
    frequency: trainFrequency
  };

  database.ref().push(newTrain);

  alert("Train added");

  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-train-input").val("");
  $("#frequency-input").val("");
});

database.ref().on(
  "child_added",
  function(childSnapshot, prevChildKey) {
    console.log(childSnapshot.val());

    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var firstTrain = childSnapshot.val().time;
    var trainFrequency = childSnapshot.val().frequency;

    var firstTrainConverted = moment(firstTrain, "hh:mm").subtract(1, "years");

    var currentTime = moment();

    var diffTime = moment().diff(moment(firstTrainConverted), "minutes");

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
  },
  function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  }
);
