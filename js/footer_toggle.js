window.addEventListener("DOMContentLoaded", function() {
    const footerBtn = document.getElementsByClassName("footer__accordion")[0];
    
    footerBtn.onclick = function() {
        const arrow = this.querySelectorAll(".accordion__icon")[0];
        const footerCon = document.querySelectorAll(".business-info")[0];
        
        arrow.classList.toggle("accordion__icon--open");
        footerCon.classList.toggle("business-info--visible");
    }
})