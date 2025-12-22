const tipBtns = document.querySelectorAll('.tip-btn')
const tipInput = document.querySelectorAll('.tip-input')
const billAmount = document.getElementById('bill')
const people = document.getElementById('people')
const resetBtn = document.getElementById('reset')
const errorMessage = document.querySelector('.error-message__inactive')

const
    validations = {
        bill: (value) => value !== '0',
        people: (value) => value !== '0'
    }

function dataIsValid(name, value, validations) {
    if (!validations[name]) return true
    return validations[name](value)
}

function isValidForm(form, validations) {
    let isValid = true
    const inputs = form.querySelectorAll('.validation')
    inputs.forEach(input => {
        if (!dataIsValid(input.name, input.value, validations)) {
            isValid = false
            input.classList.toggle('input--invalid')
            errorMessage.classList.toggle('error-message__active')
            errorMessage.classList.toggle('error-message__inactive')
        } else {
            input.classList.toggle('input--valid')
        }
    })
    return isValid
}

function updateTipPerson(amount) {
    const totalTip = document.getElementById('result-tip')
    totalTip.value = '$' + amount.toFixed(2)
}

function updateTotalPerson(amount) {
    const total = document.getElementById('result-total')
    total.value = '$' + amount.toFixed(2)
}

function calculateTotals(form, rate) {
    if (isValidForm(form, validations)) {
        let tipTotalPerson = (billAmount.value * rate) / people.value
        updateTipPerson(tipTotalPerson)
        let totalPerson = (billAmount.value * (1 + rate)) / people.value
        updateTotalPerson(totalPerson)
    } else {
        console.error('Bill or people cannot be empty or 0')
    }
}

function tipFormHandler(target, form) {
    const formEvent = document.getElementById('calculations-forms')
    let rate = form === 'button' ? parseFloat(target.dataset.rate) : parseFloat(target.value) / 100
    calculateTotals(formEvent, rate)
    resetBtn.classList.toggle('btn--selected')
}

people.addEventListener('keypress', (e) => {
    if (!/[0-9]/.test(e.key)) {
        e.preventDefault()
    }
})

people.addEventListener('change', (e) => {
    if (!dataIsValid(people.name, people.value, validations)) {
        people.classList.toggle('input--invalid')
    } else {
        people.classList.toggle('input--valid')
    }
})

billAmount.addEventListener('change', (e) => {
    let value = parseFloat(e.target.value)
    e.target.value = +value > 0 ? parseFloat(value.toFixed(2)) : 0
    if (!dataIsValid(billAmount.name, billAmount.value, validations)) {
        billAmount.classList.toggle('input--invalid')
    } else {
        billAmount.classList.toggle('input--valid')
    }
})

tipBtns.forEach(btn => {
    btn.addEventListener('click', (e) => tipFormHandler(e.target, 'button'))
    btn.addEventListener('click', (e) => {
        btn.classList.toggle('btn--selected')
    })
})

tipInput.forEach(input => {
    input.addEventListener('change', (e) => tipFormHandler(e.target, 'input'))
})

resetBtn.addEventListener('click', (e) => {
    tipBtns.forEach(btn => {
        btn.classList.remove('btn--selected')
    })
    errorMessage.classList.remove('error-message__active')
    billAmount.classList.remove('input--invalid')
    people.classList.remove('input--invalid')
    errorMessage.classList.add('error-message__inactive')
})
