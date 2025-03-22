import './scss/styles.scss';
import { Product } from './components/view/partial/product';
import { ProductApi } from './components/model/ProductAPI';
import { API_URL, CDN_URL } from './utils/constants';
const modal: HTMLElement = document.querySelector('.modal_active');
modal.classList.remove('modal_active');

const template = (document.getElementById('card-catalog') as HTMLTemplateElement).content.cloneNode(true) as HTMLElement;
const productList = document.querySelector('.gallery');
const productApi = new ProductApi(`${API_URL}`);
productApi.getProducts().then(products => {
  products.items.forEach(product => {
    const productView = new Product(template, {
      category: '.card__category',
      img: '.card__image',
      title: '.card__title',
      price: '.card__price',
      onClick: () => {
      }
    });
    productView.img = product.image;
    productView.title = product.title;
    productView.price = String(product.price);
    productList.append(productView.render(product));
  });
});

