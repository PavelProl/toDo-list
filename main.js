// находим форму
const form = document.getElementById("addForm");
// находим список
const itemsList = document.getElementById("items");
// находим фильтр
const filter = document.getElementById("filter");

// получаем данные из localStorage при перезагрузке страницы
const itemsArray = JSON.parse(localStorage.getItem("items")) || [];

/* или поподробнее
const itemsArray = localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")) : [];
*/

// Выводим содержимое localStorage на страницу при ее обновлении
itemsArray.forEach(item => {
    elementMaker(item)
})

// --------------- Прослушки событий ---------------
// Добавление новой задачи
form.addEventListener("submit", addItem);
// Удаление элемента
itemsList.addEventListener("click", removeItem);
// Фильтрация списка дел
filter.addEventListener("keyup", filterItems);

// ------------------- Функции ---------------------
// Функция создания элемента для новой задачи
function elementMaker(text) {
    // создаем "li", задаем класс и помещаем внутрь li текст
    const newElement = document.createElement("li");
    newElement.className = "list-group-item";
    newElement.textContent = text;
    
    // создаем кнопку "удалить"
    const deleteBtn = document.createElement("button");
    deleteBtn.appendChild(document.createTextNode("Удалить"));
    deleteBtn.className = "btn btn-light btn-sm float-right";
    deleteBtn.dataset.action = "delete";

    // добавляем кнопку "удалить" к элементу "li" наверх списка
    newElement.appendChild(deleteBtn);
    itemsList.prepend(newElement);
        
}

// Функция добавления новой задачи
function addItem(e) {
    // отмена стандартного поведения формы
    e.preventDefault();
    // Находим инпут с текстом для новой задачи, получаем текст из импута и очищаем поле добавления новой задачи
    const newItemInput = document.getElementById("newItemText");
    const newItemText = newItemInput.value;
    newItemInput.value = "";
    
    // помещаем в хранилище добавленную задачу
    itemsArray.push(newItemText);
    localStorage.setItem("items", JSON.stringify(itemsArray));

    // помещаем созданную задачу на страницу
    elementMaker(newItemText);
}

// Удаление элемента - функция
function removeItem(e) {
    if (
        e.target.getAttribute("data-action") == "delete"
    ) {
        if (confirm("Удалить задачу?")) {
            // удаляем родителя, то есть li
            e.target.parentNode.remove();

            // Обновляем локальное хранилище
            // определяем индекс удаленного элемента
            const deleteItemIndex = itemsArray.findIndex((item) => {
                return item === e.target.parentNode.firstChild.textContent;
            })
            // вырезаем элемент из массива localStorage по индексу
            itemsArray.splice(deleteItemIndex, 1);
            // обновляем массив локального хранилища
            localItemsArray = JSON.stringify(itemsArray);
            localStorage.setItem("items", localItemsArray);
        }
    }
}

// Фильтрация списка дел ф-я
function filterItems(e) {
    // Получаем фразу для поиска и переводим ее в нижний регистр
    const searchedText = e.target.value.toLowerCase();
    // Получаем список всех задач
    const items = itemsList.querySelectorAll("li");
    // Перебираем циклом все найденные теги li с задачами
    items.forEach(function(item) {
        // Проверяем вхождение искомой подстроки в текст задачи и если вхождение есть - показываем элемент с задачей, иначе - скрываем элемент с задачей
        const itemText = item.firstChild.textContent.toLowerCase();
        if (itemText.indexOf(searchedText) != -1) {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    });
}
