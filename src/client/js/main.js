import '../scss/styles.scss';
import regeneratorRuntime from "regenerator-runtime";

const navBarBtn = document.querySelector(".nav__bar");
const userBar = document.querySelector(".user__bar");


const handleNavBarActive = () => {
  userBar.classList.toggle("bar__hidden");
}

navBarBtn.addEventListener("click", handleNavBarActive);