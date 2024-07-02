window.addEventListener("DOMContentLoaded", function() {
    storeId = window.sessionStorage.getItem('storeId');
    getData('/managers/phone?storeId=' + storeId).then(data => {
        const menuLink = document.getElementsByClassName("menu__link")[0];
        if(menuLink !== undefined) {
            menuLink.href = "tel:" + data.phone;
        }
    })
})