window.addEventListener("DOMContentLoaded", () => {
    const submitBtn = document.querySelector(".bottom-btn__link");
    const title = document.querySelector('input[name="title"]');
    const content = document.querySelector('textarea[name="content"]');
    const phone = document.querySelector('input[name="phone"]');
    
    // 전화번호 칸에 숫자만 입력하도록
    phone.addEventListener("input", function(e) {
        this.value = this.value.replace(/[^0-9]/g, '');
    })

    submitBtn.addEventListener("click", function(e) {
        if(title.value.length === 0) {
            title.focus();
            return alert("제목을 입력해주세요.")
        } 
        if(content.value.length === 0) {
            content.focus();
            return alert("내용을 입력해주세요.")
        } 
        if(phone.value.length < 7) {
            phone.focus();
            return alert("전화번호을 정확히 입력해주세요.")
        }
        const storeId = window.sessionStorage.getItem('storeId');

        post('/message/send/' + storeId, {
            "title" : title.value, // 제목
            "content" : content.value, // 내용
            "phone" : phone.value // 전화번호
        }).then(response =>
            alert(response.message)
        )

        title.value = '';
        content.value = '';
        phone.value = '';
    })
})