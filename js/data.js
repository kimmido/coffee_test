let user;

window.addEventListener("pageshow", function(event) {
    if ( event.persisted || (window.performance && window.performance.navigation.type == 2)) { // 뒤로가기 했을 때
        console.log("뒤로가기");
        let data01 = [];
        let data02 = JSON.parse(window.sessionStorage.getItem("user"));
        user = data02 || data01;
        console.log(user, "data01:", user === data01);
        console.log(user, "data02:", user === data02);
    }
})

window.addEventListener("DOMContentLoaded", function() {
    let data01 = [];
    let data02 = JSON.parse(window.sessionStorage.getItem("user"));
    user = data02 || data01;
    console.log(user, "data01:", user === data01);
    console.log(user, "data02:", user === data02);
})


function sessionUpdate(key, value) {
    window.sessionStorage.removeItem(key);
    window.sessionStorage.setItem(key,value);
}