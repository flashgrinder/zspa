import mobileNav from './modules/mobile-nav.js';
import articlesSlider from './modules/articles-slider';
import gallerySlider from "./modules/gallery-slider";
import zoomImg from "./modules/zoomImg";
import customTabs from "./modules/tabs";
import reviewsSlider from "./modules/reviews";
import shipmentsSlider from "./modules/shipments-slider";
import productModal from "./modules/product-modal";

document.addEventListener('DOMContentLoaded', ()=> {

    mobileNav();

    gallerySlider();
    articlesSlider();
    zoomImg();
    customTabs();
    reviewsSlider();
    shipmentsSlider();
    productModal();

})

// import isAvifWebp from 'avif-webp-checker';
// isAvifWebp({ mode: 'webp' });
