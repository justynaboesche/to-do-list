{
    const tasks = [];

    const addNewTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent,
        });
        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks[taskIndex].done = !tasks[taskIndex].done;
        render();
    };

    const removeTask = (taskIndex) => {
        tasks.splice(taskIndex, 1);
        render();
    };

    const bindToggleDoneEvents = () => {
        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, taskIndex) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(taskIndex);
            });
        });
    };

    const bindRemoveEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, taskIndex) => {
            removeButton.addEventListener("click", () => {
                removeTask(taskIndex);
            });
        });
    };

    const render = () => {
        let listOfTasksHTMLContent = "";

        for (const task of tasks) {
            listOfTasksHTMLContent += `
                <li
                  class="tasks__item js-task"
                >
                  <button class="tasks__button tasks__button--done js-done">
                    ${task.done ? "✓" : ""}
                  </button>
                  <span class="tasks__content${task.done ? " tasks__content--done" : ""}">
                    ${task.content}
                  </span> 
                  <button class="tasks__button tasks__button--remove js-remove">
                    🗑
                  </button>
                </li>
              `;
            }

            document.querySelector(".js-tasks").innerHTML = listOfTasksHTMLContent;

            bindToggleDoneEvents();
            bindRemoveEvents();
        };

        const onformdSubmit = (event) => {
            event.preventDefault();

            const newTaskElement = document.querySelector(".js-newTask")
            const newTaskContent = newTaskElement.value.trim();

            if (newTaskContent !== "") {
                addNewTask(newTaskContent);
                newTaskElement.value = "";
            }

            newTaskElement.focus();
        };

        const init = () => {
            render();

            const form = document.querySelector(".js-form");
            form.addEventListener("submit", onformdSubmit);
        };

        init();
    }

