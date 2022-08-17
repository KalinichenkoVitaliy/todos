// Функция выбора места хранения данных
function getStorageType() {
  let storageType = localStorage.getItem('todoStorage');
  if (!storageType) {
    storageType = 'local';
    localStorage.setItem('todoStorage', storageType);
    localStorage.setItem('todoList', JSON.stringify([]));
  }
  return storageType;
};

// Функция изменение текста на элементах DOM в зависимости от типа хранилища
function changeInfoForStogare(storageType, storageButton, storageInfo) {
  if (storageType === 'local') {
    storageButton.textContent = 'Перейти на серверное хранилище';
    storageInfo.textContent = 'локальное хранилище';
  } else if (storageType === 'server') {
    storageButton.textContent = 'Перейти на локальное хранилище';
    storageInfo.textContent = 'серверное хранилище';
  }
};

// Функция обработки события на кнопке смены хранилища
function onStorageButtonClick(storageButton, storageInfo) {
  let storageType = getStorageType();
  // смена типа хранилища
  if (storageType === 'local') storageType = 'server';
  else if (storageType === 'server')  storageType = 'local';
  localStorage.setItem('todoStorage', storageType);
  // изменение текста на элементах DOM
  changeInfoForStogare(storageType, storageButton, storageInfo);
  // перезагрузка страницы
  location.reload();
};

// Функция инициализации работы с хранилищем
export function defineStorage() {
  // получение элементов DOM
  const storageButton = document.getElementById('storage-btn');
  const storageInfo = document.getElementById('storage-info');
  // получение типа хранилища
  const storageType = getStorageType();
  // изменение текста на элементах DOM
  changeInfoForStogare(storageType, storageButton, storageInfo);
  // задание обработчика кнопке смены хранилища
  storageButton.addEventListener('click', () => {
    onStorageButtonClick(storageButton, storageInfo);
  });
  return storageType;
};
