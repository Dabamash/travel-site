import './style.css'
import MobileMenu from './modules/js/MobileMenu'
import RevealOnScroll from './modules/js/RevealOnScroll'

new RevealOnScroll(document.querySelectorAll(".featured-item"), 75)
new RevealOnScroll(document.querySelectorAll(".testimonial"), 60)

let mobileMenu = new MobileMenu();

if (module.hot) {
  module.hot.accept()
}