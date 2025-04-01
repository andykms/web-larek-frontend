import './scss/styles.scss';
import { ProductView } from './components/view/partial/product';
import { ProductApi } from './components/model/productAPI';
import { API_URL, CDN_URL,  } from './utils/constants';
import {settings} from './utils/constants';
import { ModalView } from './components/base/modal';
import { EventEmitter } from './components/base/events';
import { BasketView } from './components/view/partial/basket';
import { OpenProductView } from './components/view/partial/openProduct';
import { AppState } from './components/model/appState';
import { IOrder, IProduct } from './types/components/model/API';
import { ensureElement, cloneTemplate } from './utils/utils';
import { PageView } from './components/view/partial/page';
import { OrderView} from './components/view/partial/order';
import { ContactView } from './components/view/partial/contacts';
import { IOpenedProductData } from './types/components/view/partial/openProduct';
import { IBasketProduct } from './types/components/model/AppState';
import { SuccessView } from './components/view/partial/success';
import { BasketProductView } from './components/view/partial/basketProduct';


let modal: HTMLElement = document.querySelector('.modal_active');
modal.classList.remove('modal_active');
modal = document.querySelector('.modal');


export const events = new EventEmitter();
const api = new ProductApi(API_URL, CDN_URL);
const appData = new AppState({}, events);

const cardCatalogTemplate = ensureElement<HTMLTemplateElement>(settings.templateCardCatalogSelector);
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>(settings.templateCardPreviewSelector);
const cardBasketTemplate = ensureElement<HTMLTemplateElement>(settings.templateCardBasketSelector); 
const successTemplate = ensureElement<HTMLTemplateElement>(settings.templateSuccessSelector);
const basketTemplate = ensureElement<HTMLTemplateElement>(settings.templateBasketSelector);
const orderTemplate = ensureElement<HTMLTemplateElement>(settings.templateOrderSelector);
const contactsTemplate = ensureElement<HTMLTemplateElement>(settings.templateContactsSelector);

const modalContainer = ensureElement<HTMLTemplateElement>(settings.modalSelector);

const page = new PageView(document.body, settings.pageSettings, events);
const modalWindow = new ModalView(modalContainer, settings.modalSettings, events);

settings.basketSettings.onSubmit = () => {
  appData.startOrder();
};

const basketView = new BasketView(cloneTemplate(basketTemplate), settings.basketSettings, events);
const orderView = new OrderView(cloneTemplate(orderTemplate), settings.orderSettings, events);

settings.orderSettings.onSubmit = (event: Event) => {
  event.preventDefault();
  appData.setAddressOptions(orderView.orderData);
};
orderView.setupListenres();

const contactsView = new ContactView(cloneTemplate(contactsTemplate), settings.contactsSettings, events);
settings.contactsSettings.onSubmit = (event: Event) => {
  event.preventDefault();
  appData.setContactsOptions(contactsView.contactsData);
};
contactsView.setupListeners();

settings.successSettings.onSubmit = (event: Event) => {
  event.preventDefault();
  modalWindow.close();
};

const successView = new SuccessView(cloneTemplate(successTemplate), settings.successSettings, events);

events.on('items:changed', () => {
  page.setCatalog(Array.from(appData.products.values()).map((product: IProduct) => {
    settings.productSettings.onClick = () => {
      appData.selectProduct(product);
    };
    return new ProductView(cloneTemplate(cardCatalogTemplate), settings.productSettings,events, product).render();
  }))
});

events.on('product:selected', (product: IProduct) => {
  const productView = new OpenProductView(cloneTemplate(cardPreviewTemplate), settings.openProductSettings, events, product as IOpenedProductData);
  
  settings.openProductSettings.onClick = () => {
    if(!appData.isHasProductInBasket(product.id)){
      appData.addProductToBasket(product as IProduct);
      productView.setDeleteFromBasketButtonText();
    } else {
      appData.removeProductFromBasket(product.id);
      productView.setButtonBuyText();
    }
  }; 

  if(!appData.isHasProductInBasket(product.id)){
    productView.setButtonBuyText();
  } else {
    productView.setDeleteFromBasketButtonText();
  }

  productView.setupButtonListener();
  modalWindow.initializeContent(productView.render());
});

events.on('basket:changed:add', (product: IProduct) => {
  settings.basketProductSettings.onClick = () => {
    appData.removeProductFromBasket(product.id);
  };
  const basketProduct = new BasketProductView(cloneTemplate(cardBasketTemplate), settings.basketProductSettings, events, product);
  basketView.insertProduct(basketProduct);
});

events.on('basket:changed:remove', (product: IBasketProduct) => {
  basketView.removeProduct(product.id); 
});

events.on(new RegExp("basket:changed:.*"), () => {
  page.setCounter(appData.basketSize);
});

events.on("basket:open", () =>{
  basketView.showProducts();
  modalWindow.initializeContent(basketView.render());
})

events.on("order:open", () => {
  modalWindow.initializeContent(orderView.render());
});

events.on("contacts:open", () => {
  modalWindow.initializeContent(contactsView.render());
});

events.on("order:all", ()=>{
  appData.submitOrder();
})

events.on("order:all:packed", (order: IOrder) => {
  console.log(order);
  api.postOrder(order)
    .then((response) => {
      appData.successOrder();
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
});

events.on("order:success", () => {
  successView.setTotalPrice(appData.getTotalPrice());
  modalWindow.initializeContent(successView.render());
});

events.on("basket:changed:clear", () => {
  basketView.clearProducts();
});

api.getProducts().then((products) => {
  appData.loadProducts(products.items);
});