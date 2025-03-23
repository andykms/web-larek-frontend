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
      onClick: () => {
    },
    templateBaseCategory: '.card__category_other',
  },

};
