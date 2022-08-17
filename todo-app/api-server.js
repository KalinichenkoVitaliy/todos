// Функция получения списка всех дел
export async function getTodoList(owner) {
  const response = await fetch(`http://localhost:3000/api/todos?owner=${owner}`);
  return await response.json();
};

// Функция записи дела в файл на сервере
export async function createTodoItem({owner, name}) {
  const response = await fetch('http://localhost:3000/api/todos', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      name,
      owner
    })
  });
  return await response.json();
};

// Функция переключения признака выполнения для указанного дела
export async function switchTodoItemDone(todoItem) {
  todoItem.done = !todoItem.done;
  // не пишем await, т.к. нам не нужно ждать ответа об успешности записи
  fetch(`http://localhost:3000/api/todos/${todoItem.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({done: todoItem.done})
  });
};

// Функция удаления указанного дела
export async function deleteTodoItem({element, todoItem}) {
  if (!confirm('Вы уверены?')) {
    return;
  }
  element.remove();
  // не пишем await, т.к. нам не нужно ждать ответа об успешности записи
  fetch(`http://localhost:3000/api/todos/${todoItem.id}`, {
    method: 'DELETE'
  });
};