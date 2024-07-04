window.addEventListener('pageshow', function () {
    cartMark(); // 장바구니 음료수량 표시
});

window.addEventListener('DOMContentLoaded', () => {
    let categoryList = [];
    categoryList = [
        {
            name: 'ADE',
            title: '에이드',
            order: 2,
        },
        {
            name: 'COFFEE',
            title: '커피',
            order: 1,
        },
    ];

    categoryList.sort(ascending('order')); // order 오름차순 정렬
    function ascending(key) {
        return (a, b) => (a[key] > b[key] ? 1 : a[key] < b[key] ? -1 : 0);
    }

    // 상품 목록 출력
    (function orderPrint() {
        let itemAll = [];
        itemAll = [
            {
                id: 0,
                img: {
                    src : '/images/아메리카노_HOT_255.png',
                    alt : '따뜻한 아메리카노'
                },
                name: '핫 아메리카노',
                price: '1,500',
                count: 1,
                category: 'COFFEE',
                total: '1,500',
            },
            {
                id: 1,
                img: {
                    src : '/images/아메리카노_ICE_255.png',
                    alt : '아이스 아메리카노'
                },
                name: '아이스 아메리카노',
                price: '1,500',
                count: 1,
                category: 'COFFEE',
                total: '1,500',
            },
            {
                id: 2,
                img: {
                    src : '/images/아메리카노_HOT_255.png',
                    alt : '따뜻한 아메리카노'
                },
                name: '핫 아메리카노',
                price: '1,500',
                count: 1,
                category: 'COFFEE',
                total: '1,500',
            },
            {
                id: 3,
                img: {
                    src : '/images/아메리카노_HOT_255.png',
                    alt : '따뜻한 아메리카노'
                },
                name: '핫 아메리카노',
                price: '1,500',
                count: 1,
                category: 'COFFEE',
                total: '1,500',
            },
            {
                id: 4,
                img: {
                    src : '/images/아메리카노_HOT_255.png',
                    alt : '레몬 에이드'
                },
                name: '레몬 에이드',
                price: '2,500',
                count: 1,
                category: 'ADE',
                total: '2,500',
            }
        ];

        const tabNav = document.querySelector('.tab__nav');
        const tabCon = document.querySelector('.tab__con');
        let htmlNav = '';
        let htmlCon = '';

        categoryList.forEach((category) => {
            // 탭 분류
            let item = itemAll.filter((idx) => idx.category === category.name);

            htmlNav += '<div class="tab__nav"><a  class="nav__txt" href="#">' + category.title + '</a></div>'; // 탭 버튼
            htmlCon += '<div class="tab__con"><div class="grid-product">' + itemPrint(item) + '</div></div>'; // 탭 콘텐츠
        });

        tabNav.insertAdjacentHTML('afterend', htmlNav); // 탭 버튼 출력
        tabCon.insertAdjacentHTML('afterend', htmlCon); // 탭 콘텐츠 출력
        tabCon.innerHTML = '<div class="grid-product">' + itemPrint(itemAll) + '</div>'; // 탭 1번 콘텐츠 출력

        function itemPrint(itemArr) {
            // ※백틱 안에서 호출하지 않기※
            let itemList = '';
            itemArr.forEach((item) => {
                itemList += `
                    <div class="product">
                        <div class="product__img-box">
                            <div class="product__img-inner">
                                <img class="product__img" src=".${item.img.src}" alt="${item.img.alt}">
                            </div>
                        </div>
                        <div class="product__txt-box">
                            <span class="product__name">${item.name}</span>
                            <span class="product__price"><span class="product__price--number">${item.price}</span>원</span>
                        </div>
                        <span class="product__id product__id--invisible">${item.id}</span>
                        <span class="product__count product__count--invisible">${item.count}</span>
                        <span class="product__total--number product__total--invisible">${item.total}</span>
                    </div>`;
            });
            return itemList;
        }
        // });
    })();

    // 음료준비현황 버튼 생성 유무
    let statusBoolean = window.sessionStorage.getItem('status');
    const statusBtn = document.getElementsByClassName('status-btn')[0];

    if (statusBoolean == 'true') {
        statusBtn.classList.add('status-btn--visible');
    } else {
        statusBtn.classList.remove('status-btn--visible');
    }

    // 카트가 비어있으면 메시지 출력
    const orderNextBtn = document.querySelector('.main--order .bottom-btn');

    orderNextBtn.addEventListener('click', (e) => {
        if (userCount() === 0) {
            e.preventDefault();
            alert('장바구니가 비었습니다.');
        }
    });
});
