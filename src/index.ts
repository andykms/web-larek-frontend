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
import { AppState } from './components/model/AppState';
import { AppStateModals } from './types/components/model/AppState';
import { IProduct } from './types/components/model/API';
import { ensureElement, cloneTemplate } from './utils/utils';
import { PageView } from './components/view/partial/Page';
import { OrderForm } from './components/view/partial/order';
import { ContactView } from './components/view/partial/contacts';
import { IOpenedProductData } from './types/components/view/partial/openProduct';
import { IBasketProduct } from './types/components/model/AppState';
let modal: HTMLElement = document.querySelector('.modal_active');
modal.classList.remove('modal_active');
modal = document.querySelector('.modal');



/*
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
  const BasketList = basketView.render().cloneNode(true) as HTMLElement;
  modalView.pushContent(BasketList);
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
*/

/*
const productApi = new ProductApi(`${API_URL}`, `${CDN_URL}`);
const appState = new AppState(productApi);
const eventEmitter = new EventEmitter();

const productList = document.querySelector('.gallery');
const template = (document.getElementById('card-catalog') as HTMLTemplateElement).content;
modal = document.querySelector('.modal');

eventEmitter.on<IProduct>('chooseProduct', (product) => {
  appState.selectProduct(product.id);
});

const modalView = new ModalView(modal,{
  activeClass: 'modal_active',
  modalContent: '.modal__content',
  buttonClose: '.modal__close',
  onClick: () => {
  }
});

const productViewTemplate = (document.getElementById('card-preview') as HTMLTemplateElement).content;

appState.loadProducts()
  .then(() => {
    Array.from(appState.products.values()).forEach((product) => {
      const productView = new Product(
        template.cloneNode(true) as HTMLElement, 
        settings.productSettings,
        product
      );
      productList.append(productView.render());
    })
  });

eventEmitter.on<IProduct>('chooseProduct', (product) => {
  appState.selectProduct(product.id);
});
*/
export const events = new EventEmitter();
const api = new ProductApi(API_URL, CDN_URL);


const cardCatalogTemplate = ensureElement<HTMLTemplateElement>(settings.templateCardCatalogSelector);
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>(settings.templateCardPreviewSelector);
const cardBasketTemplate = ensureElement<HTMLTemplateElement>(settings.templateCardBasketSelector); 
const successTemplate = ensureElement<HTMLTemplateElement>(settings.templateSuccessSelector);
const basketTemplate = ensureElement<HTMLTemplateElement>(settings.templateBasketSelector);
const orderTemplate = ensureElement<HTMLTemplateElement>(settings.templateOrderSelector);
const contactsTemplate = ensureElement<HTMLTemplateElement>(settings.templateContactsSelector);

const modalContainer = ensureElement<HTMLTemplateElement>(settings.modalSelector);

const appData = new AppState({}, events);

const page = new PageView(document.body, settings.pageSettings, events);
const modalWindow = new ModalView(modalContainer, settings.modalSettings, events);

settings.basketSettings.onSubmit = () => {
  appData.startOrder();
};

const basketView = new Basket(cloneTemplate(basketTemplate), settings.basketSettings, events);
const orderView = new OrderForm(cloneTemplate(orderTemplate), settings.orderSettings, events);

settings.orderSettings.onSubmit = (event: Event) => {
  event.preventDefault();
  appData.setAddressOptions(orderView.orderData);
};
orderView.setupListenres();

const contactsView = new ContactView(cloneTemplate(contactsTemplate), settings.contactsSettings, events);

events.on('items:changed', () => {
  page.setCatalog(Array.from(appData.products.values()).map((product: IProduct) => {
    settings.productSettings.onClick = () => {
      events.emit('product:selected', product);
    };
    return new Product(cloneTemplate(cardCatalogTemplate), settings.productSettings,events, product).render();
  }))
});

events.on('product:selected', (product: IProduct) => {
  modalWindow.open();
  const productView = new openProduct(cloneTemplate(cardPreviewTemplate), settings.openProductSettings, events, product as IOpenedProductData);
  
  settings.openProductSettings.onClick = () => {
    if(!appData.isHasProductInBasket(product.id)){
      appData.addProductToBasket(product as IProduct);
      productView.setDeleteFromBasketButtonText();
    } else {
      appData.removeProductFromBasket(product.id);
      productView.setButtonBuyText();
    }
    page.setCounter(appData.basketSize);
  }; 

  if(!appData.isHasProductInBasket(product.id)){
    productView.setButtonBuyText();
  } else {
    productView.setDeleteFromBasketButtonText();
  }

  productView.setupButtonListener();
  modalWindow.pushContent(productView.render());
});

events.on('basket:changed:add', (product: IProduct) => {
  settings.basketProductSettings.onClick = () => {
    appData.removeProductFromBasket(product.id);
    page.setCounter(appData.basketSize); 
  };
  basketView.insertProduct(cardBasketTemplate, settings.basketProductSettings, product);
});

events.on('basket:changed:remove', (product: IBasketProduct) => {
  basketView.removeProduct(product.id); 
});

events.on("basket:open", () =>{
  modalWindow.open();
  modalWindow.popContent();
  basketView.showProducts();
  modalWindow.pushContent(basketView.render());
})

events.on("order:open", () => {
  modalWindow.open();
  modalWindow.popContent();
  modalWindow.pushContent(orderView.render());
});

events.on("contacts:open", () => {
  modalWindow.open();
  modalWindow.popContent();
  modalWindow.pushContent(contactsView.render());
});

api.getProducts().then((products) => {
  appData.loadProducts(products.items);
});