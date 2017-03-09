var resId = localStorage.resId;

// create the admin navigation
var ul = $("<ul class='nav nav-pills nav-justified'>");

var li = $("<li role='presentation'>");
var a = $("<a>");
a.text("Home");
a.attr("href", "/" + resId);
li.append(a);
ul.append(li);

var li = $("<li role='presentation'>");
var a = $("<a>");
a.text("Menu");
a.attr("href", "/" + resId + "/menu");
li.append(a);
ul.append(li);

var li = $("<li role='presentation'>");
var a = $("<a>");
a.text("Reservation");
a.attr("href", "/" + resId + "/reserve");
li.append(a);
ul.append(li);

var li = $("<li role='presentation'>");
var a = $("<a>");
a.text("Events");
a.attr("href", "/" + resId + "/event");
li.append(a);
ul.append(li);

var li = $("<li role='presentation'>");
var a = $("<a>");
a.text("Reviews");
a.attr("href", "/" + resId + "/review");
li.append(a);
ul.append(li);

var li = $("<li role='presentation'>");
var a = $("<a>");
a.text("Contact");
a.attr("href", "/" + resId + "/contact");
li.append(a);
ul.append(li);

$("#admin-nav").html(ul);