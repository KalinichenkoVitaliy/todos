// Функция получения списка всех дел из локального хранилища
// если указан owner, то список будет отфильтрован по нему
export async function getTodoList(owner = '') {
  let todoList = JSON.parse(localStorage.getItem('todoList'));

  if (Array.isArray(todoList) && todoList.length > 0) {
    // если указан владелец списка
    if (owner) todoList = todoList.filter(toDo => toDo.owner === owner);
  }
  else todoList = [];
  return todoList;
};

// Функция записи дела в локальное хранилища
export async function createTodoItem({owner, name}) {
  // формирование объекта нового дела
  const newTodo = {
    owner,
    name,
    done: false,
    id: Date.now().toString()
  };
  // получение массива всех уже имеющихся дел и добавление к нему нового дела
  let todoListAll = await getTodoList();
  todoListAll.push(newTodo);
  // запись нового массива в локальное хранилище
  localStorage.setItem('todoList', JSON.stringify(todoListAll));
  //
  return newTodo;
};

// Функция переключения признака выполнения для указанного дела
export async function switchTodoItemDone(todoItem) {
  todoItem.done = !todoItem.done;
  // получение массива всех уже имеющихся дел и переключение признака выполнения дела
  const todoListAll = await getTodoList();
  const idx = todoListAll.findIndex(toDo => toDo.id === todoItem.id);
  // если нужный объект дела найден
  if (idx > -1) {
    // изменение его свойства
    todoListAll[idx].done = todoItem.done;
    // запись нового массива в локальное хранилище
    localStorage.setItem('todoList', JSON.stringify(todoListAll));
  }
};

// Функция удаления указанного дела
export async function deleteTodoItem({element, todoItem}) {
  if (!confirm('Вы уверены?')) {
    return;
  }
  element.remove();
  // получение массива всех уже имеющихся дел и удалеие дела с указанным id
  let todoListAll = await getTodoList();
  const idx = todoListAll.findIndex(toDo => toDo.id === todoItem.id);
  // если нужный объект дела найден
  if (idx > -1) {
    // удаление его из массива
    todoListAll.splice(idx, 1);
    // запись нового массива в локальное хранилище
    localStorage.setItem('todoList', JSON.stringify(todoListAll));
  }
};
