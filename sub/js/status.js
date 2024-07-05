window.addEventListener("DOMContentLoaded", function() {
    (function historyPrint() { // 결제 내역 목록 출력
        // const method = document.getElementsByClassName("payment__method")[0];
        const dateBox = document.getElementsByClassName("payment__date")[0];
        const productWrap = document.getElementsByClassName("product-list")[0];
        const totalPrice = document.getElementsByClassName("total__price")[0];
        const phoneBox = document.getElementsByClassName("phone")[0];
        const phoneNum = phoneBox.querySelector(".phone__num");
        const orderIdTag = document.querySelector(".order-id");
        
        const orderNumber = window.sessionStorage.getItem("orderNumber");
    
        // 결제 상품 목록
        let total = 0;
        orderIdTag.innerText = orderNumber; // 주문 번호
    
        // date.innerText = data.paidDate; // 결제 일자
        dateBox.innerText = window.sessionStorage.getItem('dateInfo');
        
        let phone = window.sessionStorage.getItem('phone'); // 전화번호
        if(phone) { 
            phoneNum.innerText = phone.replace(/^(\d{3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);;
        } else {
            phoneBox.remove();
        }

        const orderList = JSON.parse(window.sessionStorage.getItem('order'));
        console.log(orderList);

        let itemList = '';
        orderList.forEach(idx => {
            idx.price = numberReplace(idx.price);
            itemList += `
            <div class="product__flex">
                <span class="product__name">${idx.name}</span>
                <span class="product__price"><span class="product__price--number">${idx.price.toLocaleString('ko-KR')}</span></span>
                <span class="product__count-box">
                    <span class="product__count">${idx.count}</span> 개
                </span>
                <span class="product__total"><span class="product__total--number">${(idx.price * idx.count).toLocaleString('ko-KR')}</span></span>
            </div>`
            total += idx.price * idx.count;
        });
        productWrap.innerHTML = itemList; // 결제 목록
        total = total.toLocaleString('ko-KR')
        totalPrice.innerText = total + '원'; // 결제 금액
    })();
    
    // 준비현황 출력
    const robot = document.getElementsByClassName("robot")[0];
    let currentStatus, message, orderStatus;
    let statusList = ['WAIT', 'PROGRESS', 'DONE'];
    let i = 0
    
    currentValue();
    let print = setInterval(() => currentValue(), 2000);
    
    function currentValue() { // 현재 음료현황 출력
        orderStatus = statusList[i];
        i++;

        switch(orderStatus) {
            case 'WAIT' :
                message = '제조 <span class="robot__txt--emph">대기중</span>입니다.';
                break;
            case 'PROGRESS' :
                message = '음료가 <span class="robot__txt--emph">준비중</span>입니다.';
                break;
            case 'DONE' :
                message = '음료 준비가 <span class="robot__txt--emph">완료</span>되었습니다.';
                // 전체 정보를 초기화를 해줘야 한다.?
                window.sessionStorage.setItem('status', false); // 음료준비현황 버튼 보이지 않기
                break;
            default :
                window.location.replace('/');
        }

        if(currentStatus !== orderStatus) { // 현황데이터가 달라지면 말풍선 추가
            currentStatus = orderStatus;
            robot.insertAdjacentHTML('beforeend', `
                <div class="speech-bubble speech-bubble--robot">
                        <strong class="robot__txt">${message}</strong>
                </div>`
            );
        }

        if(i >= statusList.length) clearInterval(print);
    }
})