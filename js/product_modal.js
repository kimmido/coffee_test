window.addEventListener("DOMContentLoaded",function() {
    const modal = document.getElementsByClassName("modal")[0];
    const tabWrap = document.getElementsByClassName("tab")[0];

    const modalId = modal.querySelector(".product__id");
    const modalImg = modal.querySelector(".product__img-inner");
    const modalName = modal.querySelector(".product__name");
    const modalPrice = modal.querySelector(".product__price--number");
    const modalCount = modal.querySelector(".product__count");
    const modalTotal = modal.querySelector(".product__total--number");
    
    tabWrap.addEventListener('click', function(e) {
        if(!e.target.matches(".product")) return;
        
        const productId = e.target.querySelector(".product__id").innerHTML;
        const productImg = e.target.querySelector(".product__img-inner").innerHTML;
        const productName = e.target.querySelector(".product__name").innerText;
        const productPrice = e.target.querySelector(".product__price--number").innerText;
        
        modalId.innerText = productId;
        modalImg.innerHTML = productImg;
        modalName.innerText = productName;
        modalPrice.innerText = productPrice;
        modalCount.innerText = 1;
        modalTotal.innerText = totaPricePrint(modalCount, modalPrice);
        
        modalToggle(e);
    })

    // 수량 업다운
    const countWrap = document.querySelectorAll(".product__count-wrap")[0];
    
    countWrap.addEventListener("click", function(e) {
        const count = this.querySelector(".product__count");
        const price = this.parentNode.parentNode.querySelector(".product__price--number");
        
        countClick(e, count);
        modalTotal.innerText = totaPricePrint(count, price);
    }) 

    // 모달 장바구니 버튼 클릭
    const modalCartBtn = document.querySelectorAll(".bottom-btn__link--one")[0];
    
    modalCartBtn.addEventListener("click", function(e) {
        modalToggle(e); // 모달 종료
        
        //  최대수량(maxCount) 넘는지 체크
        let result = userCount() + Number(modalCount.innerText);
        if(result > maxCount) {
            alert(`음료는 ${maxCount}개까지 선택가능합니다.`);
            return;
        }
        
        // 선택된 음료 또 선택 시 합침
        let idx = user.findIndex(idx => idx.name === modalName.innerText);
        
        if(idx != -1) {
            user[idx].count = Number(user[idx].count) + Number(modalCount.innerText);
            user[idx].total = numberReplace(user[idx].total) + numberReplace(modalTotal.innerText);
            user[idx].total = user[idx].total.toLocaleString('ko-KR');
            cartMark();
            sessionUpdate("user", JSON.stringify(user))
            return;
        }
        
        arrUpDate(modal, user); // 선택상품 목록 업데이트
        sessionUpdate("user", JSON.stringify(user)); // 선택상품 목록 세션 저장
        cartMark(); // 장바구니 숫자 표기
    })
    
    // 모달 결제하기 버튼 클릭
    const modalNextBtn = document.querySelectorAll(".bottom-btn__link--two")[0];

    modalNextBtn.addEventListener("click", function(e) {
        let paymentItem = [];
        arrUpDate(modal, paymentItem);
        sessionUpdate("paymentItem", JSON.stringify(paymentItem));
    })
    
    // 모달 종료
    const modalBack = document.querySelector(".header__back--modal");

    modalBack.onclick = e => modalToggle(e);   
    
    function modalToggle(e) {
        const modal = document.getElementsByClassName("modal")[0];
        const body = document.querySelector("body");
        
        e.preventDefault();
        modal.classList.toggle("modal--open");
        body.classList.toggle("body--modal");
    }
    
    function arrUpDate(itemListTag, arry) {
        const idTag = itemListTag.querySelectorAll(".product__id");
        const imgTag = itemListTag.querySelectorAll(".product__img-inner");
        const nameTag = itemListTag.querySelectorAll(".product__name");
        const priceTag = itemListTag.querySelectorAll(".product__price--number");
        const countTag = itemListTag.querySelectorAll(".product__count");
        const totalTag = itemListTag.querySelectorAll(".product__total--number");

        arry[arry.length] = {
            id : idTag[0].innerText,
            img : imgTag[0].innerHTML,
            name : nameTag[0].innerText,
            price : priceTag[0].innerText,
            count : Number(countTag[0].innerText),
            total : totalTag[0].innerText,
        };
    }
})

