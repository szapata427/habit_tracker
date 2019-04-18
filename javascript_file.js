$(document).ready(function () {


// var newHabitName = document.getElementById("input-habitname")
// var submitNewHabit = document.getElementById("habit-submit")
// var submitNewHabit = document.getElementsByClassName("habit-form-submit-button")[0]


function showHabit() {
    console.log("showing new habit")
}


$("form").submit(function(event){
    event.preventDefault()
    // alert("Submitted");
    var namevalue = $("input[name=workoutname]").val()
    var muslcegroup = $("select[name=muscles]").val()
    var setsvalue = $("input[name=sets]").val()
    var repsvalue = $("input[name=reps]").val()
    var commentvalue = $("input[name=comment]").val()
    // var inputvalue = $("#input-habitname").val()

    data = {
        workoutname: namevalue,
        muscle: muslcegroup,
        sets: setsvalue,
        reps: repsvalue,
        workout_comment: commentvalue

    }
   
    fetch('http://localhost:3005/workouts', {
        method: 'post',
        headers: { 
        "Content-Type": "application/json",
        Accept: "applicatoin/json"
            },
            
            body: JSON.stringify(data)
    }).then(response => response.json())
    .then(data => {
        createdWorkout(data)})

    
})

function createdWorkout(workoutInfo) {
    console.log(workoutInfo)
    // let indivWorkoutDiv = document.getElementsByClassName("individual-workout")
    
    let workoutRow = document.createElement("tr")
    let tableContainer = document.getElementById("table-workouts")
    
    tableContainer.appendChild(workoutRow)
    workoutRow.innerHTML = 
    `<td class="workout-info-td">  ${workoutInfo.workoutname}</td>
    <td class="workout-info-td"> ${workoutInfo.muscle}</td>
    <td class="workout-info-td"> ${workoutInfo.sets}</td>
    <td class="workout-info-td"> ${workoutInfo.reps}</td>
    <td class="workout-info-td"> ${workoutInfo.workoutcomment}</td>`

    tableContainer.appendChild(workoutRow)

}



})


