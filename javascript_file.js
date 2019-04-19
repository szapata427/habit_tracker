$(document).ready(function () {


// var newHabitName = document.getElementById("input-habitname")
// var submitNewHabit = document.getElementById("habit-submit")
// var submitNewHabit = document.getElementsByClassName("habit-form-submit-button")[0]



window.addEventListener("load", function() {
    // loaded
    fetch('http://localhost:3005/workouts', {
        method: 'get',
        headers: { 
        "Content-Type": "application/json",
        Accept: "applicatoin/json"
            }
    }).then(response => response.json())
    .then(data => {
       loadWorkouts(data)})
}, false);




function loadWorkouts(workouts) {
    console.log(workouts)
    let workoutRow = document.createElement("tr")
    let tableContainer = document.getElementById("table-workouts")

    
    tableContainer.appendChild(workoutRow)
    workouts.forEach(workout => {
        let workoutRow = document.createElement("tr")
        console.log(workout)
        workoutRow.innerHTML +=
        `<td class="workout-info-td">  ${workout.workoutname}</td>
        <td class="workout-info-td"> ${workout.muscle}</td>
        <td class="workout-info-td"> ${workout.secondaryMuscle != "null" ? workout.secondaryMuscle : "None" }</td>
        <td class="workout-info-td"> ${workout.sets}</td>
        <td class="workout-info-td"> ${workout.reps}</td>
        <td class="workout-info-td"> ${workout.workoutComment}</td>
        <td class="workout-info-td"> ${workout.workoutDate}</td>`

        tableContainer.appendChild(workoutRow)
    });



}

$("form").submit(function(event){
    event.preventDefault()
    // alert("Submitted");
    var namevalue = $("input[name=workoutname]").val()
    var muslcegroup = $("select[name=muscles]").val()
    var setsvalue = $("input[name=sets]").val()
    var repsvalue = $("input[name=reps]").val()
    var commentvalue = $("input[name=comment]").val()
    var secondaryMuscleValue = $("select[name=secondMuscles]").val()
    // var inputvalue = $("#input-habitname").val()


    var todaysDate = new Date()
    var dd = todaysDate.getDate()
    var mm = todaysDate.getMonth() 

    var yyyy = todaysDate.getFullYear();
    if (dd < 10) {
    dd = '0' + dd;
    } 
    if (mm < 10) {
    mm = '0' + mm;
    } 
    var todaysDate = mm + '/' + dd + '/' + yyyy;


    data = {
        workoutname: namevalue,
        muscle: muslcegroup,
        sets: setsvalue,
        reps: repsvalue,
        workoutComment: commentvalue,
        workoutDate : todaysDate,
        secondaryMuscle: secondaryMuscleValue

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
    <td class="workout-info-td"> ${workoutInfo.secondaryMuscle != "null" ? workoutInfo.secondaryMuscle : "None" }</td>
    <td class="workout-info-td"> ${workoutInfo.sets}</td>
    <td class="workout-info-td"> ${workoutInfo.reps}</td>
    <td class="workout-info-td"> ${workoutInfo.workoutComment}</td>
    <td class="workout-info-td"> ${workoutInfo.workoutDate}</td>`

    tableContainer.appendChild(workoutRow)

}



})


