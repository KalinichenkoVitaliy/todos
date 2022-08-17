// создаём и возвращаем заголовок приложения
function createAppTitle(title) {
  let appTitle = document.createElement('h2');
  appTitle.innerHTML = title;
  return appTitle;
};

// создаём и возвращаем форму для создания дела
function createTodoForm() {
  let form = document.createElement('form');
  let input = document.createElement('input');
  let buttonWrapper = document.createElement('div');
  let button = document.createElement('button');

  form.classList.add('input-group', 'mb-3');
  input.classList.add('form-control');
  input.placeholder = 'Введите название нового дела';
  buttonWrapper.classList.add('input-group-append');
  button.classList.add('btn', 'btn-primary');
  button.textContent = 'Добавить дело';

  buttonWrapper.append(button);
  form.append(input);
  form.append(buttonWrapper);

  return {
    form,
    input,
    button
  };
};

// создаём и возвращаем список элементов
function createTodoList() {
  let list = document.createElement('ul');
  list.classList.add('list-group');
  return list;
};

// создаём и возвращаем элемент списка элементов
function createTodoItemElement(todoItem, {onDone, onDelete}) {
  const doneClass = 'list-group-item-success';

  const item = document.createElement('li');
  // кнопки помещаем в элемент, который красиво их покажет в одной группе
  const buttonGroup = document.createElement('div');
  const doneButton = document.createElement('button');
  const deleteButton = document.createElement('button');

  // устанавливаем стили для элемента списка, а таже для размещения кнопок
  // в его правой части с помощью flex
  item.classList.add('listgroup-item', 'd-flex', 'justify-content-between', 'aling-items-center');
  if (todoItem.done) {
    item.classList.add(doneClass);
  }
  item.textContent = todoItem.name;

  buttonGroup.classList.add('btn-group', 'btn-group-sm');
  doneButton.classList.add('btn', 'btn-success');
  doneButton.textContent = 'Готово';
  deleteButton.classList.add('btn', 'btn-danger');
  deleteButton.textContent = 'Удалить';

  // добавляем обработчики на кнопки
  doneButton.addEventListener('click', () => {
    onDone(todoItem);
    item.classList.toggle(doneClass, todoItem.done);
  });
  deleteButton.addEventListener('click', () => {
    onDelete({todoItem, element: item});
  });

  // вкладываем кнопки в отдельный элемент, чтобы они объединились в один блок
  buttonGroup.append(doneButton);
  buttonGroup.append(deleteButton);
  item.append(buttonGroup);

  return item;
}

async function createTodoApp(container, {
  title = 'Список дел',
  owner,
  todoItemList = [],
  onCreateFormSubmit,
  onDoneClick,
  onDeleteClick
}) {
  const todoAppTitle = createAppTitle(title);
  const todoForm = createTodoForm();
  const todoList = createTodoList();
  const handlers = {onDone: onDoneClick, onDelete: onDeleteClick};

  container.append(todoAppTitle);
  container.append(todoForm.form);
  container.append(todoList);

  // из полученных данных заполняем список задач на HTML-странице
  todoItemList.forEach(todoItem => {
    const todoItemElement = createTodoItemElement(todoItem, handlers);
    todoList.append(todoItemElement);
  });

  // браузер создаёт событие submit на форме по нажатию Enter или на кнопку создания дела
  todoForm.form.addEventListener('submit', async e => {
    // эта строчка необходима, чтобы предотвратить стандартное действие браузера
    // в данном случае мы не хотим, чтобы страница перегружалась при отправке форомы
    e.preventDefault();

    // ингнорируем создание элемента, если пользователь ничего не ввёл в поле
    if (!todoForm.input.value.trim()) {
      return;
    }

    // запись дела в файл на сервере
    const todoItem = await onCreateFormSubmit({owner, name: todoForm.input.value.trim()});

    // создаём новое дело
    const todoItemElement = createTodoItemElement(todoItem, handlers);

    // добавляем в список новое дело
    todoList.append(todoItemElement);

    // обнуляем поля формы, чтобы не пришлось их стирать вручную
    e.target.reset();
  });
};

// Регистрируем функцию createTodoApp в глобальной объекте window,
// чтобы получить к ней доступ из других скриптов
export {createTodoApp};
