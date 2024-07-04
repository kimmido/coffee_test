let storeId;
let maxCount = 3;

function getUrlParams() {
    const params = {};

    window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (str, key, value) {
        params[key] = value;
    });

    return params;
}

window.addEventListener('DOMContentLoaded', function () {
    let link = document.location.href;
    let loading = link.endsWith('loading.html');
    let entry;

    if (!loading) {
        entry = window.sessionStorage.getItem('entry');
        setStoreName();

        if (entry != 'true') {
            location.replace('/crc_test/loading.html');
        }
    }

    if (loading) {
        setTimeout(function () {
            location.replace('/crc_test/order.html');
        }, 2000);
        window.sessionStorage.setItem('entry', 'true');
    }
});

function setStoreName() {
    const locationTag = document.getElementsByClassName('location__name')[0];
    if (locationTag !== undefined) {
        let storeName = window.sessionStorage.getItem('storeName');
        if (storeName === null) {
            window.sessionStorage.setItem('storeName', '부천');
            locationTag.innerHTML = '부천';
        } else {
            locationTag.innerHTML = storeName;
        }
    }
}

window.addEventListener('load', function () {
    const whiteScreen = document.getElementsByClassName('white-screen')[0];

    if (whiteScreen !== undefined) {
        setTimeout(() => {
            // 페이지 로드 0.1초 후 하얀 화면 삭제
            whiteScreen.remove();
        }, 100);
    }
});
