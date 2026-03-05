// База данных слов по категориям
const wordsDatabase = {
    animals: ['Собака', 'Кошка', 'Слон', 'Жираф', 'Тигр', 'Лев', 'Обезьяна', 'Зебра', 'Бегемот', 'Носорог'],
    food: ['Пицца', 'Бургер', 'Суши', 'Паста', 'Салат', 'Суп', 'Мороженое', 'Торт', 'Блины', 'Шоколад'],
    sport: ['Футбол', 'Баскетбол', 'Теннис', 'Плавание', 'Бег', 'Волейбол', 'Хоккей', 'Бокс', 'Гимнастика', 'Лыжи'],
    professions: ['Врач', 'Учитель', 'Пожарный', 'Полицейский', 'Программист', 'Строитель', 'Повар', 'Водитель', 'Художник', 'Музыкант'],
    travel: ['Самолет', 'Поезд', 'Отель', 'Пляж', 'Горы', 'Карта', 'Чемодан', 'Паспорт', 'Фотоаппарат', 'Экскурсия'],
    cinema: ['Фильм', 'Актер', 'Режиссер', 'Кинотеатр', 'Попкорн', 'Сценарий', 'Камера', 'Звезда', 'Премия', 'Драма']
};

// Состояние приложения
const appState = {
    selectedCategories: [],
    currentWords: [],
    currentWordIndex: 0,
    score: 0,
    timer: 60,
    timerInterval: null,
    gameActive: false,
    countdownActive: false
};

// DOM элементы
const screens = {
    categories: document.querySelector('.screen-categories'),
    game: document.querySelector('.screen-game')
};

const categoriesGrid = document.getElementById('categoriesGrid');
const startGameBtn = document.getElementById('startGameBtn');
const timerEl = document.getElementById('timer');
const scoreEl = document.getElementById('score');
const currentWordEl = document.getElementById('currentWord');
const countdownEl = document.getElementById('countdown');
const progressEl = document.getElementById('progress');
const wrongBtn = document.getElementById('wrongBtn');
const correctBtn = document.getElementById('correctBtn');
const resultsScreen = document.getElementById('resultsScreen');
const finalScoreEl = document.getElementById('finalScore');
const restartBtn = document.getElementById('restartBtn');

// Инициализация категорий
function initCategories() {
    const categories = [
        { id: 'animals', name: 'Животные', emoji: '🐾', color: '#FFEAA7' },
        { id: 'food', name: 'Еда', emoji: '🍽️', color: '#B4E4FF' },
        { id: 'sport', name: 'Спорт', emoji: '🏃', color: '#D0B7FF' },
        { id: 'professions', name: 'Профессии', emoji: '💼', color: '#FFB5B5' },
        { id: 'travel', name: 'Путешествия', emoji: '✈️', color: '#BFF0C2' },
        { id: 'cinema', name: 'Кино', emoji: '🎬', color: '#FBC8D5' }
    ];

    categoriesGrid.innerHTML = categories.map(cat => `
        <div class="category-card" data-category="${cat.id}">
            <div class="category-image" style="background-color: ${cat.color};">${cat.emoji}</div>
            <div class="category-info">
                <span class="category-name">${cat.name}</span>
                <label class="checkbox-label">
                    <input type="checkbox" class="checkbox" data-category="${cat.id}"> 
                    <span class="checkbox-custom"></span>
                </label>
            </div>
        </div>
    `).join('');

    // Добавляем обработчики для чекбоксов
    document.querySelectorAll('.checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', handleCategorySelect);
    });

    // Добавляем обработчик для карточек (клик по карточке тоже выбирает категорию)
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', (e) => {
            // Не переключаем, если клик был по чекбоксу (чтобы не было двойного срабатывания)
            if (!e.target.classList.contains('checkbox') && !e.target.classList.contains('checkbox-custom')) {
                const checkbox = card.querySelector('.checkbox');
                checkbox.checked = !checkbox.checked;
                // Триггерим событие change
                const event = new Event('change', { bubbles: true });
                checkbox.dispatchEvent(event);
            }
        });
    });
}

// Обработчик выбора категории
function handleCategorySelect(e) {
    const category = e.target.dataset.category;
    const card = e.target.closest('.category-card');
    
    if (e.target.checked) {
        if (!appState.selectedCategories.includes(category)) {
            appState.selectedCategories.push(category);
        }
        card.classList.add('selected');
    } else {
        appState.selectedCategories = appState.selectedCategories.filter(c => c !== category);
        card.classList.remove('selected');
    }

    // Активируем/деактивируем кнопку старта
    startGameBtn.disabled = appState.selectedCategories.length === 0;
}

// Сбор слов из выбранных категорий
function collectWords() {
    let words = [];
    appState.selectedCategories.forEach(category => {
        if (wordsDatabase[category]) {
            words = [...words, ...wordsDatabase[category]];
        }
    });
    
    // Перемешиваем слова
    return shuffleArray(words);
}

