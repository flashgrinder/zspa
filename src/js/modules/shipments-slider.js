import Splide from '@splidejs/splide';
import '@splidejs/splide/css';

function shipmentsSlider () {

    const shipmentsSliderTrue = document.querySelector('.js-shipments-init-slider');
    if (shipmentsSliderTrue) {
        const shipmentsSlider = new Splide( '.js-shipments-init-slider', {
            type   : 'loop',
            perPage: 4,
            perMove: 1,
            gap: 16,
            autoplay: true,
            classes: {
                arrows: 'splide__arrows shipments__splide-arrows',
                arrow : 'splide__arrow shipments__splide-arrow',
                prev  : 'splide__arrow--prev shipments__splide-arrow--prev',
                next  : 'splide__arrow--next shipments__splide-arrow--next',
            },
            pagination: 'splide__pagination shipments__splide-pagination',
            page      : 'splide__pagination__page shipments__splide-page',
            breakpoints: {
                767: {
                    perPage: 1
                },
                1024: {
                    perPage: 3,
                }
            }
        } );
        shipmentsSlider.mount();
    }

}

export default shipmentsSlider;