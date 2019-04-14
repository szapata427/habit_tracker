$(document).ready(function () {


// var newHabitName = document.getElementById("input-habitname")
// var submitNewHabit = document.getElementById("habit-submit")
// var submitNewHabit = document.getElementsByClassName("habit-form-submit-button")[0]


$("form").submit(function(event){
    event.preventDefault()
    // alert("Submitted");
    var namevalue = $("input[name=habitname]").val()
    var daysvalue = $("input[name=days]").val()
    var progressvalue = $("input[name=progress]").val()
    var reasonvalue = $("input[name=reason]").val()
    // var inputvalue = $("#input-habitname").val()
    console.log(event)
    console.log(namevalue)
  });



});