

var formEl = document.querySelector("#task-form");
var taskIdCounter = 0;
var taskToDoEl= document.querySelector("#tasks-to-do");
var pageContentEl = document.querySelector("#page-content");
var taskInProgress = document.querySelector('#tasks-in-progress');
var taskCompleted = document.querySelector('#tasks-completed');

var taskFormHandler = function(event) {
    event.preventDefault();
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
    if (!taskNameInput || !taskTypeInput) {
      alert("You need to fill out the task form!");
      return false;
    }
    formEl.reset()

    var isEdit = formEl.hasAttribute("data-task-id");
    //has data attribute, so get task id and call function to compleyte edit process
    if (isEdit) {
      var taskId = formEl.getAttribute("data-task-id");
      completeEditTask(taskNameInput, taskTypeInput, taskId);
  
    
    }
    //no data attribute, so create object as normal and pass to createTaskEl function
    else {
    var taskDataObj = {
      name: taskNameInput,
      type: taskTypeInput
    
    };
    //send as argument to createTaskEl
    createTaskEl(taskDataObj);
  }
};

var completeEditTask = function(taskName, taskType, taskId) {
  //find matching task list item
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId +"']");
  //set new values;
  taskSelected.querySelector("h3.task-name").textContent = taskName;
  taskSelected.querySelector("span.task-type").textContent = taskType;

  alert("Task Updated!");

  formEl.removeAttribute("data-task-id");
  document.querySelector("#save-task").textContent = "Add Task";
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

var taskButtonHandler = function(event) {
  //console.log(event.target);
var targetEl = event.target;
  //edit bitton was clicked
  if (targetEl.matches(".edit-btn")) {
    var taskId = targetEl.getAttribute("data-task-id");
    editTask(taskId);
  }
  //delete button is clicked
  else if (event.target.matches(".delete-btn")) {
    var taskId = event.target.getAttribute("data-task-id");
    deleteTask(taskId);
  }
};

var deleteTask = function(taskId) {
  var taskSelected = document.querySelector(".task-item[data-task-id='"+taskId+"']");
  taskSelected.remove();
  
};

var editTask = function(taskId) {
// get task list item element
  var taskSelected = document.querySelector(".task-item[data-task-id='"+taskId+"']");
  // get content from task name and type
  var taskName = taskSelected.querySelector("h3.task-name").textContent;
  document.querySelector("input[name='task-name']").value = taskName;
  
  var taskType = taskSelected.querySelector("span.task-type").textContent;
  document.querySelector("select[name='task-type']").value = taskType;

  document.querySelector("#save-task").textContent = "Save Task";

  formEl.setAttribute("data-task-id", taskId);

};

var taskStatusChangeHandler = function(event) {
  // get the task items id
  var taskId = event.target.getAttribute("data-task-id");

  //get the currently selectde options value and convert to lowercase
  var statusValue  = event.target.value.toLowerCase();

  //find the parent task item element based on the id
  var taskSelected = document.querySelector(".task-item[data-task-id='"+ taskId + "']");

  if (statusValue === "to do") {
    taskToDoEl.appendChild(taskSelected);
  }
  else if (statusValue === "in progress") {
    taskInProgress.appendChild(taskSelected);
  }
  else if (statusValue === "completed") {
    taskCompleted.appendChild(taskSelected);
  }
};

pageContentEl.addEventListener("click", taskButtonHandler);
pageContentEl.addEventListener("change", taskStatusChangeHandler);
