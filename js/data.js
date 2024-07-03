let user;

window.addEventListener("pageshow", function(event) {
    if ( event.persisted || (window.performance && window.performance.navigation.type == 2)) { // 뒤로가기 했을 때
        console.log("뒤로가기");
        let defaultData = [];
        let userData = JSON.parse(window.sessionStorage.getItem("user"));
        user = userData || defaultData;
    }
})

window.addEventListener("DOMContentLoaded", function() {
    let defaultData = [];
    let userData = JSON.parse(window.sessionStorage.getItem("user"));
    user = userData || defaultData;
})


function sessionUpdate(key, value) {
    window.sessionStorage.removeItem(key);
    window.sessionStorage.setItem(key,value);
}