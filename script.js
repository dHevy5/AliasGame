// База данных слов по категориям
const wordsDatabase = {
    animals: ['Собака', 'Кошка', 'Слон', 'Жираф', 'Тигр', 'Лев', 'Обезьяна', 'Зебра', 'Бегемот', 'Носорог', 'Крокодил',
         'Белка', 'Ёжик', 'Волк', 'Лиса', 'Медведь', 'Заяц', 'Кенгуру', 'Панда', 'Дельфин', 'Акула', 'Кит', 'Пингвин', 'Страус',
        'Попугай', 'Воробей', 'Сова', 'Лось', 'Олень', 'Верблюд', 'Черепаха', 'Змея', 'Ящерица', 'Оса', 'Пчела', 'Муравей', 'Комар',
           'Осьминог', 'Медуза', 'Лягушка', 'Жаба', 'Рыба', 'Карась', 'Щука', 'Кит', 'Креветка', 'Рак', 'Краб', 'Утка', 'Гусь',
            'Курица', 'Петух', 'Цыплёнок', 'Индюк', 'Коза', 'Козёл', 'Овца', 'Баран', 'Корова', 'Бык', 'Лошадь', 'Конь', 'Пони', 
            'Свинья', 'Кабан', 'Хомяк', 'Крыса', 'Мышь', 'Морская свинка', 'Шиншилла', 'Кролик', 'Тушканчик', 'Бурундук', 'Енот', 'Бобр',
             'Выдра', 'Норка', 'Соболь', 'Куница', 'Рысь', 'Леопард', 'Гепард', 'Ягуар', 'Барс', 'Пума', 'Манул', 'Гиена', 'Шакал', 'Песец',
              'Овцебык', 'Зубр', 'Бизон', 'Лама', 'Альпака', 'Муравьед', 'Броненосец', 'Ленивец', 'Дикобраз', 'Выхухоль', 'Утконос', 'Ехидна',
               'Опоссум', 'Коала', 'Вомбат', 'Тасманийский дьявол', 'Казуар', 'Фламинго', 'Пеликан', 'Аист', 'Цапля', 'Журавль', 'Лебедь', 'Голубь',
                'Ворона', 'Галка', 'Грач', 'Сорока', 'Дятел', 'Кукушка', 'Соловей', 'Ласточка', 'Стриж', 'Чайка', 'Альбатрос', 'Баклан', 'Сокол',
                 'Ястреб', 'Орёл', 'Гриф', 'Коршун', 'Филин', 'Сыч', 'Попугай ара', 'Какаду', 'Колибри', 'Страус', 'Нанду', 'Киви (птица)', 'Пиранья',
                  'Сом', 'Окунь', 'Камбала', 'Скат', 'Мурена', 'Барракуда', 'Тунец', 'Лосось', 'Форель', 'Карп', 'Золотая рыбка', 'Меченосец', 'Гуппи',
                   'Аксолотль', 'Тритон', 'Саламандра', 'Хамелеон', 'Варан', 'Геккон', 'Удав', 'Питон', 'Кобра', 'Гадюка', 'Уж', 'Анаконда', 'Кайман',
                    'Аллигатор', 'Игуана', 'Черепаха красноухая', 'Квакша', 'Древесная лягушка', 'Сверчок', 'Кузнечик', 'Стрекоза', 'Божья коровка',
                     'Бабочка', 'Мотылёк', 'Моль', 'Таракан', 'Паук', 'Скорпион', 'Клещ', 'Многоножка', 'Дождевой червь', 'Пиявка', 'Устрица', 'Мидия',
                      'Жемчужница', 'Морской ёж', 'Морская звезда', 'Коралл (животное)', 'Актиния', 'Губка', 'Инфузория', 'Амёба', 'Блоха', 'Майский жук',
                       'Колорадский жук', 'Клоп', 'Светлячок', 'Муха', 'Овод', 'Слепень', 'Шмель', 'Оса', 'Шершень', 'Термит'],
    food: ['Пицца', 'Бургер', 'Суши', 'Паста', 'Салат', 'Суп', 'Мороженое', 'Торт', 'Блины', 'Шоколад'],
    sport: ['Футбол', 'Баскетбол', 'Теннис', 'Плавание', 'Бег', 'Волейбол', 'Хоккей', 'Бокс', 'Гимнастика', 'Лыжи'],
    professions: ['Врач', 'Учитель', 'Пожарный', 'Полицейский', 'Программист', 'Строитель', 'Повар', 'Водитель', 'Художник', 'Музыкант'],
    travel: ['Самолет', 'Поезд', 'Отель', 'Пляж', 'Горы', 'Карта', 'Чемодан', 'Паспорт', 'Фотоаппарат', 'Экскурсия'],
    cinema: ['Фильм', 'Актер', 'Режиссер', 'Кинотеатр', 'Попкорн', 'Сценарий', 'Камера', 'Звезда', 'Премия', 'Драма']
};


