const addTaskbtn = document.getElementById("addtask")
const btnText = addTaskbtn.innerText;
const usernameTextField = document.getElementById("username")
const Uname = document.getElementById("Uname")
let recordsDisplay = document.getElementById("todo-lane")
let userArray = [];
let edit_id = null

let objstr = localStorage.getItem('users')
console.log("objstr", objstr);

if (objstr != null) {
    userArray = JSON.parse(objstr)
}


// userArray = JSON.parse(objstr)
console.log("usearry------", userArray);
addTaskbtn.onclick = () => {
    const name = usernameTextField.value
    const tUname = Uname.value
    console.log("uname", tUname);
    if (edit_id != null) {

        userArray.splice(edit_id, 1, { 'name': name, 'uname': tUname })
        edit_id = null

    } else {

        userArray.push({ 'name': name, 'uname': tUname });
    }
    // console.log("name", name);
    // console.log("usdeArray", userArray);
    SaveInfo(userArray);
    usernameTextField.value = ' ';
    Uname.value = ''

    addTaskbtn.innerText = btnText

}

const SaveInfo = (userArray) => {
    let str = JSON.stringify(userArray)
    console.log("str", str);
    localStorage.setItem('users', str)
    DisplayInfo();


}
const DisplayInfo = () => {

    let satement = '';
    userArray.forEach((user, i) => {
        satement += ` 
            <div class="task is-dragging" draggable="true">
               <tr>
                    <h5 class="card-title">${user.uname}</h5>
                    <p class="card-text">${user.name}</p>   
                    <td><i class="btn text-white fa fa-edit btn-info mx-2"  onclick='EditInfo(  ${i})'></i> <i class="btn btn-danger text-white fa fa-trash" onclick='DeleteInfo(${i})'></i></td>
                 </tr>
          </div>`
    })
    recordsDisplay.innerHTML = satement;

}
DisplayInfo();


const EditInfo = (id) => {
    console.log("i id", id);
    edit_id = id;

    usernameTextField.value = userArray[id].name
    Uname.value = userArray[id].uname
    addTaskbtn.innerText = "Update"

}
const DeleteInfo = (id) => {
    console.log("d id", id);
    userArray.splice(id, 1)
    SaveInfo(userArray);
    DisplayInfo();


}


const draggables = document.querySelectorAll(".task");
const droppables = document.querySelectorAll(".swim-lane");

draggables.forEach((task) => {
    task.addEventListener("dragstart", () => {
        task.classList.add("is-dragging");
        console.log(":taslk",task);
    });
    task.addEventListener("dragend", () => {
        task.classList.remove("is-dragging");
    });
});

droppables.forEach((zone) => {
    zone.addEventListener("dragover", (e) => {
        e.preventDefault();

        const bottomTask = insertAboveTask(zone, e.clientY);
        const curTask = document.querySelector(".is-dragging");
        console.log("curTask",curTask);

        if (!bottomTask) {
            zone.appendChild(curTask);
        } else {
            zone.insertBefore(curTask, bottomTask);
        }
    });
});

const insertAboveTask = (zone, mouseY) => {
    const els = zone.querySelectorAll(".task:not(.is-dragging)");

    let closestTask = null;
    let closestOffset = Number.NEGATIVE_INFINITY;

    els.forEach((task) => {
        const { top } = task.getBoundingClientRect();

        const offset = mouseY - top;

        if (offset < 0 && offset > closestOffset) {
            closestOffset = offset;
            closestTask = task;
        }
    });

    return closestTask;
};


