const tagCSS = "text-decoration";
const styleCSS_forText = "line-through";

class ToDoList {

    createdElmDiv (classNameString) {
        const divObject = document.createElement("div");
        divObject.className = classNameString;

        return divObject;
    }
}

class TaskList {

    createdElmTask (name, typeAtribute, valueAtribute, editingAccess) {
        const task = document.createElement("input");
        task.className = name;
        task.type = typeAtribute;
        task.value = valueAtribute;
        task.disabled = editingAccess;

        return task;
    }
}

class ControlButtons {

    createdElmImg (path, typeButton, item, task) {
        const img = document.createElement("img");
        img.src = path;
        if (typeButton === "edit") {//переделать на switch/case
            img.onclick = this.editText(img, item);
        }
        else if (typeButton === "save") {
            img.onclick = this.saveText(img, item);
        } 
        else if (typeButton === "completed") {
            img.onclick = this.crossOutText(img, item);
        }
        else if (typeButton === "delete") {
            img.onclick = this.deleteText(img, task);
        }

        return img;
    }

    //ФУНКЦИИ
    editText (icons_edit, newItem) {
        icons_edit.addEventListener('click', () => {
            newItem.disabled = "";
            newItem.focus();
        });
    }

    saveText (icons_save, newItem) {
        icons_save.addEventListener('click', () => {
            newItem.disabled = "disabled";
            newItem.value = newItem.value;
        });
    }

    crossOutText (icons_ready, newItem){
        icons_ready.addEventListener('click', () => {
            if (newItem.style.textDecoration === styleCSS_forText) {
                newItem.style.removeProperty(tagCSS);
            } else {
                newItem.style.setProperty(tagCSS, styleCSS_forText);
            }
        });
    }

    deleteText (icons_delete, newTask) {
        icons_delete.addEventListener('click', () => {
            newTask.remove();
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const inputElement = document.querySelector('.input');
    const buttonElement = document.querySelector('.button');
    const listTasks = document.querySelector('.taskList');

    buttonElement.addEventListener("click", () => {
        if (inputElement.value === "") {
            inputElement.style.borderColor = "#800000";
            alert("You didn't fill in this field!");
        } 
        else {
            //контейнер для текста
            const toDoList = new ToDoList("taskText");
            const newTask = toDoList.createdElmDiv("taskText");
            listTasks.appendChild(newTask);

            //создание задания
            const taskList = new TaskList("task", "text", inputElement.value, "disabled");
            const newItem = taskList.createdElmTask("task", "text", inputElement.value, "disabled");
            newTask.appendChild(newItem);

            //создание кнопок управления
            const controlButtons = new ControlButtons();
            const newIcons_edit = controlButtons.createdElmImg("../to-do list/img/edit.png", "edit", newItem, newTask);
            newTask.appendChild(newIcons_edit);

            
            const newIcons_save = controlButtons.createdElmImg("../to-do list/img/save.png", "save", newItem, newTask);
            newTask.appendChild(newIcons_save);

            
            const newIcons_ready = controlButtons.createdElmImg("../to-do list/img/task_icon.png", "completed", newItem, newTask);
            newTask.appendChild(newIcons_ready);

            
            const newIcons_delete = controlButtons.createdElmImg("../to-do list/img/delete.png", "delete", newItem, newTask);
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
            const toDoList = new ToDoList("taskText");
            const newTask = toDoList.createdElmDiv("taskText");
            listTasks.appendChild(newTask);

            //создание задания
            const taskList = new TaskList("task", "text", inputElement.value, "disabled");
            const newItem = taskList.createdElmTask("task", "text", inputElement.value, "disabled");
            newTask.appendChild(newItem);

            //создание кнопок управления
            const controlButtons = new ControlButtons();
            const newIcons_edit = controlButtons.createdElmImg("../to-do list/img/edit.png", "edit", newItem, newTask);
            newTask.appendChild(newIcons_edit);

            
            const newIcons_save = controlButtons.createdElmImg("../to-do list/img/save.png", "save", newItem, newTask);
            newTask.appendChild(newIcons_save);

            
            const newIcons_ready = controlButtons.createdElmImg("../to-do list/img/task_icon.png", "completed", newItem, newTask);
            newTask.appendChild(newIcons_ready);

            
            const newIcons_delete = controlButtons.createdElmImg("../to-do list/img/delete.png", "delete", newItem, newTask);
            newTask.appendChild(newIcons_delete);

            //отчистим input
            inputElement.value = "";
        }
    });
});