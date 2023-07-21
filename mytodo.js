'use strict';

const taskElement = document.querySelector('.list-container');
const newTaskInput = document.querySelector('.new-task-input');
const addBtn = document.querySelector('.btn__add');
const delBtn = document.querySelector('.bin-ico');

let taskCounter = 0;

const addTask = function () {
  const content = newTaskInput.value;
  newTaskInput.placeholder = 'What do you have to do?';
  if (!content) {
    newTaskInput.placeholder = 'Write your task here!';
    return;
  }
  taskCounter++;
  const newTaskRow = `<div class="list-row">
  <div class="list-content"> <div class="content"><input
  type="checkbox"
  class="custom-checkbox"
  id="cust-check-${taskCounter}"
  name="checkbox"
  value="yes"
  /><label for="cust-check-${taskCounter}"></label> <p>${content}</p></div></div></div>`;

  taskElement.insertAdjacentHTML('afterbegin', newTaskRow);
  newTaskInput.value = '';
};

const removeTask = function () {
  const rows = document.querySelectorAll('.list-row');
  const checkboxes = document.querySelectorAll('.custom-checkbox');

  let nothingToDelete = true;

  for (let i = 0; i < rows.length; i++) {
    if (checkboxes[i].checked) {
      rows[i].remove();
      nothingToDelete = false;
    }
    if (nothingToDelete) {
      newTaskInput.placeholder = 'Nothing to delete!';
      setTimeout(() => {
        newTaskInput.placeholder = 'What do you have to do?';
      }, 2000);
    }
  }
};

// another way
//     rows.forEach(function foo(e, i) {
//       checkboxes[i].checked
//         ? rows[i].remove()
//         : (newTaskInput.placeholder = 'Nothing to delete!');
//     });

addBtn.addEventListener('click', addTask);
delBtn.addEventListener('click', removeTask);
