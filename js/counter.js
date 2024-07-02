function countClick(e, countTag) {
    const increase = e.target.matches(".product__increase-area");
    const decrease = e.target.matches(".product__decrease-area");

    if(increase) {
        if(countTag.innerText == maxCount || userCount() == maxCount) {
            alert(`음료는 ${maxCount}개까지 선택가능합니다.`);
            return;
        }
        countTag.innerText++;
    }
    
    if(decrease) {
        if(countTag.innerText == 1) return;
        countTag.innerText--;
    }
}

function userCount() {
    let result = 0;
    
    user.forEach(idx => {
        result += Number(idx.count);
    })
    
    return result;
}

function userTotal() {
    let result = 0;
    
    user.forEach(idx => {
        result += numberReplace(idx.total);
    })
    result = result.toLocaleString('ko-KR')
    
    return result;
}

function cartMark() {
    const cartNum = document.getElementsByClassName("cart-number")[0];
    if(!user) {
        cartNum.classList.remove("cart-number--visible");
        return;
    } 
    if(userCount() <= 0) {
        cartNum.classList.remove("cart-number--visible");
        return;
    }
    
    cartNum.classList.add("cart-number--visible");
    cartNum.innerText = userCount();
}