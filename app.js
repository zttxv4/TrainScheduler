var firebaseConfig = {
    apiKey: "AIzaSyCACTcuaOn_5N6VtxhEw6pRbFEHwEewE40",
    authDomain: "project-1-10072019.firebaseapp.com",
    databaseURL: "https://project-1-10072019.firebaseio.com",
    projectId: "project-1-10072019",
    storageBucket: "project-1-10072019.appspot.com",
    messagingSenderId: "450701124909",
    appId: "1:450701124909:web:af1748b76f7ae09a155fa4",
    measurementId: "G-YMCTECZ91Z"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  

  var database = firebase.database();

  $("#add-train-btn").on("click", function(event) {
      event.preventDefault();

      var trainName = $("#train-name-input").val().trim();
      var destination = $("#destination-input").val().trim();
      var firstTrain = $("#firstTrain-input").val().trim();
      var frequency = $("#frequency-input").val().trim();

      var newTrain = {
          name: trainName,
          dest: destination,
          first: firstTrain,
          freq: frequency
      };

      database.ref().push(newTrain);

      $("#train-name-input").val("");
      $("#destination-input").val("");
      $("#firstTrain-input").val("");
      $("#frequency-input").val("");

  });

  database.ref().on("child_added", function(childSnapshot) {

    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().dest;
    var firstTrain = childSnapshot.val().first;
    var frequency = childSnapshot.val().freq;

    var firstTrainConvert = moment(firstTrain, "hh:mm a").subtract(1, "years");

    var currentTime = moment().format("HH:mm a");
    
    var currentTimeDiff = moment().diff(moment(firstTrainConvert), "minutes");

    var timeLeft = currentTimeDiff % frequency;

    var minutesAway = frequency - timeLeft;

    var nextArrival = moment().add(minutesAway, "minutes").format("hh:mm a");

    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(destination),
        $("<td>").text(frequency),
        $("<td>").text(nextArrival),
        $("<td>").text(minutesAway)
    );

    $("#train-table > tbody").append(newRow);


  })