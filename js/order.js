window.addEventListener("pageshow", function() {
    cartMark(); // 장바구니 음료수량 표시
})

window.addEventListener("DOMContentLoaded", () => {
    let categoryList = [];
    getData('/stores/'+storeId+'/products').then(data => {
        categoryList = [
            {
                "name" : "ADE",
                "title" : "에이드",
                "order" : 2
            },
            {
                "name" : "COFFEE",
                "title" : "커피",
                "order" : 1
            }
        ]
    
        categoryList.sort(ascending('order')); // order 오름차순 정렬
        function ascending(key) {
            return (a,b) => (a[key] > b[key] ? 1 : (a[key] < b[key] ? -1 : 0));
        }
    })

    // 상품 목록 출력
    (function orderPrint() {
        let itemAll = [];
        getData('/stores/'+storeId+'/products').then(data => {
            // 예외 시 무한 루프.. 이유는?
            if(data.length === 0) {
                window.location.replace('/errors/fail.html');
                alert("상품을 가져오지 못했습니다.");
                return;
            }
            data.forEach(idx => {
                const img = "data:image/png;base64," + idx.image;
                itemAll[itemAll.length] = {
                    id : idx.productId,
                    img : `<img class="product__img" src=${img} alt=${idx.name}>`,
                    name : idx.name,
                    price : idx.price.toLocaleString('ko-KR'),
                    count : 1,
                    category : idx.category,
                    total : idx.price.toLocaleString('ko-KR'),
                };
            });

            const tabNav = document.querySelector(".tab__nav");
            const tabCon = document.querySelector(".tab__con");
            let htmlNav = "";
            let htmlCon = "";
        
            categoryList.forEach(category => { // 탭 분류
                let item = itemAll.filter(idx =>
                    idx.category === category.name
                );

                htmlNav += '<div class="tab__nav"><a  class="nav__txt" href="#">' + category.title + '</a></div>'; // 탭 버튼
                htmlCon += '<div class="tab__con"><div class="grid-product">' + itemPrint(item) + '</div></div>'; // 탭 콘텐츠
            })
                
            tabNav.insertAdjacentHTML('afterend', htmlNav); // 탭 버튼 출력
            tabCon.insertAdjacentHTML('afterend', htmlCon); // 탭 콘텐츠 출력
            tabCon.innerHTML = '<div class="grid-product">' + itemPrint(itemAll) + '</div>'; // 탭 1번 콘텐츠 출력

            function itemPrint(itemArr) { // ※백틱 안에서 호출하지 않기※
                let itemList = '';
                itemArr.forEach(item => {
                    itemList += `
                    <div class="product">
                        <div class="product__img-box">
                            <div class="product__img-inner">
                            ${item.img}
                            </div>
                        </div>
                        <div class="product__txt-box">
                            <span class="product__name">${item.name}</span>
                            <span class="product__price"><span class="product__price--number">${item.price}</span>원</span>
                        </div>
                        <span class="product__id product__id--invisible">${item.id}</span>
                        <span class="product__count product__count--invisible">${item.count}</span>
                        <span class="product__total--number product__total--invisible">${item.total}</span>
                    </div>`
                })
                return itemList;
            }
        })
    })();

    // 음료준비현황 버튼 생성 유무
    let statusBoolean = window.sessionStorage.getItem('status');
    const statusBtn = document.getElementsByClassName("status-btn")[0];
    
    if(statusBoolean == 'true') {
        statusBtn.classList.add("status-btn--visible");
    } else {
        statusBtn.classList.remove("status-btn--visible");
    }

    // 카트가 비어있으면 메시지 출력
    const orderNextBtn = document.querySelector(".main--order .bottom-btn");
    
    orderNextBtn.addEventListener("click", (e) => {
        if(userCount() === 0 ) {
            e.preventDefault();
            alert("장바구니가 비었습니다.");
        }
    })
})