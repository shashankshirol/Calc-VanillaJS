class Calculator{
    constructor(prevText, currText){
        this.prevText = prevText;
        this.currText = currText;
        this.clear();
    }

    clear(){
        this.curr = '';
        this.prev = '';
        this.operation = undefined;
    }

    delete(){
        this.curr = this.curr.toString().slice(0, -1);
    }

    appendNumber(num){
        if(num === '.' && this.curr.includes('.')) return;
        this.curr = this.curr.toString() + num.toString();
    }

    chooseOp(op){
        if(this.curr === '') return;
        if(this.prev !== ''){
            this.compute()
        }
        this.operation = op;
        this.prev = this.curr;
        this.curr = '';

    }

    compute(){
        let computation;
        const p = parseFloat(this.prev);
        const c = parseFloat(this.curr);
        if(isNaN(p) || isNaN(c)) return;
        switch(this.operation){
            case '+':
                computation = p + c;
                break;
            case '-':
                computation = p - c;
                break;
            case 'x':
                computation = p*c;
                break;
            case '÷':
                computation = p/c;
                break;
            default:
                return
        }
        this.curr = computation;
        this.operation = undefined;
        this.prev = '';
    }

    getResult(){
        if(this.operation === undefined){
            return this.curr;
        }

        return;
    }

    getDisplayNumber(num){
        const stringNumber = num.toString();
        const intDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let intDisplay;
        if(isNaN(intDigits)){
            intDisplay = '';
        }else{
            intDisplay = intDigits.toLocaleString('en', {
                maximumFractionDigits: 0});
        }
        if(decimalDigits != null){
            return `${intDisplay}.${decimalDigits}`
        }
        return intDisplay;
    }

    updateDisp(){
        this.currText.innerText = this.getDisplayNumber(this.curr);
        if(this.operation != null){
            this.prevText.innerText = `${this.getDisplayNumber(this.prev)} ${this.operation}`;
        }else{
            this.prevText.innerText = '';
        }
    }
}

const numberButtons = document.querySelectorAll('[data-number]');
const opButtons = document.querySelectorAll('[data-operation]');
const equals = document.querySelector('[data-equals]');
const del = document.querySelector('[data-delete]');
const allClear = document.querySelector('[data-allclear]');
const prevOp = document.querySelector('[data-prev]');
const currOp = document.querySelector('[data-curr]');
const copy = document.querySelector('[data-copy]');


const calc = new Calculator(prevOp, currOp);

numberButtons.forEach(button =>{
    button.addEventListener('click', ()=>{
        calc.appendNumber(button.innerText);
        calc.updateDisp();
    })
});

opButtons.forEach(button =>{
    button.addEventListener('click', ()=>{
        calc.chooseOp(button.innerText);
        calc.updateDisp();
    })
});

equals.addEventListener('click', button =>{
    calc.compute();
    calc.updateDisp();
});

allClear.addEventListener('click', button =>{
    calc.clear();
    calc.updateDisp();
});

del.addEventListener('click', button =>{
    calc.delete();
    calc.updateDisp();
});

copy.addEventListener('click', button =>{
    let ans = calc.getResult();
    if(!isNaN(ans)){
        var dummy = document.createElement("textarea");
        document.body.appendChild(dummy);
        dummy.value = ans.toString();
        dummy.select();
        document.execCommand("copy");
        document.body.removeChild(dummy);
    }
});