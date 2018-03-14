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
    var startDate ;
    var monthlyRate ;

    // Capture Button Click
    $("#submit").on("click", function(event) {
      event.preventDefault();

    // Grabbed values from text boxes
    // Grabbed values from text boxes
    name = $("#employee-name").val().trim();
    role = $("#role").val().trim();
    startDate = $("#start-date").val();   
    monthlyRate = $("#monthly-rate").val();
    console.log(startDate);
    
    // Code for handling the push
    lastPushed = database.ref().push({
      name: name,
      role: role,
      startDate: startDate,
      monthlyRate: monthlyRate,
    });
  });


  // Firebase watcher + initial loader + order/limit HINT: .on("child_added"
  //database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
    database.ref().orderByChild("dateAdded").on("child_added", function(snapshot){
    // storing the snapshot.val() in a variable for convenience
    var sv = snapshot.val();
    var convertedDate = moment(sv.startDate, 'YYYY-MM-DD');
    months = moment(convertedDate.diff(moment(), "months"));
    // Console.loging the last user's data
    //snapStartDate = new Date(sv.startDate);
    todaysDate = new Date();
    console.log("Today: " + todaysDate);
    //months = Math.floor((new Date() - snapStartDate)  / (60*1000*60*24*30))
    
    totalBilled = months * sv.monthlyRate;
    console.log("name: "+ sv.name);
    console.log(sv.role);
    //console.log("SnapStartDate: " + snapStartDate);
    console.log("StartDate: " + sv.startDate);
    console.log(sv.monthlyRate);

    // Change the HTML to reflect
    // $("tbody").text(sv.name);
    // $("").text(sv.role);
    // $("").text(sv.startDate);
    // $("").text(sv.monthlyRate);
    $('tbody').append(`<tr><td>${sv.name}</td><td>${sv.role}</td>
    <td>${sv.startDate}</td><td>${months}  </td><td>${sv.monthlyRate}</td><td>${totalBilled}</td></tr>`)

    // Handle the errors
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
    
  });