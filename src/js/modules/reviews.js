import Splide from '@splidejs/splide';
import { Grid } from '@splidejs/splide-extension-grid';
import '@splidejs/splide/css';

function reviewsSlider () {

    const reviewsSliderTrue = document.querySelector('.js-reviews-init-slider');
    if (reviewsSliderTrue) {
        const reviewsSlider = new Splide( '.js-reviews-init-slider', {
            type   : 'loop',
            height: '25rem',
            perPage: 2,
            // focus: 'center',
            perMove: 1,
            gap: '24px',
            autoplay: false,
            classes: {
                arrows: 'splide__arrows reviews__splide-arrows',
                arrow : 'splide__arrow reviews__splide-arrow',
                prev  : 'splide__arrow--prev reviews__splide-arrow--prev',
                next  : 'splide__arrow--next reviews__splide-arrow--next',
            },
            pagination: 'splide__pagination reviews__splide-pagination',
            page      : 'splide__pagination__page reviews__splide-page',
            grid: {
                dimensions: [ [ 2, 1 ], ],
                gap: {
                    row: '24px',
                    col: '24px'
                }
            },
            breakpoints: {
                576: {
                    height: 'auto',
                    grid: {
                        dimensions: [ [ 1, 1 ], ],
                        gap: {
                            row: '0px',
                            col: '0px'
                        }
                    },
                },
                767: {
                    perPage: 1
                },
                1024: {
                    perPage: 3,
                }
            }
        } );
        reviewsSlider.mount({ Grid });
    }

}

export default reviewsSlider;