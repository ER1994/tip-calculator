const tipBtns = document.querySelectorAll('.tip-btn')
const tipInput = document.querySelectorAll('.tip-input')
const billAmount = document.getElementById('bill')
const people = document.getElementById('people')

const validations = {
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
        }
    })
    return isValid
}

function updateTipPerson(amount) {
    const totalTip = document.getElementById('result-tip')
    totalTip.value = parseFloat(amount.toFixed(2))
}

function updateTotalPerson(amount) {
    const total = document.getElementById('result-total')
    total.value = parseFloat(amount.toFixed(2))
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
}

people.addEventListener('keypress', (e) => {
    if (!/[0-9]/.test(e.key)) {
        e.preventDefault()
    }
})

billAmount.addEventListener('change', (e) => {
    let value = parseFloat(e.target.value)
    e.target.value = +value > 0 ? parseFloat(value.toFixed(2)) : 0
})

tipBtns.forEach(btn => {
    btn.addEventListener('click', (e) => tipFormHandler(e.target, 'button'))

})

tipInput.forEach(input => {
    input.addEventListener('change', (e) => tipFormHandler(e.target, 'input'))
})
