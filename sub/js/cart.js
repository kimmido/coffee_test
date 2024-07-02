window.addEventListener("DOMContentLoaded", function() {
    const cartList = document.getElementsByClassName("cart-list")[0];    
    const totalCount = document.querySelector(".total__txt--count");
    const totalPrice = document.querySelector(".total__txt--price");

    // 장바구니 정보 출력
    let itemList = '';
    user.forEach(item => {
        itemList += `
        <div class="product product--cart">
                <div class="product__img-box">
                    <div class="product__img-inner">
                        <img class="product__img" src="../${item.img.src}" alt="${item.img.alt}">
                    </div>
                </div>
                <div class="poduct__con">
                    <div class="product__txt-box">
                        <span class="product__name">${item.name}</span>
                        <span class="product__price"><span class="product__price--number">${item.price}</span>원</span>
                    </div>
                    <div class="product__count-wrap">
                        <div class="product__decrease-area">
                            <div class="product__decrease-box"> 
                                <span class="decrease__line"></span>
                            </div>
                        </div>
                        <span class="product__count">${item.count}</span>
                        <div class="product__increase-area">
                            <div class="product__increase-box">
                                <span class="increase__line"></span>
                                <span class="increase__line"></span>
                            </div>
                        </div>
                    </div>
                    <span class="product__id product__id--invisible">${item.id}</span>
                    <span class="product__total--number product__total--invisible">${item.total}</span>
                </div><!--poduct__con-->
                <div class="product__del">
                    <img class="product__del-img" src="../images/icon_close_GY.svg" alt="삭제">
                </div>
            </div>`
    })
    cartList.innerHTML = itemList;
    totalCount.innerText = userCount();
    totalPrice.innerText = userTotal();

    //  클릭 이벤트
    const countWrap = document.querySelectorAll(".product__count-wrap");
    const product = document.querySelectorAll(".product--cart");
    const delBtn = document.querySelectorAll(".product__del");
    
    for(let i = 0; i < countWrap.length; i++) {
        countWrap[i].addEventListener("click", function(e) {
            const count = this.querySelector(".product__count");
            const price = this.parentNode.parentNode.querySelector(".product__price--number");
            
            countClick(e, count);
            
            user[i].count = count.innerText;
            user[i].total = totaPricePrint(count, price);
            totalCount.innerText = userCount();
            totalPrice.innerText = userTotal();
            sessionUpdate("user", JSON.stringify(user));
        });
        
        
        delBtn[i].addEventListener("click", function() {
            product[i].remove();
            user.splice(i, 1);
            totalCount.innerText = userCount();
            totalPrice.innerText = userTotal();
            sessionUpdate("user", JSON.stringify(user));
        })
    }
    
    const nextBtn = document.getElementsByClassName("bottom-btn")[0];    
    nextBtn.addEventListener("click", e => {
        if(user.length == 0) {
            e.preventDefault();
            alert("결제할 상품이 없습니다.");
            return;
        } else {
            sessionUpdate("paymentItem", JSON.stringify(user));
        }
    })
})