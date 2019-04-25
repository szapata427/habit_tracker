// $(document).ready(function () {
document.addEventListener('DOMContentLoaded', () => {


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
       loadWorkouts(data),
       findTagToBeDeleted()})
}, false);





function loadWorkouts(workouts) {
    console.log(workouts)
    let workoutRow = document.createElement("tr")
    let tableContainer = document.getElementById("table-workouts")

    
    tableContainer.appendChild(workoutRow)
    workouts.forEach(workout => {
        let workoutRow = document.createElement("tr")
        workoutRow.setAttribute("id", `workout-tr-${workout._id}`)
        console.log(workout)
        workoutRow.innerHTML +=
        `<td  data="${workout._id}" class="workout-info-td">  ${workout.workoutname}</td>
        <td  data="${workout._id}" class="workout-info-td"> ${workout.muscle}</td>git 
        <td  data="${workout._id}" class="workout-info-td"> ${workout.secondaryMuscle != "null" ? workout.secondaryMuscle : "None" }</td>
        <td  data="${workout._id}" class="workout-info-td"> ${workout.sets}</td>
        <td  data="${workout._id}" class="workout-info-td"> ${workout.reps}</td>
        <td  data="${workout._id}" class="workout-info-td"> ${workout.workoutComment}</td>
        <td  data="${workout._id}" class="workout-info-td"> ${workout.workoutDate}</td>
        <button  data="${workout._id}"  class="delete-workout-button" type="button" >Delete</button>`

        tableContainer.appendChild(workoutRow)
    });



}

function createdWorkout(workoutInfo) {
    console.log(workoutInfo)
    // let indivWorkoutDiv = document.getElementsByClassName("individual-workout")
    
    let workoutRow = document.createElement("tr")
    let tableContainer = document.getElementById("table-workouts")

    
    
    tableContainer.appendChild(workoutRow)
    workoutRow.setAttribute("id", `workout-tr-${workoutInfo._id}`)

    workoutRow.innerHTML = 
    `<td class="workout-info-td">  ${workoutInfo.workoutname}</td>
    <td class="workout-info-td"> ${workoutInfo.muscle}</td>
    <td class="workout-info-td"> ${workoutInfo.secondaryMuscle != "null" ? workoutInfo.secondaryMuscle : "None" }</td>
    <td class="workout-info-td"> ${workoutInfo.sets}</td>
    <td class="workout-info-td"> ${workoutInfo.reps}</td>
    <td class="workout-info-td"> ${workoutInfo.workoutComment}</td>
    <td class="workout-info-td"> ${workoutInfo.workoutDate}</td>
    <button id=workout-id-${workoutInfo._id}"  class="delete-workout-button" type="button" onclick="deleteWorkout(${workoutInfo._id})">Delete</button>`


    tableContainer.appendChild(workoutRow)

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




function findTagToBeDeleted() {
var deleteButtons = document.getElementsByClassName("delete-workout-button")
for (let i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener("click", function(event) {
        console.log("hitting the event", event.target)
        let deleteData = event.target.getAttribute("data");
        deleteWorkout(deleteData)
})

}
}

function deleteWorkout(id) {
    let tagToDelete = document.getElementById(`workout-tr-${id}`)
    tagToDelete.parentNode. removeChild(tagToDelete);
    deleteWorkoutDatabase(id)
}

function deleteWorkoutDatabase(id) {
    let delete_data = {
        "id": id
    }
    fetch(`http://localhost:3005/workouts/${id}`, {
        method: "Delete",
        headers: {
        "Content-Type": "application/json",
        Accept: "applicatoin/json"
        },
        body: JSON.stringify(delete_data)
    }).then(response => response.json())
    .then(data => {
        console.log(data)
    }
    )
}

})


