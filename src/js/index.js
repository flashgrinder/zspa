import mobileNav from './modules/mobile-nav.js';
import articlesSlider from './modules/articles-slider';
import gallerySlider from "./modules/gallery-slider";
document.addEventListener('DOMContentLoaded', ()=> {

    mobileNav();

    gallerySlider();
    articlesSlider();

})

// import isAvifWebp from 'avif-webp-checker';
// isAvifWebp({ mode: 'webp' });
