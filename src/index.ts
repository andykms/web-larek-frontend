import './scss/styles.scss';
import { Product } from './components/view/partial/product';
import { ProductApi } from './components/model/ProductAPI';
import { API_URL, CDN_URL,  } from './utils/constants';
import {settings} from './utils/constants';
import { ModalView } from './components/base/modal';
import { EventEmitter } from './components/base/events';
import { Basket } from './components/view/partial/basket';
import { openProduct } from './components/view/partial/openProduct';
import { AppState } from './components/model/AppState';
import { IOrder, IProduct } from './types/components/model/API';
import { ensureElement, cloneTemplate } from './utils/utils';
import { PageView } from './components/view/partial/Page';
import { OrderForm } from './components/view/partial/order';
import { ContactView } from './components/view/partial/contacts';
import { IOpenedProductData } from './types/components/view/partial/openProduct';
import { IBasketProduct } from './types/components/model/AppState';


let modal: HTMLElement = document.querySelector('.modal_active');
modal.classList.remove('modal_active');
modal = document.querySelector('.modal');


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
settings.contactsSettings.onSubmit = (event: Event) => {
  event.preventDefault();
  appData.setContactsOptions(contactsView.contactsData);
};
contactsView.setupListeners();

events.on('items:changed', () => {
  page.setCatalog(Array.from(appData.products.values()).map((product: IProduct) => {
    settings.productSettings.onClick = () => {
      events.emit('product:selected', product);
    };
    return new Product(cloneTemplate(cardCatalogTemplate), settings.productSettings,events, product).render();
  }))
});

events.on('product:selected', (product: IProduct) => {
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
  modalWindow.initializeContent(productView.render());
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
    })
    .catch((error) => {
      console.log(error);
    });
});

events.on("order:success", () => {
  modalWindow.initializeContent(successTemplate);
});

api.getProducts(true).then((products) => {
  appData.loadProducts(products.items);
});