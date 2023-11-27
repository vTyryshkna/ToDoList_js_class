const keyLS = 'to-do list';
let listTaskLS = [];

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
        listTaskLS.push(valueElement);
        taskList.saveData(keyLS, listTaskLS);

        //создание кнопок управления
        const nameTaskNow = newItem.value;
        const controlButtons = new ControlButtons(nameTaskNow);
        const newIcons_edit = controlButtons.createdElmImg("../to-do_list_class/img/edit.png", "edit", newItem, newTask, controlButtons);
        newTask.appendChild(newIcons_edit);

        
        const newIcons_save = controlButtons.createdElmImg("../to-do_list_class/img/save.png", "save", newItem, newTask, controlButtons);
        newTask.appendChild(newIcons_save);

        
        const newIcons_ready = controlButtons.createdElmImg("../to-do_list_class/img/task_icon.png", "completed", newItem, newTask, controlButtons);
        newTask.appendChild(newIcons_ready);

        
        const newIcons_delete = controlButtons.createdElmImg("../to-do_list_class/img/delete.png", "delete", newItem, newTask, controlButtons);
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

    saveData (key, arrLS) {
        localStorage.setItem(key, JSON.stringify(arrLS));
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
        switch(typeButton){
            case 'edit': 
                img.onclick = this.editText(img, item);
                break;
            case 'save':
                img.onclick = this.saveText(img, item, controlButtons);
                break;
            case 'completed':
                img.onclick = this.crossOutText(img, item);
                break;
            case 'delete':
                img.onclick = this.deleteText(img, task, item, controlButtons);
                break;
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
        });
    }

    saveText (icons_save, newItem, controlButtons) {
        icons_save.addEventListener('click', () => {
            if (this.name !== this.newName) {
                controlButtons.changeName(listTaskLS, this.name, this.newName);
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
            controlButtons.deleteTask(listTaskLS, newItem.value);
        });
    }

    deleteTask(arrLS, nameTask) {
        const newListTaskLS = [];
        arrLS.forEach(element => {
            if(element !== nameTask) {
                newListTaskLS.push(element);
            }
        });
        localStorage.setItem(keyLS, JSON.stringify(newListTaskLS));
        listTaskLS = newListTaskLS;
    }

    changeName(arrLS, nameTask, newName) {
        arrLS.forEach((element, i)=> {
            if (element === nameTask) {
                arrLS[i] = newName;
            }
        });
        localStorage.setItem(keyLS, JSON.stringify(arrLS));
    }
}

function EventListener (inputElement, listTasks) {
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
}

function showTask (listTasks) {
    const localStorageArr = JSON.parse(localStorage.getItem(keyLS));
    if (!!localStorageArr) {
        for(let i=0; i<localStorageArr.length; i++) {
            const toDoList = new ToDoListContainer("taskText");
            const newTask = toDoList.createdElmDiv("taskText");
            listTasks.appendChild(newTask);
            toDoList.callingToCreateASheet(localStorageArr[i], newTask);
        };
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const inputElement = document.querySelector('.input');
    const buttonElement = document.querySelector('.button');
    const listTasks = document.querySelector('.taskList');

    //showTask из LS
    showTask(listTasks);

    buttonElement.addEventListener("click", () => {
        EventListener(inputElement, listTasks)
    });

    buttonElement.removeEventListener("click", () => {
        EventListener(inputElement, listTasks)
    });
});