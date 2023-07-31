'use strict';

function onPageLoaded() {
  const newTaskInput = document.querySelector('.new-task-input');
  const ul = document.querySelector('.todos');
  const btnAdd = document.querySelector('.btn__add');
  const btnSave = document.querySelector('.btn__save');
  const btnClear = document.querySelector('.btn__clear');

  function addTask() {
    if (!newTaskInput.value) {
      newTaskInput.placeholder = 'Write your task here!';
      return;
    }
    newTaskInput.placeholder = 'What do you have to do?';
    const li = document.createElement('li');
    li.classList.add('li');
    const container = document.createElement('div');
    container.classList.add('list-row');

    const textDiv = document.createElement('div');
    textDiv.classList.add('todo-text');
    const newTask = newTaskInput.value;
    textDiv.append(newTask);

    const delBtn = document.createElement('div');
    delBtn.classList.add('todo-trash');
    const icon = document.createElement('img');
    icon.classList.add('bin-ico');
    icon.src = '/my-todo/bin.png';
    delBtn.appendChild(icon);

    container.append(textDiv, delBtn);
    li.appendChild(container);
    ul.appendChild(li);
    ul.insertBefore(li, ul.firstChild);
    newTaskInput.value = '';

    listenDelTask(delBtn);
  }

  function listenDelTask(btn) {
    btn.addEventListener('click', event => {
      const container = btn.parentElement.parentElement;
      container.remove();
      event.stopPropagation();
    });
  }

  btnAdd.addEventListener('click', addTask);

  newTaskInput.addEventListener('keypress', keyPressed => {
    const keyEnter = 13;
    if (keyPressed.which == keyEnter) {
      addTask();
    }
  });

  function onClickTask(event) {
    if (event.target.classList.contains('todo-text')) {
      event.target.classList.toggle('checked');
    }
  }

  ul.addEventListener('click', onClickTask);

  btnSave.addEventListener('click', () => {
    localStorage.setItem('todos', ul.innerHTML);
    newTaskInput.placeholder = 'Saved!';
    setTimeout(() => {
      newTaskInput.placeholder = 'Write your task here!';
    }, 2000);
  });
  btnClear.addEventListener('click', () => {
    ul.innerHTML = '';
    localStorage.removeItem('todos');
    newTaskInput.placeholder = 'Cleared!';
    setTimeout(() => {
      newTaskInput.placeholder = 'Write your task here!';
    }, 2000);
  });

  function loadData() {
    const data = localStorage.getItem('todos');
    if (data) {
      ul.innerHTML = data;
    }
    const delBtns = document.querySelectorAll('.todo-trash');
    for (let btn of delBtns) {
      listenDelTask(btn);
    }
  }
  loadData();
}

document.addEventListener('DOMContentLoaded', onPageLoaded);
