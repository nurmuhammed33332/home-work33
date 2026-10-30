 const input = document.getElementById('user-input');
        const checkBtn = document.getElementById('check-btn');
        const resetBtn = document.getElementById('reset-btn');
        const message = document.getElementById('message');
        const attemptsCount = document.getElementById('attempts-count');
        const historySpan = document.getElementById('history');
        const themeToggle = document.getElementById('theme-toggle');

        let secret;
        let attemptsLeft;
        let historyList;

        function initGame() {
            secret = Math.floor(Math.random() * 10) + 1;
            attemptsLeft = 5;
            historyList = [];
            
            input.value = '';
            input.disabled = false;
            checkBtn.disabled = false;
            message.textContent = 'Удачи!';
            message.className = 'message';
            attemptsCount.textContent = attemptsLeft;
            historySpan.textContent = '-';
        }

        initGame();

        function checkGuess() {
            const userValue = input.value.trim();
            
            if (userValue === '') {
                message.textContent = 'Введи число';
                message.className = 'message error';
                return;
            }
            
            const guess = Number(userValue);
            
            if (isNaN(guess) || guess < 1 || guess > 10) {
                message.textContent = 'Введи число от 1 до 10';
                message.className = 'message error';
                return;
            }

            historyList.push(guess);
            historySpan.textContent = historyList.join(', ');

            attemptsLeft--;
            attemptsCount.textContent = attemptsLeft;

            if (guess === secret) {
                message.textContent = 'Угадал!';
                message.className = 'message success';
                endGame();
            } else if (attemptsLeft === 0) {
                message.textContent = `Игра окончена! Было загадано число ${secret}`;
                message.className = 'message error';
                endGame();
            } else if (guess < secret) {
                message.textContent = 'Больше';
                message.className = 'message error';
            } else {
                message.textContent = 'Меньше';
                message.className = 'message error';
            }

            input.value = '';
            input.focus(); 
        }

        function endGame() {
            input.disabled = true;
            checkBtn.disabled = true;
        }

        checkBtn.addEventListener('click', checkGuess);

        input.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' && !checkBtn.disabled) {
                checkGuess();
            }
        });

        resetBtn.addEventListener('click', initGame);

        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-theme');
        });