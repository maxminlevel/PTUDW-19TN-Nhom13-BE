var payment_modal = document.getElementById('payment_modal')

var btn_payment = document.getElementsByClassName('payment')[0]

btn_payment.onclick = () => {
    payment_modal.style.display = 'block'
}

var btn_close = document.getElementsByClassName('btn__close')[0]

btn_close.onclick = () => {
    payment_modal.style.display = 'none'
}

window.onclick = (event) => {
    if (event.target == payment_modal) {
        payment_modal.style.display = 'none'
    }
}

var btn_pay = document.getElementsByClassName('button')

btn_pay[0].onclick =
    btn_pay[1].onclick =
    btn_pay[2].onclick =
    btn_close.onclick