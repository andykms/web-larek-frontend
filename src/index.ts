import './scss/styles.scss';
import { Product } from './components/view/partial/product';
import { ProductApi } from './components/model/ProductAPI';
import { API_URL, CDN_URL,  } from './utils/constants';
import {settings} from './utils/constants';
import { ModalView } from './components/base/modal';
import { EventEmitter } from './components/base/events';
import { BasketProductView } from './components/view/partial/basketProduct';
import { Basket } from './components/view/partial/basket';
import { openProduct } from './components/view/partial/openProduct';
let modal: HTMLElement = document.querySelector('.modal_active');
modal.classList.remove('modal_active');
modal = document.querySelector('.modal');




const modalView = new ModalView(modal,{
  activeClass: 'modal_active',
  modalContent: '.modal__content',
  buttonClose: '.modal__close',
  onClick: () => {
  }
});
const basketProducts: BasketProductView[] = [];

const basketTemplate = (document.getElementById('basket') as HTMLTemplateElement).content;
const basketProductTemplate = (document.getElementById('card-basket') as HTMLTemplateElement).content;
let basketView: Basket = new Basket(basketTemplate.cloneNode(true) as HTMLElement, settings.basketSettings);
const basketButton = document.querySelector('.header__basket');

basketButton.addEventListener('click', () => {
  modalView.open();
  basketView.showProducts();
  modalView.pushContent(basketView.render().cloneNode(true) as HTMLElement);
});

modalView.render(modalView.settings.buttonClose).addEventListener('click', (event) => {
  modalView.popContent();
  modalView.close();
})

const template = (document.getElementById('card-catalog') as HTMLTemplateElement).content;
const productList = document.querySelector('.gallery');
const productViewTemplate = (document.getElementById('card-preview') as HTMLTemplateElement).content;
const productApi = new ProductApi(`${API_URL}`, `${CDN_URL}`);
productApi.getProducts().then(products => {
  products.items.forEach((product, index) => {
    const productView = new Product(
        template.cloneNode(true) as HTMLElement, 
        settings.productSettings,
        product
      );
    productList.append(productView.render());
    console.log(productView.element);
    productList.lastElementChild.addEventListener('click', (event) => {
      event.preventDefault();
      const openProductView = new openProduct(
        productViewTemplate.cloneNode(true) as HTMLElement, 
        settings.openProductSettings, 
        product);
      modalView.open();
      modalView.pushContent(openProductView.render());
      openProductView.render(openProductView.settings.buyButton).addEventListener('click', (event) => {
          const newBasketProduct: BasketProductView = new BasketProductView(
            basketProductTemplate.cloneNode(true) as HTMLElement, 
              settings.basketProductSettings, 
              product);
          newBasketProduct.render(newBasketProduct.settings.deleteButton).addEventListener('click', (event) => {
            event.preventDefault();
            basketView.removeProduct(newBasketProduct);
          });
          basketView.insertProduct(newBasketProduct);
      })
    });
  });
});



