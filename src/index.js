import './style.css';
import MobileMenu from './modules/js/MobileMenu';

let mobileMenu = new MobileMenu();

if (module.hot) {
  module.hot.accept();
};

