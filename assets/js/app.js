let app = {
    
    init: function() {
        console.log('Méthode init');
        app.bindTasksEvents();
        app.bindAddTaskEvent();
    },

    bindAddTaskEvent: function() {
        let addTaskFormElement = document.querySelector('.task--add form');

        //add event listener on form submit
        addTaskFormElement.addEventListener('submit',app.handleAddTaskFormSubmit);
    },

    handleAddTaskFormSubmit: function(evt) {
        console.log('handleAddTaskFormSubmit');

        // see changes without page reloading
        evt.preventDefault();

        // Create new task from task template 
        let newTaskTemplateElement = document.getElementById('task-template');
        console.log('newTaskTemplateElement : ',newTaskTemplateElement);
        let newTaskElement = newTaskTemplateElement.content.cloneNode(true);

        console.log('newTaskElement : ',newTaskElement);


        let formElement = evt.currentTarget;
        let newTaskValue = formElement.querySelector('.task__name-edit').value;

        console.log('newTaskValue : ',newTaskValue);

        // Edit task name
        newTaskElement.querySelector('.task__name-display').textContent = newTaskValue;
        newTaskElement.querySelector('.task__name-edit').value = newTaskValue;

        console.log('newTaskElement : ',newTaskElement);

        // Edit task category
        let newTaskCategoryValue = formElement.querySelector('.task__category select').value;
        console.log('newTaskCategoryValue : ',newTaskCategoryValue);
        // use dataset : https://developer.mozilla.org/fr/docs/Web/API/HTMLElement/dataset
        newTaskElement.querySelector('.task').dataset.category = newTaskCategoryValue;
        newTaskElement.querySelector('.task__category p').textContent = newTaskCategoryValue;

        // Add new task to the DOM
        let tasksContainer = document.querySelector('.tasks');
        tasksContainer.prepend(newTaskElement);
    },


    /*ADD EVENT LISTENER 
    TO ALL TASKS*/

    bindTasksEvents: function () {
        // Select all tasks
        let existingTasks = document.querySelectorAll('.tasks .task:not(.task--add)');

        for (let i = 0; i < existingTasks.length ; i++) {
            app.bindSingleTaskEvents(existingTasks[i]);
        }
    },

    /* EVENT LISTENER LOADED ON SINGLE TASK */
   
    bindSingleTaskEvents: function(singleTaskElement) {
        let taskTitleElement = singleTaskElement.querySelector('.task__name-display');
        taskTitleElement.addEventListener('click',app.handleClickOnTaskTitle);

        // Add event listener on title input
        let taskInputElement = singleTaskElement.querySelector('.task__name-edit');
        taskInputElement.addEventListener('blur',app.handleTaskTitle);
        taskInputElement.addEventListener('keydown',app.handleTaskTitleEnterKey);

        let taskCompleteButtonElement = 
            singleTaskElement.querySelector('.task__button--validate');

        console.log('Task Complete Button : ',taskCompleteButtonElement);

        taskCompleteButtonElement.addEventListener('click',app.handleCompleteButtonClick);
    },

    handleCompleteButtonClick: function(evt) {
        console.log('handleCompleteButtonClick');

        let taskCompleteButtonElement = evt.currentTarget;
        console.log(taskCompleteButtonElement);

        // change display when a task is loaded
        let taskElement = taskCompleteButtonElement.closest('.task');
        console.log(taskElement);
       
        taskElement.classList.replace('task--todo','task--complete');
        // replace =
        // taskElement.classList.remove('task--todo');
        // taskElement.classList.add('task--complete');
    },

    handleTaskTitleEnterKey: function(evt) {
        console.log('Je suis dans handleTaskTitleEnterKey');

        // Make sure to press enter button
        if (evt.key == 'Enter') {
            app.handleTaskTitle(evt);
        }
    },

    handleTaskTitle: function(evt) {
        console.log('Je suis dans handleTaskTitle');

        // On récupère l'élément input à l'origine de l'évènement
        let taskInputElement = evt.currentTarget;

        // On récupère la valeur de l'input
        let taskTitleValue = taskInputElement.value;

        // On cache l'input et on réaffiche le titre
        let taskElement = taskInputElement.closest('.task');
        taskElement.classList.remove('task--edit');

        // On récupère l'élément contenant le titre (balise <p>)
        // https://developer.mozilla.org/en-US/docs/Web/API/NonDocumentTypeChildNode/previousElementSibling
        let taskTitleElement = taskInputElement.previousElementSibling;
        // On modifie le contenu de la balise <p>
        taskTitleElement.textContent = taskTitleValue;
    },

    handleClickOnTaskTitle: function(evt) {
        console.log('Je suis dans handleClickOnTaskTitle');
        let taskTitleElement = evt.currentTarget;

        console.log(evt);
        console.log(taskTitleElement);

        // Load task element from taskTitleElement
        let taskElement = taskTitleElement.closest('.task');
        taskElement.classList.add('task--edit');

        // Add focus
        let taskInputElement = taskElement.querySelector('.task__name-edit');
        taskInputElement.focus();
    }
};

document.addEventListener('DOMContentLoaded',app.init);