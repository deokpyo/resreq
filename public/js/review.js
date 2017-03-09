$(document).ready(function(){
    // Load all existing reviews on page load
    loadReviews();

    $("#reviewSubmit").on("click", function(e){
        e.preventDefault();

        var reviewerName = $("#reviewerName").val().trim();
        var rating = $("#reviewRating").val();
        var reviewParagraph = $("#reviewComments").val();
        var resId = localStorage.resId;
        // create the review to send in POST route
        var reviewObject = {
            "name": reviewerName,
            "body": reviewParagraph,
            "rate": rating,
            "restaurantId": resId
        };
        // localhost:8080
        var currentURL = window.location.origin;
        
             $.ajax({
                     url: "/api/review",
                     type: "POST",
                     data: reviewObject,
                     dataType: "json",
                     error: function(jqXHR, textStatus, errorThrown) {
                        console.log( jqXHR.responseText);
                     }
                 })
                 .done(function (data) {
                     console.log(data);
                     $("#reviewerName").val("");
                     $("#reviewRating").val("");
                     $("#reviewComments").val("");
                     loadReviews();
                 });
    });

// DO NOT DELETE - needed for star rating functionality
        $(".loadedReview").rating({displayOnly: true});
		$(".input-heart").rating();
        $('.kv-gly-heart').rating({
            containerClass: 'is-heart',
            defaultCaption: '{rating} hearts',
            starCaptions: function (rating) {
                return rating == 1 ? 'One heart' : rating + ' hearts';
            },
            filledStar: '<i class="glyphicon glyphicon-heart"></i>',
            emptyStar: '<i class="glyphicon glyphicon-heart-empty"></i>'
        });
        $('.rating,.kv-gly-star,.kv-gly-heart,.kv-uni-star,.kv-uni-rook,.kv-fa,.kv-fa-heart,.kv-svg,.kv-svg-heart').on(
                'change', function () {
                    console.log('Rating selected: ' + $(this).val());
                });
//  END - needed for star rating functionality
});

function loadReviews(){
    // clear reviews area before loaidng all reviews
    $("#reviewsArea").html("");
                 $.ajax({
                     url: "/api/review/"+localStorage.resId,
                     type: "GET",
                     dataType: "json",
                     error: function(jqXHR, textStatus, errorThrown) {
                        console.log( jqXHR.responseText);
                     }
                 })
                 .done(function (data) {                    
                     data.forEach(function(review){
                        var newReview = $("<li>");
                        newReview.addClass("list-group-item");
                        newReview.append("<h3>"+review.name+"</h3>");
                        newReview.append('<input class="kv-gly-heart rating-loading loadedReview" value="'+ review.rate +'" data-size="xs" title="">');
                        newReview.append("<p> > "+ review.body+"</p>");
                        $("#reviewsArea").append(newReview);
                        displayOnly();
                     });
                     
                     console.log(data);                     
                 });

                //  $(".loadedReview").rating({displayOnly: true});

}

function displayOnly() {
    $(".loadedReview").rating({
        displayOnly: true,
        containerClass: 'is-heart',
        defaultCaption: '{rating} hearts',
        starCaptions: function (rating) {
            return rating == 1 ? 'One heart' : rating + ' hearts';
        },
        filledStar: '<i class="glyphicon glyphicon-heart"></i>',
        emptyStar: '<i class="glyphicon glyphicon-heart-empty"></i>'

    });
}