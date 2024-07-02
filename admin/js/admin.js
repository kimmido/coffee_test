window.addEventListener("DOMContentLoaded", () => {
    const adminTitleTag = document.getElementsByClassName("header__title")[0];
    getData('/admin/storeName').then(data => {
        adminTitleTag.innerHTML = data.storeName + '점 ' + adminTitleTag.innerHTML;
    })

    const tabNav = document.getElementsByClassName("tab__nav");

    // ====== 주문이력관리 ======
    const orderTable = document.querySelector('.order-table > tbody');
    const arrange = document.querySelector('select[name="arrange__btn"]');
    const filter = document.querySelector('select[name="filter__btn"]');
    
    let order;
    // order = [
        // {
        //     orderId: "1",
        //     date: "2023-07-24",
        //     time: "13:00:00",
        //     phone: "01012345678",
        //     product: ["아이스 아메리카노(2)", "핫 아메리카노(1)"],
        //     price: 4500,
        //     count: 3,
        //     result: "DONE",
        // }
    // ];

    getData('/admin/events/order').then(data => {
        orderPrint(data, orderTable);
    })

    // 필터 거친 뒤 정렬
    tabNav[0].addEventListener("click", () => { // 탭메뉴 클릭 시
        filterAction()
    })

    arrange.onchange = () => { // 정렬 클릭 시
        filterAction()
    }
    
    filter.onchange = () => { // 필터 클릭 시
        filterAction()
    }

    // 필터링 액션
    function filterAction() {
        const checked = filter.querySelector("option:checked").value

        getData('/admin/events/order?dateType=' + checked).then(data => {
            data.forEach(idx => {
                if(idx.result === "DONE") {
                    idx.filterNum = "1";
                }
                else if(idx.result === "WAIT") {
                    idx.filterNum = "2";
                }
                else if(idx.result === "PROGRESS") {
                    idx.filterNum = "3";
                }
                else if(idx.result === "ERROR") {
                    idx.filterNum = "4";
                }
                else if(idx.result === "CANCEL") {
                    idx.filterNum = "5";
                }
            })
            arrangeAction(data);
        })
    }

    // 정렬 액션
    function arrangeAction(arr) {
        const checked = arrange.querySelector("option:checked").value
        switch (checked) {
            case 'newest': 
                arr.sort(date_descending);
                break;
            case 'oldest': 
                arr.sort(date_ascending);
                break;        
            case 'success':
                arr.sort(result_ascending);
                break;
            case 'fail':
                arr.sort(result_descending);
                break;
        }
        orderPrint(arr, orderTable);
    }
    
    // 내림차순 = 최신순
    function date_descending(a, b) {
        let dateA = new Date(a['date'] + ' ' + a['time']).getTime();
        let dateB = new Date(b['date'] + ' ' + b['time']).getTime();
        return dateA < dateB ? 1 : dateA > dateB ? -1 : 0;
    }

    // 오름차순 = 오래된 순
    function date_ascending(a, b) {
        let dateA = new Date(a['date'] + ' ' + a['time']).getTime();
        let dateB = new Date(b['date'] + ' ' + b['time']).getTime();
        return dateA > dateB ? 1 : dateA < dateB ? -1 : 0;
    }
    
    // 성공 우선순
    function result_ascending(a, b) {
        return a['filterNum'] > b['filterNum'] ? 1 : a['filterNum'] < b['filterNum'] ? -1 : 0;
    }

    // 실패 우선순
    function result_descending(a, b) {
        return a['filterNum'] < b['filterNum'] ? 1 : a['filterNum'] > b['filterNum'] ? -1 : 0;
    }
    
    function orderPrint(data, tag) {
        order = data;
        let print = '';
        data.forEach(idx => {
            switch (idx.result) {
                case "DONE":
                    idx.className = "success";
                    idx.resultTxt = "성공";
                    break;
                case "WAIT":
                    idx.className = "success";
                    idx.resultTxt = "대기";
                    break;
                case "PROGRESS":
                    idx.className = "success";
                    idx.resultTxt = "진행중";
                    break;
                case "ERROR":
                    idx.className = "fail";
                    idx.resultTxt = "실패";
                    break;
                case "CANCEL":
                    idx.className = "fail";
                    idx.resultTxt = "취소";
                    break;
            }
            print += `
            <tr>
                <td class="order-id order-id--invisible">${idx.orderId}</td>
                <td class="event-id event-id--invisible">${idx.eventId}</td>
                <td class="date">${idx.date} ${idx.time}</td>
                <td class="phone">${idx.phone ?? '-'}</td>
                <td class="price">${(idx.price ?? '-').toLocaleString('ko-KR')}</td>
                <td>
                    <div class="result result--${idx.className}">
                        <span class="result-txt">${idx.resultTxt}</span>
                    </div>
                </td>
            </tr>`
        })
        tag.innerHTML = print;
    }


    // ====== 모달 ======
    const modal = document.querySelector('.tab__con--on .overlay');

    orderTable.onclick = e => { // 주문일자 클릭 시 모달 열림
        if(!e.target.matches('.date')) return;
        modal.classList.toggle('overlay-open');

        // 선택한 목록 아이디 받아서 order에서 찾기
        const eventId = e.target.parentElement.querySelector(".event-id").innerText; // 선택한 목록 id
        let findItem = order.find(idx => idx.eventId == eventId); // order배열에서 찾기

        const modalDate = modal.querySelector(".detail__date");
        const modalPhone = modal.querySelector(".detail__phone");
        const modalPrice = modal.querySelector(".detail__price");
        const modalProduct = modal.querySelector(".detail__product");
        const modalResult = modal.querySelector(".detail__result");
        
        let products = '';
        findItem.products.forEach(item => {
            products += `<span class="product__item">${item}</span>`
        })

        modalDate.innerText = findItem.date;
        modalPhone.innerText = findItem.phone ?? '-';
        modalProduct.innerHTML = products;
        modalPrice.innerHTML = findItem.price === null ? '-' : `${findItem.price.toLocaleString('ko-KR')}(총 ${findItem.count}잔)`;
        modalResult.innerHTML = `<span class="detail__result--${findItem.className}">${findItem.resultTxt}<br>${findItem.cause}</span>`;
    }
    
    // 모달 종료
    const closeBtn = document.querySelector('.tab__con--on .close-btn')
    closeBtn.onclick = () => {
        modal.classList.toggle('overlay-open');
    }


    // ====== 주문대기열 ======
    const queueTable = document.querySelector('.queue-table > tbody');
    const resetBtn = document.querySelector(".queue-wrap .reset-btn");

    let queue = [];

    tabNav[1].addEventListener("click", () => {
        getData('/orders/waits' + '?storeId=' + 1).then(data => {
            let print = '';
            queue = data;
            queue.forEach(idx => {
                print += `
                <tr>
                    <td style="display: none" class="order-id">${idx.orderId}</td>
                    <td class="order-number">${idx.orderNumber}</td>
                    <td class="date">${idx.dateTime}</td>
                    <td class="status">${idx.orderStatus}</td>
                    <td class="del">삭제</td>
                </tr>`
            })
            queueTable.innerHTML = print;
        })
    })

    queueTable.onclick = e => { // 삭제 버튼 클릭시 제거
        if(!e.target.matches('.del')) return;
        if(!confirm("선택한 주문을 취소하시겠습니까?")) return;
        
        let target = e.target.parentElement;
        let orderId = target.querySelector(".order-id").innerText;
        let findItem = queue.find(idx => idx.orderId === orderId);

        queue.splice(queue.indexOf(findItem), 1); // queue배열에서 제거
        target.remove(); // html 제거

        deleteRequest("/orders/waits/" + orderId, null)
            .then(r => r)
    }

    resetBtn.onclick = () => { // 주문대기열 초기화
        if(!confirm("전체 내역을 초기화하시겠습니까?")) return;
        queueTable.innerHTML = '';
        queue = [];

        deleteRequest("/orders/waits/all" + "?storeId=" + 1, null)
            .then(r => r)
    }

    // ====== 상태이력관리 ======
    const historyTable = document.querySelector('.history-table > tbody');
    
    tabNav[2].addEventListener("click", () => {
        getData('/admin/events/error').then(data => {
            let print = '';
            data.forEach(idx => {
                print += `
                <tr>
                    <td class="date">${idx.dateTime}</td>
                    <td class="error">${idx.message}</td>
                </tr>`
            })
            historyTable.innerHTML = print;
        })
    })
})