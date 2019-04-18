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
    var reasonvalue = $("textarea[name=reason]").val()
    // var inputvalue = $("#input-habitname").val()

    data = {
        habit_name: namevalue,
        days: daysvalue,
        reason: reasonvalue,
        progress: progressvalue

    }

    console.log(data)
   
    fetch('http://localhost:3005/habits', {
        method: 'post',
        headers: { 
        "Content-Type": "application/json",
        Accept: "applicatoin/json"
            },
            
            body: JSON.stringify(data)
    }).then(response => response.json())
    .then(data => {
        console.log(data)})
})

})