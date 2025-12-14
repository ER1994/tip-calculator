const tipBtns = document.querySelectorAll('.tip-btn')
const tipInput = document.querySelectorAll('.tip-input')
const billAmount = document.getElementById('bill')
const people = document.getElementById('people')

const validations = {
    bill: (value) => value !== 0,
    people: (value) => value !== 0
}

function dataIsValid (key,value, validations) {
    if (!validations[key]) return true

    return validations[key](value)
}

function isValidForm(form,validations) {
    let isValid = true
    const data = Object.fromEntries(new FormData(form))
    Object.keys(data).forEach((name) => {
        if (!dataIsValid(name,data[name],validations)) {
            isValid = false
        }
    })
    return isValid
}

function updateTipPerson (amount) {
    const totalTip = document.getElementById('result-tip')
    totalTip.value = amount
}

function updateTotalPerson (amount) {
    const total = document.getElementById('result-total')
    total.value = amount
}

function calculateTotals (form, rate) {
    if (isValidForm(form,validations)) {
        let tipTotalPerson = (billAmount.value * rate) / people.value
        updateTipPerson(tipTotalPerson)
        let totalPerson = (billAmount.value * (1 + rate)) / people.value
        updateTotalPerson(totalPerson)
    } else {
        console.error('Bill or people cannot be empty or 0')
    }
}

function tipFormHandler (target, form) {
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
    e.target.value = parseFloat(value.toFixed(2))
})

tipBtns.forEach(btn => {
    btn.addEventListener('click', (e) => tipFormHandler(e.target,'button'))

})

tipInput.forEach(input => {
    input.addEventListener('change', (e) => tipFormHandler(e.target, 'input'))
})
