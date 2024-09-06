import HystModal from "hystmodal";
import $ from "jquery";
function productPopup() {

    const itemList = Array.from(document.querySelectorAll('.js-catalog-products'));
    const titleModal = document.querySelector('.js-product-title-modal');
    const imgModal = document.querySelector('.js-product-img-modal');
    const inputModal = document.querySelector('.js-input-product');

    let imgInfoModal = document.querySelector('.js-product-info-img-modal');
    const titleInfoModal = document.querySelector('.js-product-info-title-modal');

    // const modalInfoProps = document.querySelector(".modal__product-props");

    itemList.forEach(items => {
        const elements = [...items.children];

        elements.forEach(item => {
            item.addEventListener('click', () => {
                const itemImg = item.querySelector(".js-catalog-product-pic").getElementsByTagName("img")[0].src;
                const itemTitle = item.querySelector(".js-catalog-product-info").getElementsByTagName("h3")[0].innerText;
                const productId = item.querySelector(".js-product-id").dataset.productId;

                // const itemParamName = Array.from(item.querySelectorAll('.catalog__product-param-name'));
                // const itemParamValue = Array.from(item.querySelectorAll('.catalog__product-param-value'));
                //
                // itemParamName.forEach(itemModal => {
                //     modalInfoProps.innerHTML = `<div class="modal__product-param-name text text--small text--gray-400 text--w-regular">
                //                                 ${itemModal.innerText}:
                //                             </div>`;
                // })

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

    $(function () {
        $('body').on('submit', '.js-ajax-form', function (e) {
            e.preventDefault();
            let $form = $(this);
            if (!$form.hasClass('in-ajax')) {
                $form.addClass('in-ajax');

                let url = $form.attr("action");

                let scrollOnError = $form.data('scroll-on-error');
                $form.find(".is-error").removeClass("is-error");
                $form.find(".is-success").removeClass("is-success");
                $form.find(".has-error").removeClass("has-error");
                $form.find(".has-success").removeClass("has-success");
                let $ajaxMsg = $form.find(".js-ajax-msg");
                $ajaxMsg.html("&nbsp;");
                let formData = new FormData($form[0]);

                $.ajax({
                    type: "POST",
                    enctype: 'multipart/form-data',
                    url: url,
                    data: formData,
                    processData: false,
                    contentType: false,
                    cache: false,
                    timeout: 20000,
                    success: function (data) {
                        try {
                            var res = JSON.parse(data);
                            if (res.STATUS == 1) {

                                if (res.RELOAD == 1) {
                                    setTimeout(function () {
                                        location.reload();
                                    }, 500);
                                }
                                else if (!!res.SHOW_SUCCESS_POPUP) {
                                    if (!!res.CLEAR_FORM) {
                                        $form.find("input[type='text'], input[type='tel'], input[type='email'], input[type='password'], select, textarea").val('');
                                    }

                                    modalProduct.open(".js-modal-success");
                                }
                                else {

                                    if (res.MSG) {
                                        $ajaxMsg.html(res.MSG);
                                    }

                                    $ajaxMsg.addClass('has-success');
                                    let allowEdit = !!res.ALLOW_EDIT
                                    if (!allowEdit) {
                                        $form.find("input, select, textarea, button").attr("disabled", "disabled");
                                        $form.find('button.is-close-btn').removeAttr('disabled');
                                    }
                                    if (!!res.AJAX_LOAD_TO_SELECTOR && !!res.AJAX_LOAD_FROM_URL) {
                                        setTimeout(function () {
                                            let $loadTo = $(res.AJAX_LOAD_TO_SELECTOR);
                                            $loadTo.addClass('in-ajax');
                                            $loadTo.load(res.AJAX_LOAD_FROM_URL, function () {
                                                $loadTo.removeClass('in-ajax');
                                                App.scrollToElement($loadTo, true);
                                            });
                                        }, 1000);
                                    }
                                }
                            } else {

                                if (res.MSG) {
                                    $ajaxMsg.html(res.MSG);
                                }

                                $ajaxMsg.addClass('has-error');
                                for (var i in res.ERROR_FIELDS) {
                                    var fName = res.ERROR_FIELDS[i];
                                    var $field = $form.find("[name='" + fName + "']").first();
                                    $field.addClass('is-error');
                                    $field.parent().addClass("has-error");
                                }
                                if (scrollOnError == true) {
                                    let $firstError = $form.find('.has-error').first();
                                    App.scrollToElement($firstError, true);
                                }
                            }
                            $form.removeClass('in-ajax');
                        } catch (e) {
                            $form.removeClass('in-ajax');
                        }
                    },
                    error: function (jqXHR, exception) {
                        $form.removeClass('in-ajax');

                        var msg = '';
                        if (jqXHR.status === 0) {
                            msg = 'Not connect.\n Verify Network.';
                        } else if (jqXHR.status == 404) {
                            msg = 'Requested page not found. [404]';
                        } else if (jqXHR.status == 500) {
                            msg = 'Internal Server Error [500].';
                        } else if (exception === 'parsererror') {
                            msg = 'Requested JSON parse failed.';
                        } else if (exception === 'timeout') {
                            msg = 'Time out error.';
                        } else if (exception === 'abort') {
                            msg = 'Ajax request aborted.';
                        } else {
                            msg = 'Uncaught Error.\n' + jqXHR.responseText;
                        }

                        alert('Непредвиденная ошибка: ' + eval(msg) + '. Сообщите нам текст ошибки, чтобы мы могли быстро её исправить. Спасибо.');
                    }
                });
            }

            return false;
        });

    });

}

export default productPopup;