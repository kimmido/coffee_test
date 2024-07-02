let storeId, maxCount;

function getUrlParams() {
    const params = {};

    window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi,
        function(str, key, value) {
            params[key] = value;
        }
    );

    return params;
}

window.addEventListener("DOMContentLoaded", function() {
    let link =  document.location.href;
    let loading = link.endsWith("loading.html");
    let entry;

    storeId = getUrlParams().storeId;
    if(storeId === undefined) {
        storeId = window.sessionStorage.getItem('storeId');
    }
    if(storeId === null) {
        storeId = 1;
    }
    window.sessionStorage.setItem('storeId', storeId);
    
    if(!loading) {
        const path = window.location.pathname;
        if(path.startsWith('/error')) {
            getData('/stores/status/' + storeId).then(data => {
                if(data.status === 'error' || data.status === 'ERROR' ) {
                    if(path !== "/errors/rmsFail.html") {
                        location.replace("/errors/rmsFail.html");
                    }
                } else {
                    location.replace('/');
                }
            })
            return;
        }
        entry = window.sessionStorage.getItem("entry");
        setStoreName();

        if(entry != "true") {
            location.replace("/loading.html");
        }
    }
    
    if(loading) {
        setTimeout(function() {
            location.replace("./order.html");
        }, 2000);
        window.sessionStorage.setItem("entry", "true");
    }
    
    getData('/stores/status/' + storeId).then(data => {
        if(data.status === 'error' || data.status === 'ERROR' ) {
            location.replace("/errors/rmsFail.html");
        }
    })
})

function setStoreName() {
    const locationTag = document.getElementsByClassName("location__name")[0];
    if(locationTag !== undefined) {
        let storeName = window.sessionStorage.getItem("storeName");
        if(storeName === null) {
            getData('/stores/' + storeId).then(data => {
                window.sessionStorage.setItem("storeName", data.name);
                window.sessionStorage.setItem("maxCount", data.maxOrderItemSize);
                locationTag.innerHTML = data.name;
            })
        } else {
            locationTag.innerHTML = storeName;
        }
    }
}

window.addEventListener("load", function() {
    const whiteScreen = document.getElementsByClassName("white-screen")[0];

    if (whiteScreen !== undefined) {
        setTimeout(() => { // 페이지 로드 0.1초 후 하얀 화면 삭제
            whiteScreen.remove();
        }, 100);
    }
})