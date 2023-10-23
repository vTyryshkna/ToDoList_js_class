class ToDoListContainer {

    createdElmDiv (classNameString) {
        const divObject = document.createElement("div");
        divObject.className = classNameString;

        return divObject;
    }

    callingToCreateASheet (valueElement, newTask) {
        //создание задания
        const taskList = new TaskList("task", "text", valueElement, "disabled");
        const newItem = taskList.createdElmTask("task", "text", valueElement, "disabled");
        newTask.appendChild(newItem);
        //сохранение в LS
        taskList.saveData(valueElement);

        //создание кнопок управления
        const nameTaskNow = newItem.value;
        const controlButtons = new ControlButtons(nameTaskNow);
        const newIcons_edit = controlButtons.createdElmImg("../to-do list/img/edit.png", "edit", newItem, newTask, controlButtons);
        newTask.appendChild(newIcons_edit);

        
        const newIcons_save = controlButtons.createdElmImg("../to-do list/img/save.png", "save", newItem, newTask, controlButtons);
        newTask.appendChild(newIcons_save);

        
        const newIcons_ready = controlButtons.createdElmImg("../to-do list/img/task_icon.png", "completed", newItem, newTask, controlButtons);
        newTask.appendChild(newIcons_ready);

        
        const newIcons_delete = controlButtons.createdElmImg("../to-do list/img/delete.png", "delete", newItem, newTask, controlButtons);
        newTask.appendChild(newIcons_delete);
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

    saveData (data) {
        localStorage.setItem(data, data);
    }
}

class ControlButtons {

    constructor(nameTaskNow) {
        this.name = nameTaskNow;
        this.newName = "";
    }

    createdElmImg (path, typeButton, item, task, controlButtons) {
        const img = document.createElement("img");
        img.src = path;
        if (typeButton === "edit") {//переделать на switch/case
            img.onclick = this.editText(img, item);
        }
        else if (typeButton === "save") {
            img.onclick = this.saveText(img, item, controlButtons);
        } 
        else if (typeButton === "completed") {
            img.onclick = this.crossOutText(img, item);
        }
        else if (typeButton === "delete") {
            img.onclick = this.deleteText(img, task, item, controlButtons);
        }

        return img;
    }

    //ФУНКЦИИ
    editText (icons_edit, newItem) {
        icons_edit.addEventListener('click', () => {
            newItem.disabled = false;
            newItem.focus();
        });
        newItem.addEventListener('blur', () => {
            this.newName = newItem.value;
            newItem.value = this.name;
            console.log('blur this: ', this.newName);
            console.log('blur: ', newItem.value);
        });
    }

    saveText (icons_save, newItem, controlButtons) {
        icons_save.addEventListener('click', () => {
            if (this.name !== this.newName) {
                console.log('зашли в save');
                controlButtons.changeName(this.name, this.newName);
                newItem.value = this.newName;
                this.name = this.newName;
            }
        });
    }

    crossOutText (icons_ready, newItem){
        icons_ready.addEventListener('click', () => {
            const styleCSS_forText = "line-through";
            const tagCSS = "text-decoration";
            if (newItem.style.textDecoration === styleCSS_forText) {
                newItem.style.removeProperty(tagCSS);
            } else {
                newItem.style.setProperty(tagCSS, styleCSS_forText);
            }
        });
    }

    deleteText (icons_delete, newTask, newItem, controlButtons) {
        icons_delete.addEventListener('click', () => {
            newTask.remove();
            controlButtons.deleteTask(newItem.value);
        });
    }

    deleteTask(nameTask) {
        for(let i=0; i<localStorage.length; i++) {
            let key = localStorage.key(i);
            if (key === nameTask) {
                localStorage.removeItem(key);
            }
        }
    }

    changeName(nameTask, newName) {
        for(let i=0; i<localStorage.length; i++) {
            let key = localStorage.key(i);
            if (key === nameTask) {
                localStorage.removeItem(key);
                localStorage.setItem(newName, newName);
            }
        }
    }
}

function showTask (listTasks) {
    for(let i=0; i<localStorage.length; i++) {
        let key = localStorage.key(i);
        const toDoList = new ToDoListContainer("taskText");
        const newTask = toDoList.createdElmDiv("taskText");
        listTasks.appendChild(newTask);
        toDoList.callingToCreateASheet(localStorage.getItem(key), newTask);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const inputElement = document.querySelector('.input');
    const buttonElement = document.querySelector('.button');
    const listTasks = document.querySelector('.taskList');

    //showTask из LS
    showTask(listTasks);

    buttonElement.addEventListener("click", () => {
        if (inputElement.value === "") {
            inputElement.style.borderColor = "#800000";
            alert("You didn't fill in this field!");
        } 
        else {
            //контейнер для текста
            const toDoList = new ToDoListContainer("taskText");
            const newTask = toDoList.createdElmDiv("taskText");
            listTasks.appendChild(newTask);
            toDoList.callingToCreateASheet(inputElement.value, newTask);
        }

        //отчистим input
        inputElement.value = "";
    });

    buttonElement.removeEventListener("click", () => {
        if (inputElement.value === "") {
            inputElement.style.borderColor = "#800000";
            alert("You didn't fill in this field!");
        } 
        else {
            //контейнер для текста
            const toDoList = new ToDoListContainer("taskText");
            const newTask = toDoList.createdElmDiv("taskText");
            listTasks.appendChild(newTask);
            toDoList.callingToCreateASheet(inputElement.value, newTask);
        }

        //отчистим input
        inputElement.value = "";
    });
});