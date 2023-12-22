const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list");
const undoButton = document.querySelector("button:nth-child(3)");

const taskStore = [];
const tasks = [];

function Addtask() {
    if (inputBox.value === '') {
        alert("Type something before adding!");
    } else {
        taskStore.push(listContainer.innerHTML);
        taskStore.push("add");
        tasks.push(inputBox.value);

        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData();
}

function undoTask() {
    if (taskStore.length > 0) {
        const lastOperation = taskStore.pop();
        if (lastOperation === "add") {
            tasks.pop();
            listContainer.lastElementChild.remove();
        } else if (lastOperation === "remove") {
            const taskText = taskStore.pop();
            let li = document.createElement("li");
            li.innerHTML = taskText;
            listContainer.appendChild(li);
            let span = document.createElement("span");
            span.innerHTML = "\u00d7";
            li.appendChild(span);
        }
        saveData();
    }
}

inputBox.addEventListener('keyup', function (e) {
    if (e.key === 'Enter') {
        Addtask();
    }
});

listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        taskStore.push(e.target.parentElement.innerText);
        taskStore.push("remove");
        saveData();
    }
}, false);

undoButton.addEventListener('click', undoTask);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}

showTask();
