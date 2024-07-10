$(document).ready(function() {
    // Change the text of the paragraph when the button is clicked
    $("#myButton").click(function() {
        $("#myParagraph").text("So Beautiful!");
    });

    // Change the color of the paragraph when the mouse enters it
    $("#myParagraph").mouseenter(function() {
        $(this).css("color", "red");
    });

    // Change the color of the paragraph back when the mouse leaves it
    $("#myParagraph").mouseleave(function() {
        $(this).css("color", "black");
    });
});