// Функция перемешивания массива
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Начало игры
function startGame() {
    if (appState.selectedCategories.length === 0) return;

    // Собираем слова
    appState.currentWords = collectWords();
    appState.currentWordIndex = 0;
    appState.score = 0;
    appState.timer = 60;
    appState.gameActive = false;
    
    // Обновляем UI
    updateScore();
    updateTimer();
    updateProgress();
    
    // Переключаем экран
    screens.categories.classList.remove('active');
    screens.game.classList.add('active');
    
    // Запускаем обратный отсчет
    startCountdown();
}

// Обратный отсчет 3-2-1
function startCountdown() {
    appState.countdownActive = true;
    let count = 3;
    countdownEl.textContent = count;
    countdownEl.classList.add('active');
    currentWordEl.textContent = '';
    
    const countdownInterval = setInterval(() => {
        count--;
        if (count > 0) {
            countdownEl.textContent = count;
        } else if (count === 0) {
            countdownEl.textContent = 'Старт!';
        } else {
            clearInterval(countdownInterval);
            countdownEl.classList.remove('active');
            appState.countdownActive = false;
            appState.gameActive = true;
            showNextWord();
            startTimer();
        }
    }, 1000);
}

// Таймер
function startTimer() {
    appState.timerInterval = setInterval(() => {
        if (appState.gameActive && appState.timer > 0) {
            appState.timer--;
            updateTimer();
            
            if (appState.timer === 0) {
                endGame();
            }
        }
    }, 1000);
}

// Обновление таймера
function updateTimer() {
    timerEl.textContent = appState.timer;
    
    // Красный цвет, если осталось мало времени
    if (appState.timer <= 10) {
        timerEl.style.color = '#ff4444';
    } else {
        timerEl.style.color = '#ffd700';
    }
}

// Обновление счета
function updateScore() {
    scoreEl.textContent = appState.score;
}

// Обновление прогресса
function updateProgress() {
    progressEl.textContent = `${appState.currentWordIndex}/${appState.currentWords.length}`;
}

// Показать следующее слово
function showNextWord() {
    if (!appState.gameActive) return;
    
    if (appState.currentWordIndex < appState.currentWords.length) {
        currentWordEl.textContent = appState.currentWords[appState.currentWordIndex];
        updateProgress();
    } else {
        // Слова закончились - перемешиваем и начинаем заново
        appState.currentWords = shuffleArray(appState.currentWords);
        appState.currentWordIndex = 0;
        currentWordEl.textContent = appState.currentWords[0];
        updateProgress();
    }
}

// Обработка правильного ответа
function handleCorrect() {
    if (!appState.gameActive || appState.countdownActive) return;
    
    appState.score++;
    appState.currentWordIndex++;
    updateScore();
    showNextWord();
    
    // Анимация на кнопке
    correctBtn.style.transform = 'scale(0.9)';
    setTimeout(() => {
        correctBtn.style.transform = '';
    }, 100);
}

// Обработка неправильного ответа
function handleWrong() {
    if (!appState.gameActive || appState.countdownActive) return;
    
    appState.currentWordIndex++;
    showNextWord();
    
    // Анимация на кнопке
    wrongBtn.style.transform = 'scale(0.9)';
    setTimeout(() => {
        wrongBtn.style.transform = '';
    }, 100);
}

// Завершение игры
function endGame() {
    appState.gameActive = false;
    clearInterval(appState.timerInterval);
    
    // Показываем экран результатов
    finalScoreEl.textContent = appState.score;
    
    // Выбираем сообщение в зависимости от результата
    const message = document.querySelector('.results-message');
    if (appState.score < 5) {
        message.textContent = 'Неплохо для начала!';
    } else if (appState.score < 10) {
        message.textContent = 'Хороший результат!';
    } else if (appState.score < 15) {
        message.textContent = 'Отлично! Ты в ударе!';
    } else {
        message.textContent = 'Невероятно! Ты чемпион! 🏆';
    }
    
    resultsScreen.classList.add('active');
}

// Перезапуск игры
function restartGame() {
    resultsScreen.classList.remove('active');
    screens.game.classList.remove('active');
    screens.categories.classList.add('active');
    
    // Сбрасываем выделение категорий
    document.querySelectorAll('.checkbox').forEach(checkbox => {
        checkbox.checked = false;
        checkbox.closest('.category-card').classList.remove('selected');
    });
    appState.selectedCategories = [];
    startGameBtn.disabled = true;
    
    // Очищаем таймер
    if (appState.timerInterval) {
        clearInterval(appState.timerInterval);
    }
}

// Инициализация обработчиков
function initEventListeners() {
    startGameBtn.addEventListener('click', startGame);
    wrongBtn.addEventListener('click', handleWrong);
    correctBtn.addEventListener('click', handleCorrect);
    restartBtn.addEventListener('click', restartGame);
    
    // Обработка клавиш для удобства на компьютере
    document.addEventListener('keydown', (e) => {
        if (!screens.game.classList.contains('active') || !appState.gameActive) return;
        
        if (e.key === 'ArrowLeft' || e.key === 'x' || e.key === 'X') {
            handleWrong();
        } else if (e.key === 'ArrowRight' || e.key === 'c' || e.key === 'C') {
            handleCorrect();
        }
    });
}

// Запуск приложения
function init() {
    initCategories();
    initEventListeners();
}

// Запускаем
init();