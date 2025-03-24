import './scss/styles.scss';
import { Product } from './components/view/partial/product';
import { ProductApi } from './components/model/ProductAPI';
import { API_URL, CDN_URL,  } from './utils/constants';
import {settings} from './utils/constants';
import { ModalView } from './components/base/modal';
import { AppState } from './components/model/AppState';
const modal: HTMLElement = document.querySelector('.modal_active');
modal.classList.remove('modal_active');

const template = (document.getElementById('card-catalog') as HTMLTemplateElement).content;
const productList = document.querySelector('.gallery');

const productApi = new ProductApi(`${API_URL}`, `${CDN_URL}`);
productApi.getProducts().then(products => {
  products.items.forEach((product, index) => {
    const productView = new Product(
    template.cloneNode(true) as HTMLElement, 
    settings.productSettings,
    product
  );
    productList.append(productView.render(product));
  });
});

const app = new AppState(productApi);
app.loadProducts();


