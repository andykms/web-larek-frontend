import { events } from "..";
import { openProduct } from "../components/view/partial/openProduct";
import { IProductData } from "../types/components/view/partial/product";

export const API_URL = `${process.env.API_ORIGIN}/api/weblarek`;
export const CDN_URL = `${process.env.API_ORIGIN}/content/weblarek`;

export const settings = {
  productSettings: {
    category: '.card__category',
    img: '.card__image',
    title: '.card__title',
    price: '.card__price',
    nullPrice: 'Бесценно',
    categoriesClasses: {
        'софт-скил': '.card__category_soft',
        'другое': '.card__category_other',
        'дополнительное': '.card__category_additional',
        'кнопка': '.card__category_button',
        'хард-скил': '.card__category_hard',
      },
    templateBaseCategory: '.card__category_other',
    onClick: () => {
    },
  },
  openProductSettings: {
    title: '.card__title',
    price: '.card__price',
    description: '.card__text',
    nullPrice: 'Бесценно',
    buyButton: '.card__button',
    category: '.card__category',
    image: '.card__image',
    categoriesClasses: {
      'софт-скил': '.card__category_soft',
      'другое': '.card__category_other',
      'дополнительное': '.card__category_additional',
      'кнопка': '.card__category_button',
      'хард-скил': '.card__category_hard',
    },
    templateBaseCategory: '.card__category_other',
    onClick: () => {
    }
  },
  basketSettings: {
    listClass: '.basket__list',
    totalClass: ".header__basket-counter",
    buttonClass: ".basket__button",
    totalPriceClass: ".basket__price",
  },
  basketProductSettings: {
    index: ".basket__item-index",
    title: ".card__title",
    price: ".card__price",
    nullPrice: "Бесценно",
    deleteButton: ".basket__item-delete",
    onClick: () => {
    }
  },
  modalSettings: {
    activeClass: 'modal_active',
    modalContent: '.modal__content',
    buttonClose: '.modal__close',
  },
  pageSettings: {
    basketCounterClass: '.header__basket-counter',
    catalogClass: '.gallery',
    basketIconClass: '.header__basket',
  },

  orderSettings: {
    buttonOnline: '.button_online',
    buttonOffline: '.button_offline',
    activeButton: '.button_alt-active',
    addressInput: '.form__input',
    submitButton: '.form__button',
    formError: '.form__errors',
  },

  contactsSettings: {
    emailInput: '.form__email',
    phoneInput: '.form__phone',
    submitButton: '.contacts__button',
    reges: '.+',
    formError: '.form__errors',
    regex: '.+',
  },
  modalSelector: '#modal-container',
  templateSuccessSelector: '#success',
  templateCardCatalogSelector: '#card-catalog',
  templateCardPreviewSelector: '#card-preview',
  templateCardBasketSelector: '#card-basket',
  templateBasketSelector: '#basket',
  templateOrderSelector: '#order',
  templateContactsSelector: '#contacts',
};
