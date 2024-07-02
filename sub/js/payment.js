window.addEventListener("DOMContentLoaded", function() {
    const payItemList = document.getElementsByClassName("product-list")[0];
    const paymentItem = JSON.parse(window.sessionStorage.getItem('paymentItem'));
    const host = window.location.protocol + "//" + window.location.host;
    
    // 결제 상품 목록 출력
    let itemList = '';
    paymentItem.forEach(item => {
        itemList += `
        <li class="product product-payment">
            <div class="product__img-box">
                <div class="product__img-inner">
                    ${item.img}
                </div>
            </div>
            <div class="product__txt-box">
                <span class="product__name">${item.name}</span>
                <div class="txt-flex">
                    <span class="product__count-box">
                        <span class="product__count">${item.count}</span> 개
                    </span>
                    <span class="product__price"><span class="product__price--number">${item.price}</span>원</span>
                </div>
            </div><!--product__txt-box-->
            <span class="product__id product__id--invisible">${item.id}</span>
            <span class="product__total--number product__total--invisible">${item.total}</span>
        </li>`
    })
    payItemList.innerHTML = itemList;
    
    // 총 결제금액 출력
    const totalPrice = document.querySelector(".total__price--number");
    let total = 0;
    paymentItem.forEach(idx => {
        total += numberReplace(idx.total);
    })
    totalPrice.innerText = total.toLocaleString('ko-KR');

    const consent = document.getElementsByClassName("consent__check")[0];
    const payBtn = document.getElementsByClassName("bottom-btn__link")[0];
    
    // 구매 진행 동의 체크
    payBtn.onclick = function(e) {
        if(consent.checked) {
            e.preventDefault();
            const storeId = window.sessionStorage.getItem("storeId");
    
            let payProducts = [];
            paymentItem.forEach(idx => {
                payProducts[payProducts.length] = {
                    "productId" : idx.id,
                    "amount" : idx.count
                }
            })
    
            getData('/stores/status/' + storeId).then(data => {
                if(data.status === 'error' || data.status === 'ERROR' ) {
                    location.replace("/errors/fail.html");
                }
            })
    
            post("/payments/ready", {
                "storeId" : storeId,
                "productInfoList" : payProducts
            })
            .then(response => {
                window.sessionStorage.setItem("orderId", response.orderId);
                if(response.amount === 0) {
                    location.replace("/sub/complete.html");
                } else {
                    requestPay(response.merchantUid, total)
                }
            })
        } else {
            e.preventDefault();
            consent.classList.add("consent__check--emph");
            alert("구매 진행에 동의해주세요.");
        }
    }
})