const all = document.querySelector('#all')
let users = window.localStorage.getItem('users')
const tbody = document.querySelector('tbody')
const active = document.querySelector('#active')
const selected = document.querySelector('#selected')
const checkbox = document.querySelector('#all-items')

users =  JSON.parse(users) || [ {name: 'Umidjon', date: '31 January 2022', checked: false, active: false},
    {name: 'Alex', date: '31 January 2022', checked: false, active: false}]

let checked_checkbox = window.localStorage.getItem('all-checked')
checked_checkbox = JSON.parse(checked_checkbox) || false

let selected_for_all = window.localStorage.getItem('selected')
selected_for_all = JSON.parse(selected_for_all)

if(!(selected_for_all && Object.keys(selected_for_all).length)) {
        selected_for_all = {all: 0, active: 0, selected: 0}
    }

renderUsers()

function renderUsers() {
    tbody.innerHTML = null
    let count = 0;
    checkbox.checked = checked_checkbox
    all.textContent = '/' + ' ' + selected_for_all.all
    active.textContent = '/' + ' ' + selected_for_all.active
    selected.textContent = '/' + ' ' + selected_for_all.selected
    console.log(typeof checked_checkbox)
    for(let user of users) {
        const [tr, td1, div, input, label, td2, div2, i1, td3, td4, span1, td5, i2, td6, div3, btn1, btn2, i3] = createELement('tr', 'td', 'div', 'input', 'label',
            'td', 'div', 'i', 'td', 'td', 'span', 'td', 'i', 'td', 'div', 'button', 'button', 'i')

        td1.setAttribute('class', 'align-middle')
        div.setAttribute('class', 'custom-control custom-control-inline custom-checkbox custom-control-nameless m-0 align-top')
        input.setAttribute('class', 'custom-control-input')
        input.setAttribute('type', 'checkbox')
        input.setAttribute('id', `item-${++count}`)
        input.checked = user.checked
        label.setAttribute('class', 'custom-control-label')
        label.setAttribute('for', `item-${count}`)

        div.append(input, label)
        td1.append(div)

        td2.setAttribute('class', 'align-middle text-center')
        div2.setAttribute('class', 'bg-light d-inline-flex justify-content-center align-items-center align-top')
        div2.setAttribute('style', 'width: 35px; height: 35px; border-radius: 3px;')
        i1.setAttribute('class', 'fa fa-fw fa-photo')
        i1.setAttribute('style', 'opacity: 0.8')

        div2.append(i1)
        td2.append(div2)

        td3.setAttribute('class', 'text-nowrap align-middle')
        td4.setAttribute('class', 'text-nowrap align-middle')
        td5.setAttribute('class', 'text-center align-middle')
        i2.setAttribute('class', 'fa fa-fw text-secondary cursor-pointer fa-toggle-off')
        td6.setAttribute('class', 'text-center align-middle')
        div3.setAttribute('class', 'btn-group align-top')
        btn1.setAttribute('class', 'btn btn-sm btn-outline-secondary badge')
        btn2.setAttribute('class', 'btn btn-sm btn-outline-secondary badge')
        btn1.setAttribute('type', 'button')
        btn2.setAttribute('type', 'button')
        btn1.setAttribute('data-toggle', 'modal')
        btn1.setAttribute('data-target', '#user-form-modal')
        i3.setAttribute('class', 'fa fa-trash')

        td3.textContent = user.name
        span1.textContent = user.date
        btn1.textContent = 'Edit'

        td4.append(span1)
        td5.append(i2)
        btn2.append(i3)
        div3.append(btn1, btn2)
        td6.append(div3)

        tr.append(td1, td2, td3, td4, td5, td6)
        tbody.append(tr)

        input.addEventListener('change', function () {
            if(this.checked) {
               user.checked = true
                selected_for_all.selected += 1
                if(selected_for_all.selected == users.length) checked_checkbox = true
            } else {
                user.checked = false
                selected_for_all.selected -= 1
                checked_checkbox = false
            }

            window.localStorage.setItem('users', JSON.stringify(users))
            window.localStorage.setItem('all-checked', JSON.stringify(checked_checkbox))
            window.localStorage.setItem('selected', JSON.stringify(selected_for_all))

            renderUsers()
        })
    }

}

checkbox.addEventListener('change', function() {
    if(this.checked) {
        checked_checkbox = true
        for(let user of users) {
            user.checked = true
        }
        selected.textContent = '/' + ' ' + users.length
        selected_for_all.selected = users.length
    } else {
        for(let user of users) {
            user.checked = false
        }
        selected.textContent = '/' + ' ' + 0
        selected_for_all.selected = 0
        checked_checkbox = false
    }
    window.localStorage.setItem('selected', JSON.stringify(selected_for_all))
    window.localStorage.setItem('all-checked', JSON.stringify(checked_checkbox))
    window.localStorage.setItem('users', JSON.stringify(users))
    renderUsers()
})

function createELement(...arr) {
    return arr.map( el => document.createElement(el))
}
