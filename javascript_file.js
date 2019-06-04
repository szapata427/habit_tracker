// $(document).ready(function () {
document.addEventListener('DOMContentLoaded', () => {



// window.addEventListener("load", function() {
    
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
// }, false);




    document.addEventListener('submit', (e) => {
        e.preventDefault()
        console.log(e.target.className)
        if (e.target.className == "repsform") {

            let weight = e.target.children.Weight.value
            let reps = e.target.children.Reps.value
            
            let workoutId = e.target.children.Weight.dataset.workout
            let weightSet = e.target.children.Weight.dataset.set
            let weightRep = e.target.children.Weight.dataset.rep
            
            let resultweightsubmit = document.getElementById(`form-${weightSet}-${workoutId}`)
            console.log(`set-rep-submit-${weightSet}-${workoutId}`)
            
            let weightshowing = document.getElementById(`weight-result-${weightSet}-${workoutId}`)
            let repshowing = document.getElementById(`rep-result-${weightSet}-${workoutId}`)
            
            if (!weightshowing) {
                let weightResult = document.createElement('span')
                weightResult.setAttribute('id', `weight-result-${weightSet}-${workoutId}`)
                weightResult.setAttribute('class', `show-result-span`)
                weightResult.innerHTML = weight
                resultweightsubmit.append(weightResult)
            }
            
            else {
                weightshowing.innerHTML = weight
            }
            
            if (!repshowing) {
                let represult = document.createElement('span')
                represult.setAttribute('id', `rep-result-${weightSet}-${workoutId}`)
                represult.setAttribute('class', `show-result-span`)
                represult.innerHTML = reps
                resultweightsubmit.append(represult)
            }
            
            else {
                repshowing.innerHTML = reps
            }
            let setsrepspost = {
                setnumber: weightSet,
                weights: weight, 
                reps: reps, 
                workoutid: workoutId
            }
            fetch('http://localhost:3005/setsreps', {
                method: 'post',
                headers: { 
                "Content-Type": "application/json",
                Accept: "application/json"
                    },
                    
                    body: JSON.stringify(setsrepspost)
            }).then(response => response.json())
            .then(data => {
                console.log(data)})
            
        }
        

        else if (e.target.className == "create_workout-form") {
        console.log("create workout form ", e)
    // alert("Submitted");
    var namevalue = $("input[name=workoutname]").val()
    var muslcegroup = $("select[name=muscles]").val()
    var setsvalue = $("input[name=sets]").val()
    var repsvalue = $("input[name=reps]").val()
    var commentvalue = $("input[name=comment]").val()
    var secondaryMuscleValue = $("select[name=secondMuscles]").val()
    // var inputvalue = $("#input-habitname").val()

    let setserrorMessage = document.getElementsByClassName('empty-set-input')
    let repsserrorMessage = document.getElementsByClassName('empty-reps-input')

    if (setserrorMessage.length > 0 && setsvalue != "") {
        console.log("error message here")
        let setsTagerror = document.getElementById('sets-label')
        setsTagerror.removeChild(setsTagerror.firstElementChild)
    }
    else if (setsvalue == "" && setserrorMessage.length > 0 ){
        console.log("still empty!")
        return null

    }
    
    if (setsvalue == "" && setserrorMessage.length == 0) {
        console.log("cannout be empty")
        let setsTag = document.getElementById('sets-label')
        let emptySetsMessageTag = document.createElement('div')
        emptySetsMessageTag.setAttribute('class', 'empty-set-input')
        emptySetsMessageTag.innerHTML = 'Sets cannot be empty!'
        setsTag.appendChild(emptySetsMessageTag)

        return null
    }

    if (repsserrorMessage.length > 0 && repsvalue != "") {
        console.log("error message here")
        let repsTagerror = document.getElementById('reps-label')
        repsTagerror.removeChild(repsTagerror.firstElementChild)
    }
    else if (repsvalue == "" && repsserrorMessage.length > 0 ){
        console.log("still empty!")
        return null

    }
    
    
    if (repsvalue == "" && repsserrorMessage.length == 0) {
        console.log("cannout be empty")
        let setsTag = document.getElementById('reps-label')
        let emptyRepsMessageTag = document.createElement('div')
        emptyRepsMessageTag.setAttribute('class', 'empty-reps-input')
        emptyRepsMessageTag.innerHTML = 'Reps cannot be empty!'
        setsTag.appendChild(emptyRepsMessageTag)

        return null
    }


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
        Accept: "application/json"
            },
            
            body: JSON.stringify(data)
    }).then(response => response.json())
    .then(data => {
        console.log(data)
        createdWorkout(data), addSetsInput(data)})

        }
        })

    })
    



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
        <td  data="${workout._id}" class="workout-info-td"> ${workout.muscle}</td>
        <td  data="${workout._id}" class="workout-info-td"> ${workout.secondaryMuscle != "null" ? workout.secondaryMuscle : "None" }</td>
        <td  data="${workout._id}" class="workout-info-td"> ${workout.sets}</td>
        <td  data="${workout._id}" class="workout-info-td"> ${workout.reps}</td>
        <td  data="${workout._id}" class="workout-info-td"> ${workout.workoutComment}</td>
        <td  data="${workout._id}" class="workout-info-td"> ${workout.workoutDate}</td>
        <button  data="${workout._id}"  class="delete-workout-button" type="button" >Delete</button>`

        tableContainer.appendChild(workoutRow)
        addSetsInput(workout)
    });

    fetch('http://localhost:3005/setsreps')
    .then(response => response.json())
    .then(data => loadSetsReps(data))



}

const loadSetsReps = (data) => {
    console.log(data)
    for(const repset in data) {
        let weightSet =  data[repset].weights
        let workoutId =  data[repset].workoutid
        console.log(weightSet)
        // let resultweightsubmit = document.getElementById(`form-${weightSet}-${workoutId}`)

    }
}




function addSetsInput(workoutInfo) {
    console.log(workoutInfo)
    let workoutRow = document.getElementById(`workout-tr-${workoutInfo._id}`)

    let workoutValuesInput = document.createElement('div')
    let setsrepsform = document.createElement('form')

    setsrepsform.setAttribute('class', 'repssetsform')
    for(i = 0; i <workoutInfo.sets; i++) {
        
        workoutValuesInput.setAttribute("id", `div-workout-inputs-${workoutInfo._id}`)
        workoutValuesInput.setAttribute("class", `div-workout-container-sets-reps-input`)
        workoutValuesInput.innerHTML += 
        `
        <div data="${workoutInfo._id}" class="div-individual-workout-sets-reps">
        <form class="repsform" id="form-${i+1}-${workoutInfo._id}" >
        Weight<input class="weight-input" type="number" name="Weight" data-workout="${workoutInfo._id}" data-set="${i+1}" data-rep="${i+1}" id="set-${i + 1}-${workoutInfo._id}">
        Reps<input class="reps-input" type="number" name="Reps" data-workout="${workoutInfo._id}" id="reps-${i + 1}-${workoutInfo._id}">
        <input type="submit" class="weight-reps-submit-button" data-workout="${workoutInfo._id}" id="set-rep-submit-${i + 1}-${workoutInfo._id}"></input>
        </form>
        </div>`
        
        // workoutRow.appendChild(workoutValuesInput)
        $(workoutRow).after(workoutValuesInput)
    }

   
}

function clearWorkoutInput() {
    let workoutInputs = document.getElementsByClassName('create-workout-input')
  for(i = 0; i < workoutInputs.length; i++) {
      workoutInputs[i].value = ''
  }
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

    clearWorkoutInput()
}


$(".create_workout-form").submit(function(event){

    event.preventDefault()
    console.log("create workout form ", event)
    // alert("Submitted");
    var namevalue = $("input[name=workoutname]").val()
    var muslcegroup = $("select[name=muscles]").val()
    var setsvalue = $("input[name=sets]").val()
    var repsvalue = $("input[name=reps]").val()
    var commentvalue = $("input[name=comment]").val()
    var secondaryMuscleValue = $("select[name=secondMuscles]").val()
    // var inputvalue = $("#input-habitname").val()

    let setserrorMessage = document.getElementsByClassName('empty-set-input')
    let repsserrorMessage = document.getElementsByClassName('empty-reps-input')

    if (setserrorMessage.length > 0 && setsvalue != "") {
        console.log("error message here")
        let setsTagerror = document.getElementById('sets-label')
        setsTagerror.removeChild(setsTagerror.firstElementChild)
    }
    else if (setsvalue == "" && setserrorMessage.length > 0 ){
        console.log("still empty!")
        return null

    }
    
    if (setsvalue == "" && setserrorMessage.length == 0) {
        console.log("cannout be empty")
        let setsTag = document.getElementById('sets-label')
        let emptySetsMessageTag = document.createElement('div')
        emptySetsMessageTag.setAttribute('class', 'empty-set-input')
        emptySetsMessageTag.innerHTML = 'Sets cannot be empty!'
        setsTag.appendChild(emptySetsMessageTag)

        return null
    }

    if (repsserrorMessage.length > 0 && repsvalue != "") {
        console.log("error message here")
        let repsTagerror = document.getElementById('reps-label')
        repsTagerror.removeChild(repsTagerror.firstElementChild)
    }
    else if (repsvalue == "" && repsserrorMessage.length > 0 ){
        console.log("still empty!")
        return null

    }
    
    
    if (repsvalue == "" && repsserrorMessage.length == 0) {
        console.log("cannout be empty")
        let setsTag = document.getElementById('reps-label')
        let emptyRepsMessageTag = document.createElement('div')
        emptyRepsMessageTag.setAttribute('class', 'empty-reps-input')
        emptyRepsMessageTag.innerHTML = 'Reps cannot be empty!'
        setsTag.appendChild(emptyRepsMessageTag)

        return null
    }


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
        Accept: "application/json"
            },
            
            body: JSON.stringify(data)
    }).then(response => response.json())
    .then(data => {
        createdWorkout(data), addSetsInput(data)})

    
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


//post to setsreps database

// function setsrepsToDataBase(data) {
//     console.log(data)
//     let totalSets = parseInt(data.sets)
//     let workoutId = data._id
//     for (var i = 0; i < totalSets; i++) {

//         let postData = {
//         setnumber: i,
//         weight: null,
//         reps: null,
//         workoutid: workoutId
//     }

// }



function deleteWorkout(id) {
    console.log(id)
    let deleteWorkoutInputs = document.getElementById(`div-workout-inputs-${id}`)
    let tagToDelete = document.getElementById(`workout-tr-${id}`)
    tagToDelete.parentNode.removeChild(tagToDelete);
    deleteWorkoutInputs.parentNode.removeChild(deleteWorkoutInputs);
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




// document.addEventListener('click', (e) => {
    //     e.preventDefault()
    // console.log(e.target.form)
    // // if (e.target.className == "weight-input") {
        // //     console.log(e.target.value)
        // // }
        // })
        
        
        







