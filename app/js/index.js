let bill_input = document.querySelector('.bill-in')
let cal_btn = document.querySelector('.calc__result-btn-1')
let people_input = document.querySelector('.people-in')

let tips = [5, 15, 50, 10, 25]

let classNames = {
    0 : '.calc__pct-grid-col1-btn0',
    1 : '.calc__pct-grid-col1-btn1',
    2 : '.calc__pct-grid-col1-btn2',
    3 : '.calc__pct-grid-col2-btn3',
    4 : '.calc__pct-grid-col2-btn4'
}

tipBtnClick(classNames[0], tips[0])
tipBtnClick(classNames[1], tips[1])
tipBtnClick(classNames[2], tips[2])
tipBtnClick(classNames[3], tips[3])
tipBtnClick(classNames[4], tips[4])

function removeCls () {
    for (i in classNames) {
        document.querySelector(classNames[i]).classList.remove('selected')
    }
}

function d (o, e) {
    return document.querySelector(`${o}`).innerHTML = `\$${e}`
}

function tipBtnClick (cls, tip) {
    let btn = document.querySelector(cls)
    btn.addEventListener('click', function() {
        if (bill_input.value === " ") { 
            bill_input.placeholder = "Bill amount"
        } else {
            tipCal(tip)
            removeCls()
            btn.classList.add('selected')
        }
    })
}

function tipCal(tip) {
    let bill = parseFloat(bill_input.value)
    let people = parseInt(people_input.value)

    if(!isNaN(bill) && !isNaN(people)) {
        if (isNaN(people)) {
            let totalCal = (bill / 100) * tip
            let total_bill = totalCal + bill
            d('.tip-amt', totalCal.toFixed(2))
            d('.total-result', total_bill.toFixed(2))
        } else {
            let totalCal = (bill / 100) * tip
            let total_bill = totalCal + bill
            d('.tip-amt', (totalCal / people).toFixed(2))
            d('.total-result', (total_bill / people).toFixed(2))
        }
    }
   
   
    
}