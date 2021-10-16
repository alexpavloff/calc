function getCalc() {
    return document.querySelectorAll('.calc')[0];
}
function getDisplay() {
    return document.querySelectorAll('.calc-display')[0];
}
function evaluateValue(firstOperand, lastOperand, operator) {
    if (operator === undefined)
        return firstOperand.toString();
    firstOperand = Number(firstOperand);
    lastOperand = Number(lastOperand);
    switch (operator) {
        case '+':
            return (firstOperand + lastOperand).toString();
        case '-':
            return (firstOperand - lastOperand).toString();
        case '*':
            return (firstOperand * lastOperand).toString();
        case '/':
            return (firstOperand / lastOperand).toString();
    }
}
function digitPressed(event) {
    let button = event.target;
    let display = getDisplay();
    let lastOperand = display.textContent.split(/\+|\-|\*|\//).pop();
    if (button.tagName == 'BUTTON' && button.parentElement.className.includes('calc-button-digit')) {
        switch (button.textContent) {
            case '.':
                if (lastOperand == '') {
                    display.textContent += '0';
                }
                if (!lastOperand.includes('.')) {
                    display.textContent += button.textContent;
                }
                break;
            case '0':
                if (!(lastOperand[0] == '0' && lastOperand.length == 1)) {
                    display.textContent += button.textContent;
                }
                break;
            default:
                if (lastOperand[0] == '0' && lastOperand.length == 1) {
                    display.textContent = display.textContent.slice(0, -1);
                }
                display.textContent += button.textContent;
                break;
        }
    }
}
function operatorPressed(event) {
    let button = event.target;
    let display = getDisplay();
    if (button.tagName == 'BUTTON' && button.parentElement.className.includes('calc-button-operator')) {
        if (display.textContent.slice(-1) == '.') {
            display.textContent = display.textContent.slice(0, -1);
        }
        let firstOperand = display.textContent.split(/\+|(?<=[0-9])\-|\*|\//).shift();
        let lastOperand = display.textContent.split(/\+|(?<=[0-9])\-|\*|\//).pop();
        let operator = display.textContent[firstOperand.length];
        if (lastOperand.length == 0)
            return;
        switch (button.textContent) {
            case '√':
                display.textContent = display.textContent.slice(0, -1 * lastOperand.length)
                    + Math.sqrt(Number(lastOperand));
                break;
            case '1/x':
                display.textContent = display.textContent.slice(0, -1 * lastOperand.length)
                    + 1 / Number(lastOperand);
                break;
            case 'x2':
                display.textContent = display.textContent.slice(0, -1 * lastOperand.length)
                    + Math.pow(Number(lastOperand), 2);
                break;
            case '∓':
                display.textContent = display.textContent.slice(0, -1 * lastOperand.length)
                    + -Number(lastOperand);
                break;
            case '=':
                display.textContent = evaluateValue(Number(firstOperand), Number(lastOperand), operator);
                break;
            default:
                if (display.textContent.length != lastOperand.length)
                    display.textContent = evaluateValue(Number(firstOperand), Number(lastOperand), operator);
                display.textContent += button.textContent;
                break;
        }
    }
}
function controlPressed(event) {
    let button = event.target;
    let display = getDisplay();
    if (button.tagName == 'BUTTON' && button.parentElement.className.includes('calc-button-control')) {
        switch (button.textContent) {
            case 'C':
                display.textContent = '0';
                break;
            case '←':
                if (display.textContent.length == 1)
                    display.textContent = '0';
                else
                    display.textContent = display.textContent.slice(0, -1);
        }
    }
}
function start() {
    let calc = getCalc();
    calc.addEventListener('click', digitPressed);
    calc.addEventListener('click', operatorPressed);
    calc.addEventListener('click', controlPressed);
}
start();
//# sourceMappingURL=script.js.map