let canClick = true;

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

function setVH() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    
    document.querySelectorAll('.screen').forEach(screen => {
        screen.style.height = `calc(var(--vh, 1vh) * 100)`;
    });
}

// Вызываем при загрузке
window.addEventListener('resize', setVH);
window.addEventListener('orientationchange', setVH);
setVH();

// Инициализация категорий
function initCategories() {
    const categories = [
        { id: 'animals', name: 'Животные', emoji: '🐾', color: '#FFEAA7', words: 20 },
        { id: 'food', name: 'Еда', emoji: '🍽️', color: '#B4E4FF', words: 20 },
        { id: 'sport', name: 'Спорт', emoji: '🏃', color: '#D0B7FF', words: 20 },
        { id: 'professions', name: 'Профессии', emoji: '💼', color: '#FFB5B5', words: 20 },
        { id: 'travel', name: 'Путешествия', emoji: '✈️', color: '#BFF0C2', words: 20 },
        { id: 'cinema', name: 'Кино', emoji: '🎬', color: '#FBC8D5', words: 20 }
    ];

    categoriesGrid.innerHTML = categories.map(cat => `
        <div class="category-card" data-category="${cat.id}">
            <div class="category-image" style="background-color: ${cat.color};">${cat.emoji}</div>
            <div class="category-info">
                <div class="category-name-wrapper">
                    <span class="category-name">${cat.name}</span>
                    <span class="category-words-count">${cat.words} слов</span>
                </div>
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

    if (window.countdownInterval) {
        clearInterval(window.countdownInterval);
    }
    
    window.countdownInterval = setInterval(() => {
        count--;
        if (count > 0) {
            countdownEl.textContent = count;
        } else if (count === 0) {
            countdownEl.textContent = 'Старт!';
        } else {
            clearInterval(window.countdownInterval);
            window.countdownInterval = null;
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
    if (!appState.gameActive || appState.countdownActive || !canClick) return;

    canClick = false;
    
    appState.score++;
    appState.currentWordIndex++;
    updateScore();
    showNextWord();
    
    // Анимация на кнопке
    correctBtn.style.transform = 'scale(0.9)';
    setTimeout(() => {
        correctBtn.style.transform = '';
    }, 100);

    setTimeout(() => {
        canClick = true;
    }, 300);
}

// Обработка неправильного ответа
function handleWrong() {
    if (!appState.gameActive || appState.countdownActive || !canClick) return;

    canClick = false;
    
    appState.currentWordIndex++;
    showNextWord();
    
    // Анимация на кнопке
    wrongBtn.style.transform = 'scale(0.9)';
    setTimeout(() => {
        wrongBtn.style.transform = '';
    }, 100);

    setTimeout(() => {
        canClick = true;
    }, 300);
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

// Минимальная защита от зума
document.addEventListener('touchmove', function(e) {
    if (e.touches.length > 1) {
        e.preventDefault();
    }
}, { passive: false });

document.addEventListener('gesturestart', function(e) {
    e.preventDefault();
});

// Защита от двойного тапа на кнопках
let lastTouchEnd = 0;
document.addEventListener('touchend', function(e) {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
        e.preventDefault();
    }
    lastTouchEnd = now;
}, { passive: false });

// Защита для кнопок
document.querySelectorAll('.action-btn, .start-button, .restart-btn').forEach(btn => {
    btn.addEventListener('touchstart', function(e) {
        if (e.touches.length > 1) {
            e.preventDefault();
        }
    }, { passive: false });
});

const backBtn = document.getElementById('backBtn');

backBtn.addEventListener('click', function() {
    // Останавливаем таймер игры
    if (appState.timerInterval) {
        clearInterval(appState.timerInterval);
        appState.timerInterval = null;
    }
    
    // Останавливаем отсчет (ВАЖНО!)
    if (window.countdownInterval) {
        clearInterval(window.countdownInterval);
        window.countdownInterval = null;
    }
    
    // Сбрасываем состояние игры
    appState.gameActive = false;
    appState.countdownActive = false;
    
    // Переключаем на экран категорий
    screens.game.classList.remove('active');
    screens.categories.classList.add('active');
    
    // Сбрасываем отображение
    countdownEl.classList.remove('active');
    countdownEl.textContent = '3'; // Сбрасываем на начальное значение
    currentWordEl.textContent = '';
    
    // Сбрасываем таймер на экране
    timerEl.textContent = '60';
    timerEl.style.color = '#ffd700';
});

// Запускаем
init();