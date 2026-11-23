document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Логика переключения тем и цитат ---
    const themeButtons = document.querySelectorAll('.theme-card');
    const themeMessage = document.getElementById('theme-message');
    const quoteRibbon = document.getElementById('quote-ribbon');
    const ribbonText = document.getElementById('ribbon-text');
    const ribbonAuthor = document.getElementById('ribbon-author');
    const ribbonCharLeft = document.getElementById('ribbon-char-left');
    const ribbonCharRight = document.getElementById('ribbon-char-right');
    const body = document.body;

    const themeData = {
        'theme-friendship': {
            message: '🤝 Дружба важнее победы! Поддержка друзей бесценна.',
            quote: '«Друг — это тот, кто поймёт тебя даже без слов и разделит радость победы»',
            author: '— Ёжик',
            chars: [{ side: 'left', src: 'Images/yozhik.png', name: 'Ёжик' }]
        },
        'theme-fairplay': {
            message: '⚖️ Честная игра! Правила и справедливость выше всего.',
            quote: '«Честная победа дороже любой золотой медали, ведь она сохраняет уважение»',
            author: '— Копатыч',
            chars: [{ side: 'right', src: 'Images/Koparich.png', name: 'Копатыч' }]
        },
        'theme-overcome': {
            message: '💪 Преодоление себя! Главная победа — стать лучше, чем вчера.',
            quote: '«Бойся не сильного соперника, бойся собственной лени. Ты можешь больше!»',
            author: '— Кар-Карыч',
            chars: [{ side: 'left', src: 'Images/karich.png', name: 'Кар-Карыч' }]
        },
        'theme-teamwork': {
            message: '👥 Командная работа! Вместе мы можем достичь любых высот.',
            quote: '«Один палец не ударит, а кулак — сила. Мы разные, но мы команда!»',
            author: '— Копатыч и Крош',
            chars: [
                { side: 'left', src: 'Images/kopatich.png', name: 'Копатыч' },
                { side: 'right', src: 'Images/krosh.png', name: 'Крош' }
            ]
        },
        'theme-health': {
            message: '🍏 Здоровье и радость! Движение — это жизнь и заряд бодрости.',
            quote: '«Смех продлевает жизнь, а утренняя зарядка наполняет её яркими красками!»',
            author: '— Совунья',
            chars: [{ side: 'right', src: 'Images/sovunia.png', name: 'Совунья' }]
        },
        'theme-persistence': {
            message: '🌟 Не сдавайся! Всегда найдешь выход, даже если всё идёт не по плану.',
            quote: '«Ошибка — это просто ещё один способ узнать, как не надо делать. Пробуй снова!»',
            author: '— Пин',
            chars: [{ side: 'left', src: 'Images/pin.png', name: 'Пин' }]
        }
    };

    // Расстановка персонажей в ленте цитаты
    function setRibbonChars(chars) {
        [ribbonCharLeft, ribbonCharRight].forEach(img => {
            img.classList.add('hidden');
            img.removeAttribute('src');
        });
        chars.forEach(c => {
            const img = c.side === 'left' ? ribbonCharLeft : ribbonCharRight;
            img.src = c.src;
            img.alt = c.name;
            img.classList.remove('hidden');
        });
    }

    themeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const selectedTheme = button.getAttribute('data-theme');
            const data = themeData[selectedTheme];

            body.className = '';
            body.classList.add(selectedTheme);

            quoteRibbon.classList.add('hidden');
            themeMessage.style.opacity = '0';

            setTimeout(() => {
                themeMessage.textContent = data.message;
                ribbonText.textContent = data.quote;
                ribbonAuthor.textContent = data.author;
                setRibbonChars(data.chars);

                themeMessage.style.opacity = '1';
                quoteRibbon.classList.remove('hidden');

                quoteRibbon.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 200);
        });
    });

    // --- 2. Логика теста ---
    const quizForm = document.getElementById('quiz-form');
    const submitBtn = document.getElementById('submit-quiz');
    const resultDiv = document.getElementById('quiz-result');
    const resultTitle = document.getElementById('result-title');
    const resultDescription = document.getElementById('result-description');
    const resultImage = document.getElementById('result-image');
    const resetBtn = document.getElementById('reset-quiz');

    const characters = {
        krosh: {
            name: 'Крош! 🐰',
            desc: 'Ты энергичный, весёлый и всегда готов к приключениям! Спорт для тебя — это способ выплеснуть энергию и повеселиться с друзьями.',
            image: 'Images/krosh.png'
        },
        yozhik: {
            name: 'Ёжик! 🦔',
            desc: 'Ты вдумчивый, спокойный и надёжный. Ты ценишь честную игру и всегда поддержишь друзей, даже если не любишь шумные компании.',
            image: 'Images/yozhik.png'
        },
        nyusha: {
            name: 'Нюша! 🐷',
            desc: 'Ты яркая, творческая и уверенная в себе! Ты любишь спорт, который позволяет проявить грацию, и всегда веришь в лучшее.',
            image: 'Images/nyusha.png'
        },
        pin: {
            name: 'Пин! 🐧',
            desc: 'Ты изобретательный и логичный! Ты подходишь к спорту как к инженерной задаче: главное — техника, стратегия и правильный инвентарь.',
            image: 'Images/pin.png'
        }
    };

    submitBtn.addEventListener('click', () => {
        const formData = new FormData(quizForm);
        const answers = { krosh: 0, yozhik: 0, nyusha: 0, pin: 0 };

        if (formData.get('q1') && formData.get('q2') && formData.get('q3')) {
            for (let [key, value] of formData.entries()) {
                answers[value]++;
            }

            let maxScore = 0;
            let resultChar = 'krosh';

            for (let char in answers) {
                if (answers[char] > maxScore) {
                    maxScore = answers[char];
                    resultChar = char;
                }
            }

            resultImage.src = characters[resultChar].image;
            resultImage.alt = characters[resultChar].name;
            resultTitle.textContent = `Ты — ${characters[resultChar].name}`;
            resultDescription.textContent = characters[resultChar].desc;

            quizForm.classList.add('hidden');
            resultDiv.classList.remove('hidden');

            resultDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
            alert('Пожалуйста, ответь на все 3 вопроса, чтобы узнать результат! 🌟');
        }
    });

    resetBtn.addEventListener('click', () => {
        quizForm.reset();
        resultDiv.classList.add('hidden');
        quizForm.classList.remove('hidden');
    });
});