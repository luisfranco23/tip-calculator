const optionPercentage = document.querySelectorAll('.opion-percentage')
const bill = document.getElementById('bill')
const people = document.getElementById('people')
const result = document.getElementById('result')
const resultTotal = document.getElementById('result-total')
const response = document.getElementById('response')
const buttonReset = document.querySelector('.btn-reset')
const custom = document.getElementById('custom')

custom.style.cursor = 'not-allowed'
custom.disabled = true

bill.addEventListener('input', () => {
    if (bill.value.trim() !== '') {
        bill.classList.add('border-sd')
    } else {
        bill.classList.remove('border-sd')
    }


    if (bill.value.trim() !== '' && people.value.trim() !== '') {
        custom.disabled = false
        custom.style.cursor = 'auto'
        custom.addEventListener('input', () => {
            let tipAmount = Number(bill.value) * (Number(custom.value) / 100) / Number(people.value)
            result.innerText = `$ ${tipAmount.toFixed(2)}`
            resultTotal.innerText = `$ ${(tipAmount + (Number(bill.value) / Number(people.value))).toFixed(2)}`
        })
    }

})


people.addEventListener('input', () => {
    if (people.value.trim() !== '') {
        people.classList.add('border-sd')
    } else {
        people.classList.remove('border-sd')
    }
})

custom.addEventListener('input', () => {
    if (custom.value.trim() !== '') {
        custom.classList.add('border-sd')
    } else {
        custom.classList.remove('border-sd')
    }
})

optionPercentage.forEach((option) => {
    option.addEventListener('click', (e) => {
        e.preventDefault()
        custom.disabled = true
        custom.style.cursor = 'not-allowed'
        custom.value = ''
        custom.classList.remove('border-sd')

        if (option.classList.contains('selected')) {
            option.classList.remove('selected')
            custom.disabled = false
            custom.style.cursor = 'auto'
        } else {

            optionPercentage.forEach(el => {
                el.classList.remove('selected')
            })

            option.classList.add('selected')
        }

        let selectedValue = parseInt(option.textContent, 10)
        const billValue = Number(bill.value)
        const peopleValue = Number(people.value)

        if (!(peopleValue && billValue)) {
            people.classList.add('border')
            option.classList.remove('selected')
            response.innerText = "Can't be zero"
            return
        } else {
            response.remove()

            let tipAmount = billValue * (selectedValue / 100) / peopleValue
            console.log(tipAmount)
            result.innerText = `$ ${tipAmount.toFixed(2)}`
            resultTotal.innerText = `$ ${(tipAmount + (billValue / peopleValue)).toFixed(2)}`
        }
    })
})

buttonReset.addEventListener('click', (e) => {
    e.preventDefault()
    bill.value = ''
    people.value = ''
    custom.value = ''
    result.innerText = '$ 0.0'
    resultTotal.innerText = '$ 0.0'
    people.classList.remove('border-sd')
    custom.classList.remove('border-sd')
    bill.classList.remove('border-sd')
    people.classList.remove('border')

    optionPercentage.forEach(op =>{
        op.classList.remove('selected')
    })

})
