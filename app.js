const buttons = document.querySelectorAll('.button');
const display = document.querySelector('#display');
const clearDisplay = document.querySelector('#clearDisplay');
const equals = document.querySelector('#equals');
const lastChar = document.querySelector('#lastChar');

let resultShow = false;

const operators = ['+', '-', '*', '/', '.'];
const allowedKeys = ['0','1','2','3','4','5','6','7','8','9', '+', '-', '*', '/', '.', 'Backspace', 'Escape', 'Enter', '=', 'ArrowLeft', 'ArrowRight'];

// CLEAR ALL
clearDisplay.addEventListener('click', () => {
    display.value = '';
    resultShow = false;
});

// CLEAR LAST CHARACTER
lastChar.addEventListener('click', () => {
    if (resultShow || display.value === 'Error') {
        display.value = '';
        resultShow = false;
    } else {
        display.value = display.value.slice(0, -1);
    }
});

// BUTTON CLICK
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');
        const lastChar = display.value[display.value.length - 1];

        if (!value) return;
        if (display.value === 'Error') return;

        if (resultShow) {
            if (!isNaN(value)) {
                display.value = '';
            }
            resultShow = false;
        }

        if (operators.includes(value)) {
            if (operators.includes(lastChar)) {
                display.value = display.value.slice(0, -1) + value;
            } else {
                display.value += value;
            }
        } else {
            display.value += value;
        }
    });
});

// EQUALS
equals.addEventListener('click', () => {
    if (display.value === 'Error' || display.value === '') return;

    try {
        display.value = eval(display.value);
        resultShow = true;
    } catch {
        display.value = 'Error';
        resultShow = false;
    }
});

// KEYBOARD SUPPORT
document.addEventListener('keydown', (e) => {
    const key = e.key;
    const lastChar = display.value[display.value.length - 1];

    if (!allowedKeys.includes(key)) {
        e.preventDefault();
        return;
    }

    // Clear display after result shown
    if (resultShow) {
        if (!isNaN(key)) {
            display.value = '';
            resultShow = false;
        } else if (operators.includes(key)) {
            resultShow = false;
        }
    }

    if (!isNaN(key)) {
        display.value += key;
    } else if (operators.includes(key)) {
        if (operators.includes(lastChar)) {
            display.value = display.value.slice(0, -1) + key;
        } else {
            display.value += key;
        }
    } else if (key === 'Enter' || key === '=') {
        if (display.value === 'Error' || display.value === '') return;

        try {
            display.value = eval(display.value);
            resultShow = true;
        } catch {
            display.value = 'Error';
            resultShow = false;
        }
    } else if (key === 'Backspace') {
        if (resultShow || display.value === 'Error') {
            display.value = '';
            resultShow = false;
        } else {
            display.value = display.value.slice(0, -1);
        }
    } else if (key === 'Escape') {
        display.value = '';
        resultShow = false;
    }
});