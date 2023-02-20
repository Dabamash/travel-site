class MobileMenu {
  constructor() {
    this.MenuIcon = document.querySelector(".site-header__menu-icon")
    this.menuContent = document.querySelector(".site-header__menu-content")
    this.siteHeader = document.querySelector(".site-header")
    this.events()
  }

  events() {
    this.MenuIcon.addEventListener("click", () => this.toggleTheMenu())
  }

  toggleTheMenu() {
    this.menuContent.classList.toggle("site-header__menu-content--is-visible")
    this.siteHeader.classList.toggle("site-header--is-expanded")
    this.MenuIcon.classList.toggle("site-header__menu-icon--close-x")
  }

}

export default MobileMenu;