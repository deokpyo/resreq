// $(document).ready(function () {

//     // $.datetimepicker.setLocale('en');
//     $('#startEvent').datetimepicker();
//     $('#endEvent').datetimepicker();

//     $("#eventSubmitButton").on("click", function (e) {
//         console.log("event submitted");
//         e.preventDefault();
//         var newStartEvent = $("#startEventInput").val();
//         var newEndEvent = $("#endEventInput").val();
//         var newTitle = $("#eventTitle").val().trim();
//         var msStart = moment(newStartEvent, "MM/DD/YYYY HH:mm a").valueOf();
//         var msEnd = moment(newEndEvent, "MM/DD/YYYY HH:mm a").valueOf();


//         // ajax call to store event data in database


//         var newEventObject = {
//             title: newTitle,
//             event_url: "http://someurl.com",
//             event_start_time: msStart,
//             event_end_time: msEnd,
//             // username: loggedInUser.username,
//             owner_email: localStorage.user_email,
//             restaurantId: localStorage.resId
//         };


//         $.ajax({
//             url: "/api/newEvent",
//             type: "POST",
//             dataType: "json",
//             data: newEventObject,
//             success: function (data, textStatus, jqXHR) {
//                 //data - response from server
//                 console.log(data);
//                 console.log("new event data received");
//                 //window.location = '/admin/events';
//             },
//             error: function (jqXHR, textStatus, errorThrown) {

//             }
//         });

//     });
// });