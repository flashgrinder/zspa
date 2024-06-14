import Splide from '@splidejs/splide';
import { Grid } from '@splidejs/splide-extension-grid';
import '@splidejs/splide/css';

function gallerySlider () {

    const gallerySliderTrue = document.querySelector('.js-gallery-init-slider');
    if (gallerySliderTrue) {
        const gallerySlider = new Splide( '.js-gallery-init-slider', {
            type   : 'loop',
            height: '30rem',
            perPage: 2.5,
            focus: 'center',
            perMove: 1,
            gap: '2px',
            autoplay: true,
            // arrows: false,
            pagination: false,
            grid: {
                dimensions: [ [ 1, 1 ], [ 2, 2 ], [ 2, 1 ], [ 1, 2 ], [ 2, 2 ], [ 3, 2 ] ],
                gap: {
                    row: '2px',
                    col: '2px'
                }
            },
            breakpoints: {
                767: {
                    perPage: 1
                },
                1024: {
                    perPage: 3,
                }
            }
        } );
        gallerySlider.mount({ Grid });
    }

}

export default gallerySlider;