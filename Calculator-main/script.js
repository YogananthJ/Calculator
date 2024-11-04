document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const themeToggle = document.getElementById('theme-toggle');
    const buttons = document.querySelector('.buttons');
    const historyList = document.getElementById('history-list');
    
    let history = [];  // Array to store history of calculations

    // Calculator button setup
    const buttonValues = [
        'C', '7', '8', '9', '/',
        '4', '5', '6', '*',
        '1', '2', '3', '-',
        '0', '.', '=', '+',
        '00','pi'
    ];

    buttonValues.forEach(value => {
        const button = document.createElement('button');
        button.textContent = value;
        button.addEventListener('click', () => handleButtonClick(value));
        buttons.appendChild(button);
    });

    function handleButtonClick(value) {
        if (value === '=') {
            try {
                let result = eval(display.value);
                
                // Handle scientific functions separately if necessary
                if (display.value.includes('sqrt')) {
                    result = Math.sqrt(eval(display.value.replace('sqrt', '')));
                } else if (display.value.includes('pi')) {
                    result = eval(display.value.replace('pi', Math.PI));
                } else if (display.value.includes('x^2')) {
                    result = Math.pow(eval(display.value.replace('x^2', '')), 2);
                } else if (display.value.includes('x^3')) {
                    result = Math.pow(eval(display.value.replace('x^3', '')), 3);
                } else if (display.value.includes('xroot^2')) {
                    result = Math.sqrt(eval(display.value.replace('xroot^2', '')));
                }
                
                display.value = result;
                
                // Add to history
                addToHistory(`${display.value}`);
            } catch {
                display.value = 'Error';
            }
        } else if (value === 'C') {
            display.value = '';
        } else if (value === 'sqrt') {
            display.value = `Math.sqrt(${eval(display.value)})`;
        } else if (value === 'pi') {
            display.value += Math.PI;
        } else if (value === 'sin') {
            display.value = `Math.sin(${eval(display.value)})`;
        } else if (value === 'cos') {
            display.value = `Math.cos(${eval(display.value)})`;
        } else if (value === 'x^2') {
            display.value += '**2';
        } else if (value === 'x^3') {
            display.value += '**3';
        } else if (value === 'xroot^2') {
            display.value = `Math.sqrt(${eval(display.value)})`;
        } else {
            display.value += value;
        }
    }

    function addToHistory(entry) {
        history.push(entry);
        updateHistoryList();
    }

    function updateHistoryList() {
        historyList.innerHTML = '';
        history.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            historyList.appendChild(li);
        });
    }

    // Clear history function
    window.clearHistory = function() {
        history = [];
        updateHistoryList();
    };

    // Theme toggle
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
    });
});
