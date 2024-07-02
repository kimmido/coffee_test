let phoneNum = "";

window.addEventListener("DOMContentLoaded", function() {
    const phoneBtn = document.getElementsByClassName("bottom-btn__link")[0];
    const input = document.getElementsByClassName("phone__input");
    const overlay = document.getElementsByClassName("overlay")[0];
    const stay = document.getElementsByClassName("modal__btn--yes")[0];
    const away = document.getElementsByClassName("modal__btn--no")[0];
    const orderNumber = document.getElementsByClassName("order-number")[0];
    
    // 선택 음료 리스트 삭제
    user = [];
    window.sessionStorage.removeItem("user");
    // 준비현황버튼 나타내기 값 전달
    window.sessionStorage.setItem("status", true);
    const orderId = window.sessionStorage.getItem("orderId");

    getData('/orders/' + orderId + '/number').then(data => {
        orderNumber.innerHTML = data.orderNumber;
        window.sessionStorage.setItem("orderNumber", data.orderNumber);
    })

    // 입력 칸 : 숫자만 입력하도록 제한 & 자동 이동
    input[0].addEventListener("input", function() {
        this.value = this.value.replace(/[^0-9]/g, '');
        if(this.value.length >= 4) {
            input[1].focus();
        }
    })
    
    input[1].addEventListener("input", function(e) {
        this.value = this.value.replace(/[^0-9]/g, '');
    })
    
    input[1].addEventListener("keydown", function(e) {
        if(this.value.length != 0) return;
        if(e.keyCode == 8) {
            input[0].focus();
        } 
    })
    
    // 휴대폰 번호 7자 미만 입력 시 주의 모달 띄우기
    phoneBtn.addEventListener("click", function(e) {
        let phoneLength = input[0].value.length + input[1].value.length;
        if(phoneLength < 7) {
            e.preventDefault();
            overlay.classList.toggle("overlay-open");
            return;
        }
        
        // phoneNum : 입력한 전화번호
        phoneNum = "010" + input[0].value + input[1].value

        post("/orders/registerPhone", {
            "orderId" : orderId,
            "phone" : phoneNum
        })
        // TODO 실패 시 예외 처리 필요
        .then(response => {
        }).catch(response => {
        })
    })
    
    stay.addEventListener("click", function() {
        overlay.classList.toggle("overlay-open");
    })
    
    away.addEventListener("click", function() {
        location.replace("/sub/status.html");
    })
})
