const inputElement = document.querySelector('.input');
const buttonElement = document.querySelector('.button');
const listTasks = document.querySelector('.taskList');
const tagCSS = "text-decoration";
const styleCSS_forText = "line-through";

class AddToDoList {

    constructor (containerName) {
        this.createdElmDiv(containerName);
    } 

    createdElmDiv (classNameString) {
        const divObject = document.createElement("div");
        divObject.className = classNameString;

        return divObject;
    }
}

class AddTaskList {

    constructor (name, typeAtribute, valueAtribute, editingAccess) {
        this.createdElmTask(name, typeAtribute, valueAtribute, editingAccess);
    }

    createdElmTask (name, typeAtribute, valueAtribute, editingAccess) {
        const task = document.createElement("input");
        task.className = name;
        task.type = typeAtribute;
        task.value = valueAtribute;
        task.disabled = editingAccess;

        return task;
    }
}

class AddControlButtons {

    constructor (path, typeButton, item, task) {
        this.createdElmImg(path, typeButton, item, task);
    }
    createdElmImg (path, typeButton, item, task) {
        const img = document.createElement("img");
        img.src = path;
        if (typeButton === "edit") {
            img.onclick = editText(img, item);
        }
        else if (typeButton === "save") {
            img.onclick = saveText(img, item);
        } 
        else if (typeButton === "completed") {
            img.onclick = crossOutText(img, item);
        }
        else if (typeButton === "delete") {
            img.onclick = deleteText(img, task);
        }

        return img;
    }
}

buttonElement.addEventListener("click", () => {
    if (inputElement.value === "") {
        inputElement.style.borderColor = "#800000";
        alert("You didn't fill in this field!");
    } 
    else {
        //контейнер для текста
        let newTask = new AddToDoList("taskText");
        newTask = newTask.createdElmDiv("taskText");
        listTasks.appendChild(newTask);

        //создание задания
        let newItem = new AddTaskList("task", "text", inputElement.value, "disabled");
        newItem = newItem.createdElmTask("task", "text", inputElement.value, "disabled");
        newTask.appendChild(newItem);

        //создание кнопок управления
        let newIcons_edit = new AddControlButtons("../to-do list/img/edit.png", "edit", newItem, newTask);
        newIcons_edit = newIcons_edit.createdElmImg("../to-do list/img/edit.png", "edit", newItem, newTask);
        newTask.appendChild(newIcons_edit);

        let newIcons_save = new AddControlButtons("../to-do list/img/save.png", "save", newItem, newTask);
        newIcons_save = newIcons_save.createdElmImg("../to-do list/img/save.png", "save", newItem, newTask);
        newTask.appendChild(newIcons_save);

        let newIcons_ready = new AddControlButtons("../to-do list/img/task_icon.png", "completed", newItem, newTask);
        newIcons_ready = newIcons_ready.createdElmImg("../to-do list/img/task_icon.png", "completed", newItem, newTask);
        newTask.appendChild(newIcons_ready);

        let newIcons_delete = new AddControlButtons("../to-do list/img/delete.png", "delete", newItem, newTask);
        newIcons_delete = newIcons_delete.createdElmImg("../to-do list/img/delete.png", "delete", newItem, newTask);
        newTask.appendChild(newIcons_delete);

        //отчистим input
        inputElement.value = "";
    }
});

buttonElement.removeEventListener("click", () => {
    if (inputElement.value === "") {
        inputElement.style.borderColor = "#800000";
        alert("You didn't fill in this field!");
    } 
    else {
        //контейнер для текста
        let newTask = new AddToDoList("taskText");
        newTask = newTask.createdElmDiv("taskText");
        listTasks.appendChild(newTask);

        //создание задания
        let newItem = new AddTaskList("task", "text", inputElement.value, "disabled");
        newItem = newItem.createdElmTask("task", "text", inputElement.value, "disabled");
        newTask.appendChild(newItem);

        //создание кнопок управления
        let newIcons_edit = new AddControlButtons("../to-do list/img/edit.png", "edit", newItem, newTask);
        newIcons_edit = newIcons_edit.createdElmImg("../to-do list/img/edit.png", "edit", newItem, newTask);
        newTask.appendChild(newIcons_edit);

        let newIcons_save = new AddControlButtons("../to-do list/img/save.png", "save", newItem, newTask);
        newIcons_save = newIcons_save.createdElmImg("../to-do list/img/save.png", "save", newItem, newTask);
        newTask.appendChild(newIcons_save);

        let newIcons_ready = new AddControlButtons("../to-do list/img/task_icon.png", "completed", newItem, newTask);
        newIcons_ready = newIcons_ready.createdElmImg("../to-do list/img/task_icon.png", "completed", newItem, newTask);
        newTask.appendChild(newIcons_ready);

        let newIcons_delete = new AddControlButtons("../to-do list/img/delete.png", "delete", newItem, newTask);
        newIcons_delete = newIcons_delete.createdElmImg("../to-do list/img/delete.png", "delete", newItem, newTask);
        newTask.appendChild(newIcons_delete);

        //отчистим input
        inputElement.value = "";
    }
});

//ФУНКЦИИ
function editText (icons_edit, newItem) {
    icons_edit.addEventListener('click', () => {
        newItem.disabled = "";
        newItem.focus();
    });
}

function saveText (icons_save, newItem) {
    icons_save.addEventListener('click', () => {
        newItem.disabled = "disabled";
        newItem.value = newItem.value;
    });
}

function crossOutText (icons_ready, newItem){
    icons_ready.addEventListener('click', () => {
        if (newItem.style.textDecoration === styleCSS_forText) {
            newItem.style.removeProperty(tagCSS);
        } else {
            newItem.style.setProperty(tagCSS, styleCSS_forText);
        }
    });
}

function deleteText (icons_delete, newTask) {
    icons_delete.addEventListener('click', () => {
        newTask.remove();
    });
}