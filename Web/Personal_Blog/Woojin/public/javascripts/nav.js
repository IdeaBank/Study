window.onscroll = function () { myFunction() };

let navbar = document.getElementById("nav");

let sticky = navbar.offsetTop;

myFunction = function () {
    if (window.pageYOffset >= sticky) {
        navbar.classList.add("sticky")
    } else {
        navbar.classList.remove("sticky");
    }
}