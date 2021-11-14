

var formEl = document.querySelector("#task-form");
var taskIdCounter = 0;
var taskToDoEl= document.querySelector("#tasks-to-do");

var taskFormHandler = function(event) {
    event.preventDefault();
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
    if (!taskNameInput || !taskTypeInput) {
      alert("You need to fill out the task form!");
      return false;
    }
    formEl.reset()
    //package data as an object to pass to createTaskEl function
    var taskDataObj = {
      name: taskNameInput,
      type: taskTypeInput
    };
    //send as argument to createTaskEl
    createTaskEl(taskDataObj)
  };

var createTaskEl = function(taskDataObj) {
  //create list item
  var listItemEl = document.createElement("li");
  //class name for li element
    listItemEl.className="task-item";

    listItemEl.setAttribute('data-task-id', taskIdCounter);
  //create div to hold task info and add to list item
  var taskInfoEl = document.createElement("div");
  //give it a class name
  taskInfoEl.className="task-info";
  //add HTML content to div
  taskInfoEl.innerHTML = "<h3 class = 'task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";  
  listItemEl.appendChild(taskInfoEl)
  //append li to ul
var taskActionsEl = createTaskActions(taskIdCounter);
listItemEl.appendChild(taskActionsEl);

taskToDoEl.appendChild(listItemEl);

  taskToDoEl.appendChild(listItemEl);
  //increase task counter for next unique id
  taskIdCounter++;
};

var createTaskActions = function(taskId) {
var actionContainerEl = document.createElement("div");
actionContainerEl.className = "task-actions";
//create edit button
var editButtonEl = document.createElement("button");
editButtonEl.textContent="Edit";
editButtonEl.className = "btn edit-btn";
editButtonEl.setAttribute("data-task-id", taskId);

actionContainerEl.appendChild(editButtonEl);

//create delete button
var deleteButtonEl = document.createElement("button");
deleteButtonEl.textContent = "Delete";
deleteButtonEl.className = "btn delete-btn";
deleteButtonEl.setAttribute("data-task-id", taskId);

actionContainerEl.appendChild(deleteButtonEl);

var statusSelectEl = document.createElement("select");
statusSelectEl.className = "select-status";
statusSelectEl.setAttribute("name", "status-change");
statusSelectEl.setAttribute("data-task-id", taskId);

actionContainerEl.appendChild(statusSelectEl);

var statusChoices = ["To Do", "In Progress", "Completed"];
for (var i = 0; i < statusChoices.length; i++) {
  // create option element
  var statusOptionEl = document.createElement("option");
  statusOptionEl.textContent = statusChoices[i];
  statusOptionEl.setAttribute=("value", statusChoices[i]);

  statusSelectEl.appendChild(statusOptionEl);
}

return actionContainerEl;
};
formEl.addEventListener("submit", taskFormHandler); 
  