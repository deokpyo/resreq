$(document).ready(function () {
    // input references
    var res_name = $("#name");
    var res_user = $("#nickname");
    var res_addr = $("#address");
    var res_phne = $("#phone");
    var res_hour = $("#hours");
    var res_emil = $("#email");
    // user_email will be used to define the userId in getUserId()
    var user_email = localStorage.user_email;

    // check for any empty input
    function validateInput() {
        // initialize boolean to return
        var isEmpty = false;
        // check for empty input
        $("input.form-control").each(function () {
            if ($(this).val() === "") {
                isEmpty = true;
            }
        });
        return isEmpty;
    }

    // clear out all the inputs
    function resetInput() {
        $("#name").val("");
        $("#nickname").val("");
        $("#address").val("");
        $("#phone").val("");
        $("#hours").val("");
        $("#email").val("");
    }

    // on submit button click
    $("#create").on("click", function () {
        // validate input
        var isEmpty = validateInput();
        if (isEmpty) {
            alert("Please fill out all fields");
        }
        else {
            // create the restaurant object
            var restaurant = {
                name: res_name.val(),
                user_name: res_user.text(),
                address: res_addr.val(),
                phone: res_phne.val(),
                hour: res_hour.val(),
                email: res_emil.val(),
                userId: localStorage.userId
            };
            // reset
            resetInput();
            // post ajax call to create a new restaurant
            $.post("/api/create", restaurant, function () {
                getResByUserId();
            });
        }
    });

    // get userId by login email
    function getUserId() {
        $.get("/api/user/" + user_email, function (data) {
            // save userId in the localStorage
            console.log(data);
            localStorage.setItem("userId", data[0].id);
        });
        getResByUserId();
    }

    // get all the restaurants that belong to the userId
    function getResByUserId() {
        $.get("/api/get/" + localStorage.userId, function (data) {
            console.log(data);
            createRes(data);
        });
    }

    // create the list of restaurants
    function createRes(req) {
        var ul = $("<ul class='list-group'>");
        for (i in req) {
            var li = $("<li class='list-group-item'>");
            var btn = $('<a class="btn btn-default btn-route" role="button">');
            console.log(req[i]);
            btn.text(req[i].name);
            btn.attr('restaurant-id', req[i].id);
            li.append(btn);
            ul.append(li);
        }
        $("#restaurant-info").html(ul);
    }

    $(document.body).on("click", ".btn-route", function () {
        var resId = $(this).attr("restaurant-id");
        // save admin id from button clicked in the localStorage
        localStorage.setItem('resId', resId);
        // then direct to the admin page specified by the resId
        window.location = "/" + resId;
    });

    // initialize by getting the userId
    getUserId();
});