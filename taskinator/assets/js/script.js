var taskIdCounter = 0;

var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");
var pageContentEl = document.querySelector("#page-content");

var taskFormHandler = function(event){
    event.preventDefault();
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    //check if inputs are empty(validate)
    if(!taskNameInput||!taskTypeInput){
        alert("You need to fill out the task form!");
        return false;
    }
    //reset form fields for next tasks to be entered 
    // document.querySelector("input[name='task-name']").value ="";
    // document.querySelector("select[name='task-type']").selectedIndex=0; these codes do the same
    formEl.reset();

    //check if task is new or one being edited by seeing if it has a data-task-id attribute
    var isEdit = formEl.hasAttribute("data-task-id");
    if(isEdit){
        var taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput,taskTypeInput,taskId);
    } else{
    //package up data as an object
    var taskDataObj ={
        name:taskNameInput,
        type:taskTypeInput
    };

    createTaskEl(taskDataObj);
    // check if input values are empty strings
}
};

var createTaskEl = function(taskDataObj){  
//create list item
var listItemEl = document.createElement("li");
listItemEl.className = "task-item";
//add task id as a custom attribute
listItemEl.setAttribute("data-task-id", taskIdCounter);

//create div to hold task info and add to list item
//give it a class name
// add HTML content to div
var taskInfoEl = document.createElement("div");
taskInfoEl.className = "task-info";
taskInfoEl.innerHTML="<h3 class = 'task-name'>" + taskDataObj.name + "</h3><span class = 'task-type'>"+ taskDataObj.type + "</span>";
listItemEl.appendChild (taskInfoEl);

var taskActionsEl = createTaskActions(taskIdCounter);
listItemEl.appendChild(taskActionsEl);
//add entire list item to list
tasksToDoEl.appendChild(listItemEl);
//increase task counter for next unique id
taskIdCounter++;

};

var createTaskActions = function (taskId){
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";
    //create edit button
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute ("data-task-id",taskId);
    actionContainerEl.appendChild(editButtonEl);

    //create delete button
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);
    actionContainerEl.appendChild(deleteButtonEl);

    var statusSelectEl = document.createElement ("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name","status-change");
    statusSelectEl.setAttribute("data-task-id",taskId);
    actionContainerEl.appendChild(statusSelectEl);

    var statusChoices = ["To Do","In Progress","Completed"];
    for (var i=0; i< statusChoices.length; i++){
        //create option element
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value",statusChoices[i]);

        //append to select
        statusSelectEl.appendChild(statusOptionEl);
    }

    return actionContainerEl;

}


var taskButtonHandler = function(event){
    //get ta
    var targetEl = event.target;
    if (targetEl.matches(".edit-btn")) {
        console.log("edit", targetEl);
        var taskId = targetEl.getAttribute("data-task-id");
        editTask(taskId);
    }
    //edit button was clicked
    else if(targetEl.matches(".delete-btn")){
      //get the element's task id
      var taskId = targetEl.getAttribute("data-task-id");
      deleteTask(taskId);
    }
};
var editTask =function(taskId){
    //get task list item element
    var taskSelected = document.querySelector(".task-item[data-task-id=' "+ taskId + "']");
    //get content from task name and type
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    console.log(taskName);

    var taskType = taskSelected.querySelector("span.task-type").textContent;
    console.log(taskType);
    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value =taskType;
    document.querySelector("#save-task").textContent = "Save Task";
    formEl.setAttribute("data-task-id",taskId);
}
var deleteTask = function(taskId){
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    console.log(taskSelected);
};
pageContentEl.addEventListener("click",taskButtonHandler);