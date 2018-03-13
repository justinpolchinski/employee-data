// Initialize Firebase
console.log("linking...");
var config = {
    apiKey: "AIzaSyD2PGQQb1jWbJ85Kf_3cEFFEdnT32eiwMc",
    authDomain: "employeedatabase-54793.firebaseapp.com",
    databaseURL: "https://employeedatabase-54793.firebaseio.com",
    projectId: "employeedatabase-54793",
    storageBucket: "employeedatabase-54793.appspot.com",
    messagingSenderId: "913267859664"
  };
  firebase.initializeApp(config);

  // Create a variable to reference the database.
  var database = firebase.database();

  // Initial Values
  var name = "";
    var role = "";
    var startDate = "";
    var monthlyRate = "";

    // Capture Button Click
    $("#submit").on("click", function(event) {
      event.preventDefault();

    // Grabbed values from text boxes
    // Grabbed values from text boxes
    name = $("#employee-name").val().trim();
    role = $("#role").val().trim();
    startDate = $("#start-date").val().trim();
    monthlyRate = $("#monthly-rate").val().trim();
    // Code for handling the push
    lastPushed = database.ref().push({
      name: name,
      role: role,
      startDate: startDate,
      monthlyRate: monthlyRate,
    });
  });


  // Firebase watcher + initial loader + order/limit HINT: .on("child_added"
  database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
    // storing the snapshot.val() in a variable for convenience
    var sv = snapshot.val();

    // Console.loging the last user's data
    console.log(sv.name);
    console.log(sv.email);
    console.log(sv.age);
    console.log(sv.comment);

    // Change the HTML to reflect
    $("#name-display").text(sv.name);
    $("#email-display").text(sv.email);
    $("#age-display").text(sv.age);
    $("#comment-display").text(sv.comment);

    // Handle the errors
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });