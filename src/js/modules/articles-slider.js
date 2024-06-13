import Splide from '@splidejs/splide';
import '@splidejs/splide/css';

function articlesSlider () {

    const articlesSliderTrue = document.querySelector('.js-articles-init-slider');
    if (articlesSliderTrue) {
        const articlesSlider = new Splide( '.js-articles-init-slider', {
            type   : 'loop',
            perPage: 5,
            perMove: 1,
            gap: 16,
            autoplay: true,
            arrows: false,
            pagination: false,
            breakpoints: {
                767: {
                    perPage: 1
                },
                1024: {
                    perPage: 3,
                }
            }
        } );
        articlesSlider.mount();
    }

}

export default articlesSlider;