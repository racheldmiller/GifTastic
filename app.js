// TEST: What happens if I use $(document).ready(function() { up here?
$(document).ready(function() {
  // <!-------------------------------- READY, SET ... ----------------------------------->

  // Define 'TOPICS': Disney Villains
  var villains = [
    "jafar",
    "ursula",
    "yzma",
    "scar",
    "gaston",
    "hades",
    "iago",
    "maleficent",
    "ratcliffe",
    "shan yu"
  ];

  // Per acceptance criteria, images should start off with a still data-state.
  // Do I need to create a separate variable to represent that state?

  // create a function to dynamically create villain buttons
  function createButtons() {
    $(".villainButtons").empty(); // or should this exist outside of this function? Shouldn't be any buttons initially.
    for (var i = 0; i < villains.length; i++) {
      // generate buttons for each villain in my array
      var a = $("<button>");
      // add class
      a.addClass("villain"); // should consider renaming this b/c it can get confusing. How about... "evil"?
      // add data-attribute
      a.attr("data-name", villains[i]);
      // provide initial button text
      a.text(villains[i]);
      // add button to HTML
      $(".villainButtons").append(a);
    }
  }

  createButtons();

  $(".villainButtons").on("click", ".villain", function(event) {
    console.log("i am villain");
    console.log(event);
    console.log(event.target);
    var villainName = $(event.target).attr("data-name");
    console.log(villainName);

    showVillains(villainName);
  });

  // <!----------------------------------- ... EXECUTE! ------------------------------------->

  // create a function to show villains
  function showVillains(villain) {
    // should start off with no images
    $("#images").empty();

    // grab and store data-name property value from button
    // var villain = $(this).attr("data-name");

    // Store giphy API URL for villain images
    var queryURL =
      "https://api.giphy.com/v1/gifs/search?q=" +
      villain +
      "&api_key=7429ws6piuEB26imq9yjxJmwY4Tn7UEj";

    // Perform an AJAX method --> GET request to our queryURL
    $.ajax({
      url: queryURL,
      method: "GET"
    })

      // After the data from the AJAX request comes back
      .then(function(response) {
        console.log(queryURL); // to make sure it looks right
        console.log(response); // to make sure request comes back

        // store data from the AJAX request in the results variable
        var results = response.data;

        // create for loop to loop through each result item (use J b/c I is used above)
        for (var j = 0; j < results.length; j++) {
          // create and store an image tag
          var villainImage = $("<img>");

          // Set the src attribute of the image to a property pulled off the result item
          villainImage.attr("src", results[i].images.fixed_height.url);
          // .attr takes two arguments (seen in parenthesis): source, actual value of src

          // Prepend the villainImage to the HTML page in the "images" div
          $("#images").prepend(villainImage);
        }
      });
  }

  // Be able to search for more villains
  $("#gifsearch").on("click", function(event) {
    event.preventDefault();
    var villain = $(".form-control") // alternative: "input" (in this case)
      .val()
      .trim(); //will have to double-check this... doesn't look quite right
    // createButtons();

    // need to put this somewhere
    // showVillains();

    console.log("a button was clicked", villain);
    // <!----------------------------------- GIPHY STATE FUNCTIONALITY ------------------------------------->

    // need to figure out how to make this work
    // $("#images").on("click", function() {
    //   // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    //   var state = $(this).attr("data-state");

    //   if (state === "still") {
    //     $(this).attr("src", $(this).attr("data-animate"));
    //     $(this).attr("data-state", "animate");
    //   } else {
    //     $(this).attr("src", $(this).attr("data-still"));
    //     $(this).attr("data-state", "still");
    //   }
    // });

    // <!----------------------------------- LOCAL STORAGE / COOKIES  ------------------------------------->

    // if I'm feeling that adventurous
  });
});
