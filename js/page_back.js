window.addEventListener("DOMContentLoaded",function() {
    const backBtn = document.getElementsByClassName("header__back")[0];

    backBtn.addEventListener("click", function(e) {
        if(document.referrer) {
            e.preventDefault();
            window.history.back();
        }
    })
})