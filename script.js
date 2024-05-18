
document.addEventListener('DOMContentLoaded', function () {
    const screen = document.querySelector('.calculator-screen');
    const buttons = document.querySelectorAll('.btn');
    let currentInput = '';
    let operator = '';
    let previousInput = '';

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.getAttribute('data-value');

            if (button.classList.contains('number')) {
                handleNumber(value);
            } else if (button.classList.contains('operator')) {
                handleOperator(value);
            } else if (value === '.') {
                handleDecimal();
            } else if (value === '=') {
                handleEqual();
            } else if (value === 'C') {
                handleClear();
            }

            updateScreen();
        });
    });

    function handleNumber(number) {
        if (currentInput.length >= 9) return;
        currentInput = currentInput === '0' ? number : currentInput + number;
    }

    function handleOperator(op) {
        if (currentInput === '') return;
        if (previousInput !== '') {
            handleEqual();
        }
        operator = op;
        previousInput = currentInput;
        currentInput = '';
    }

    function handleDecimal() {
        if (!currentInput.includes('.')) {
            currentInput += '.';
        }
    }

    function handleEqual() {
        if (currentInput === '' || previousInput === '') return;

        const current = parseFloat(currentInput);
        const previous = parseFloat(previousInput);

        switch (operator) {
            case '+':
                currentInput = (previous + current).toString();
                break;
            case '-':
                currentInput = (previous - current).toString();
                break;
            case '*':
                currentInput = (previous * current).toString();
                break;
            case '/':
                currentInput = (previous / current).toString();
                break;
        }

        operator = '';
        previousInput = '';
    }

    function handleClear() {
        currentInput = '';
        operator = '';
        previousInput = '';
    }

    function updateScreen() {
        screen.value = currentInput;
    }
});
