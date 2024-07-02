window.addEventListener("DOMContentLoaded", () => {
    const tabNavBox = document.getElementsByClassName("tab__nav-box")[0];
    // 탭메뉴 선택 시 컨텐츠 보이기
    tabNavBox.addEventListener('click', function(e) {
        const tabCon = document.getElementsByClassName("tab__con");
        const tabNav = tabNavBox.getElementsByClassName("tab__nav");
        const index = [...tabNav].indexOf(e.target);
        
        if(!e.target.matches(".tab__nav")) return;
        
        [...tabNav].forEach(nav => {
            nav.classList.toggle("tab__nav--on", nav === e.target);
        });
        
        // 탭메뉴 선택 시 내용 변경
        [...tabCon].forEach(con => {
            con.classList.toggle("tab__con--on", con === tabCon[index]);
        }) 
    })
})