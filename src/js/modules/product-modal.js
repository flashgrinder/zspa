import HystModal from "hystmodal";

function productPopup() {

    let itemList = Array.from(document.querySelectorAll('.js-catalog-products'));
    let titleModal = document.querySelector('.js-product-title-modal');
    let imgModal = document.querySelector('.js-product-img-modal');
    let inputModal = document.querySelector('.js-input-product');

    let imgInfoModal = document.querySelector('.js-product-info-img-modal');
    let titleInfoModal = document.querySelector('.js-product-info-title-modal');

    const modalInfoProps = document.querySelector(".modal__product-props");

    itemList.forEach(items => {
        const elements = [...items.children];

        elements.forEach(item => {
            item.addEventListener('click', () => {
                const itemImg = item.querySelector(".js-catalog-product-pic").getElementsByTagName("img")[0].src;
                const itemTitle = item.querySelector(".js-catalog-product-info").getElementsByTagName("h3")[0].innerText;
                const productId = item.querySelector(".js-product-id").dataset.productId;

                const itemParamName = Array.from(item.querySelectorAll('.catalog__product-param-name'));
                const itemParamValue = Array.from(item.querySelectorAll('.catalog__product-param-value'));

                itemParamName.forEach(itemModal => {
                    modalInfoProps.innerHTML = `<div class="modal__product-param-name text text--small text--gray-400 text--w-regular">
                                                ${itemModal.innerText}:
                                            </div>`;
                })

                titleModal.innerHTML = itemTitle;
                titleInfoModal.innerHTML = itemTitle;
                inputModal.value = productId;

                imgModal.src = itemImg;
                imgInfoModal = itemImg;

            })
        })
    })

    const modalProduct = new HystModal({
        linkAttributeName: "data-hystmodal",
    })

}

export default productPopup;