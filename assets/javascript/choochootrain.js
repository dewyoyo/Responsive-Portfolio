 var config = {
            apiKey: "AIzaSyDoBddgL_yJQw6odhEVxGBAA0zD_B4mjso",
            authDomain: "choochootrain-26a7d.firebaseapp.com",
            databaseURL: "https://choochootrain-26a7d.firebaseio.com",
            projectId: "choochootrain-26a7d",
            storageBucket: "choochootrain-26a7d.appspot.com",
            messagingSenderId: "942572432155"
        };
        firebase.initializeApp(config);

        // Get a reference to the database service
        var database = firebase.database();

        //changed variable in a current train schedule row
        var newTrain;
        var newDesti;
        var newArrival;
        var newFreq;

        // clear addTrain form
        function addTrainClear() {
            $("#train-input").val("");
            $("#desti-input").val("");
            $("#time-input").val("");
            $("#frequency-input").val("");
        };

        // show current train shedule 
        function showTrain(dataKey, trainID, destination, firstTime, frequency) {
            // First Time (pushed back 1 year to make sure it comes before current time)
            var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
            console.log(firstTimeConverted);

            // Current Time
            var currentTime = moment();
            console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

            // Difference between the times
            var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
            // console.log("DIFFERENCE IN TIME: " + diffTime);

            // Time apart (remainder)
            var tRemainder = diffTime % frequency;
            // console.log(tRemainder);

            // Minute Until Train
            var tMinutesTillTrain = frequency - tRemainder;
            console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

            // Next Train
            var nextTrain = moment().add(tMinutesTillTrain, "minutes");
            console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));

            // var minAway = moment(nextT, "HH:mm").diff(moment(nowT, "HH:mm"), "minutes");

            var newRow = "<div class='row' id='train-current-row'>" +
                "<div class='col-md-2' id='update-trainID' contenteditable='true'> " + trainID + "</div>" +
                "<div class='col-md-2' id='update-desti' contenteditable='true'> " + destination + " </div>" +
                "<div class='col-md-2' id='update-freq' contenteditable='true'> " + frequency + " </div>" +
                "<div class='col-md-2' id='update-arrival' type='time' contenteditable='true'> " + moment(nextTrain).format("HH:mm") + " </div>" +
                "<div class='col-md-2'> " + tMinutesTillTrain + " </div>" +
                "<button class='btn btn-default' id='update-train' type='submit' data-train-key=" + dataKey + ">update</button>" +
                "<button class='btn btn-default' id='remove-train' type='submit' data-train-key=" + dataKey + ">remove</button>";

            $("#current-schedule").append(newRow);

        }
        // retrieve data from firebase database
        function dataRetrieve() {
            $("div.row").parent().remove;

            //database data added
            database.ref().on("child_added", function (snapshot) {
                // console.log("database child_added");
                console.log(snapshot.val());
                console.log(snapshot.key);

                // show the data to the current train schedule
                showTrain(snapshot.key, snapshot.val().trainID, snapshot.val().destination, snapshot.val().arrivalTime, snapshot.val().frequency);

                // Handle the errors
            }, function (errorObject) {
                console.log("Errors handled: " + errorObject.code);
            });
        }

        dataRetrieve();
        
        // auto refresh the current train schedule
        function autoRefresh() {
            var timerId;
            clearInterval(timerId);
            timerId = setInterval(reloadPage, 60 * 1000);
        };

        function reloadPage() {
            console.log("reload");
            location.reload();
        }

        autoRefresh();

        // add train button clicked
        $("#add-train").on("click", function (event) {
            event.preventDefault();

            var trainInput = $("#train-input").val().trim();
            var destiInput = $("#desti-input").val().trim();
            var timeInput = $("#time-input").val().trim();
            var freqInput = $("#frequency-input").val().trim();

            database.ref().push({
                trainID: trainInput,
                destination: destiInput,
                arrivalTime: timeInput,
                frequency: freqInput
            });

            addTrainClear();

        });

        // remove button click
        $("div.row").on("click", "#remove-train", function (event) {
            event.preventDefault();

            var removeTrain = $(this).attr("data-train-key");
            console.log("remove-train button clicked: " + removeTrain);

            // database.ref().child(removeTrain).update({
            //     trainID: null,
            //     destination: null,
            //     arrivalTime: null,
            //     frequency: null
            // });
            database.ref().child(removeTrain).remove();
            $(this).parent().remove();
            // reloadPage();

        });


        // if user update the train trainID in a row
        $("div.row").on("keyup", "#update-trainID", function (event) {
            event.preventDefault();

            newTrain = $(this).text();
            console.log("newTrain: " + newTrain);
        });
        // if user update the train destination in a row
        $("div.row").on("keyup", "#update-desti", function (event) {
            event.preventDefault();

            newDesti = $(this).text();
            console.log("newDesti: " + newDesti);
        });
        // if user update the train arrivalTime in a row
        $("div.row").on("keyup", "#update-arrival", function (event) {
            event.preventDefault();

            newArrival = $(this).text();
            console.log("newArrival: " + newArrival);
        });
        // if user update the train frequency in a row
        $("div.row").on("keyup", "#update-freq", function (event) {
            event.preventDefault();

            newFreq = $(this).text();
            console.log("newFreq: " + newFreq);
        });

        // update button click
        $("div.row").on("click", "#update-train", function (event) {
            event.preventDefault();

            var updateTrain = $(this).attr("data-train-key");
            console.log("update-train button clicked: " + updateTrain);

            if (newTrain) {
                console.log("update newTrain: " + newTrain);
                database.ref().child(updateTrain).update({
                    trainID: newTrain
                });
            }
            if (newDesti) {
                console.log("update newDesti: " + newDesti);
                database.ref().child(updateTrain).update({
                    destination: newDesti
                });
            }
            if (newArrival) {
                console.log("update newArrival: " + newArrival);
                database.ref().child(updateTrain).update({
                    arrivalTime: newArrival
                });
            }
            if (newFreq) {
                console.log("update newFreq: " + newFreq);
                database.ref().child(updateTrain).update({
                    frequency: newFreq
                });
            }

            reloadPage();

        });
