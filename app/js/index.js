const bill_input = document.querySelector('.bill-in')
const cal_btn = document.querySelector('.calc__result-btn-1')
const people_input = document.querySelector('.people-in')
const clear = document.querySelector('.calc__result-btn-1')
const customPCT = document.querySelector('.calc__pct-grid-btn5')

const tips = [5, 25, 10, 50, 15]

const classNames = {
    0 : '.calc__pct-grid-btn0',
    1 : '.calc__pct-grid-btn1',
    2 : '.calc__pct-grid-btn2',
    3 : '.calc__pct-grid-btn3',
    4 : '.calc__pct-grid-btn4'
}


if (bill_input.value === "") {
    clear.style.opacity = "0.3"
}

inputOnChange(people_input)
inputOnChange(bill_input)
inputOnChangeCustom(customPCT)


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

    if(!isNaN(bill) || !isNaN(people)) {
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

function inputOnChange (e) {
    e.focus()
    e.addEventListener("keyup", function() {
        if (bill_input.value === "" && customPCT.value === "" && people_input.value === "") {
            clear.style.opacity = "0.3"
        }else {
            clear.style.opacity = "1.0"
            clear.style.transition = "all 200ms ease-in"
        }
        let activeBtn = -1
        for (i in classNames) {

            if (document.getElementById(`${i}`).classList.contains('selected')) {
                activeBtn = i
                break
            }
        }

        if (e.value === "") {
            d('.tip-amt', "")
            d('.total-result', "")
        }
       
        if (bill_input.value != "") {
            
            try {
                if (customPCT.value === "") {
                    tipCal(tips[activeBtn])
                } else {
                    removeCls()
                    tipCal(parseFloat(customPCT.value))
                }
                
            } catch (error) {
                
            }
        }
        
       
    })
}

function inputOnChangeCustom (e) {
    e.focus()
    e.addEventListener("keyup", function() { 
        removeCls()
        inputOnChange(e)
        if (customPCT.value === "") {
            document.querySelector(classNames[4]).classList.add('selected')
        }
    })
}

clear.addEventListener('click', function () {
    d('.tip-amt', "")
    d('.total-result', "")
    bill_input.value = ""
    people_input.value = ""
    customPCT.value = ""
    removeCls()
    document.querySelector(classNames[4]).classList.add('selected')
    clear.style.opacity = "0.3"
})