import mobileNav from './modules/mobile-nav.js';
import articlesSlider from './modules/articles-slider';
import gallerySlider from "./modules/gallery-slider";
import zoomImg from "./modules/zoomImg";
import customTabs from "./modules/tabs";

document.addEventListener('DOMContentLoaded', ()=> {

    mobileNav();

    gallerySlider();
    articlesSlider();
    zoomImg();
    customTabs();

})

// import isAvifWebp from 'avif-webp-checker';
// isAvifWebp({ mode: 'webp' });
