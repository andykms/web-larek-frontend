# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

## Архитектура проекта
В проекте используется архитектура MVP.

Слой модели представлен классами ```AppState```, ```ProductApi```, ```EventEmitter```.

Слой представления представлен классами ```View```, ```Form``` и их расширенными классами.

Слой презентера представлен кодом в ```index.ts```.

## Базовый код

Базовый код представлен в папке ```src/components/base```.

**Абстрактный класс View<T, S extends Object>**

Реализует базовый абстрактный класс отображений. Все отображения наследуются прямо, либо через родственные ему классы.
Вот пример использования класса для реализации класса отображения товара.
```
class Product extends View<IProductData, IProductSettings>
```
Класс является дженериком и принимает в переменной T тип данных наследуемого класса, которые необходимо отобразить. В примере, это объект (```IProductData```) с полями цены и названием товара.
Вторым аргументом является тип настроек. Важно, что сам класс ```View``` ничего не знает об конкретных настройках – поля настроек необходимо передавать при вызове методов родительского класса ```View```.
Конструктор класса принимает 3 обязательных и 1 необязательный аргумент.
```
1.	Element: HTMLElement 
```
элемент отображения
```
2.	Settings: S 
```
настройки, требует тип дженерик
```
3.	events: IEvent 
```
объект наблюдателя, требует интерфейс наблюдателя с методами on, off, emit.
```
4.	value 
```	
необязательный аргумент. Нужен, если при инициализации объектов наследуемых отображений необходимо сразу отобразить данные
Важно, предполагается, что конструктор наследуемых классов не будет переопределяться – в конструкторе ```View``` вызывается метод ```init``` – его необходимо переопределить в наследуемых отображениях, если необходима логика работы с экземпляром класса сразу при его создании. 
Абстрактный класс имеет такие методы:
```
1.	copy(settings?: S)
```
копирует объект, принимает один аргумент настроек
```
2.	render(selector: string|undefined = undefined): HTMLElement 
```
принимает необязательный аргумент селектор класса, при его отсутствии возвращает корневой элемент отображения, при селекторе – возвращает элемент по данному селектору
```
3.	getElementFromCache(selector: string): HTMLElement
```
принимает обязательный аргумент селектор класса. Ищет элемент в кэше (хэш-таблице) по селектору. При его отсутствии в кэше, находит элемент в DOM и записывает в кэш. Возвращает элемент с переданным в метод селектором.
```
4.	setValue(selector: string, newValue: string|attributeValues) 
```
принимает селектор элемента и новое значение – при передаче строкового значения изменяет свойство ```textContent``` элемента, при передаче объекта, реализующего интерфейс ```attributeValues``` изменяет атрибуты элемента, новым атрибутом будет ключ объекта, значением атрибута будет значение данного объекта
```
5.	addClass(selector: string, className: string)
```
принимает селектор элемента и класс, который будет добавлен элементу с данным селектором.
```
6.	toggleClass(selector: string, deletedClass: string|string[], newClasses: string|string[])
```
принимает селектор класса элемента, удаляемые классы элемента и новые классы. Удаляемые классы будут удалены, новые – добавлены. Метод принимает как одиночные классы, так и массивы классов.
```
7.	removeAttribute(selector: string, attribute: string)
```
принимает селектор класса элемента и атрибут данного элемента. Метод удаляет переданный атрибут у элемента с переданным селектором.
```
8.	removeClass(selector: string, className: string)
```
принимает селектор класса элемента и удаляемый класс. Метод удаляет класс (className) у элемента с переданным селектором(selector).
```
9.	appendChildView(selector: string, child: HTMLElement) 
```
принимает селектор класса элемента и элемент DOM. В элемент с переданным селектором добавляется потомок DOM (child). 
```
10.	removeChildView(selector: string, child: HTMLElement|undefined = undefined) 
```
метод, противоположный appendChildView – удаляет потомка. Если потомок не найдется в элементе, удаление не произойдет

```
11. setDisabled(selector: string, state: boolean)
```
принимает селектор элемента, если ```state``` равен ```true```, то элемент с данным селектором становится неактивным, если ```state``` равен ```false```, то активен.

**Абстрактный класс Form<T,S extends object> extends View<T,S>**

Расширяет базовое представление методами для форм. Не изменяет родительские методы, в том числе конструктор. Дополнительных полей нет – предполагается что элементы форм, например теги ```input``` будут вводится в сами методы. 
Представления, имеющие поля формы – наследуются от данного класса.
Методы:
```
1.	setInputValue(selector: string, newValue: string)
```
Принимает селектор элемента ```Input``` и строку. Строка будет вставлена в соответствующее поле ```input```.
```
2.	isValidInputValueBySelector(selector: string): boolean
```
Принимает селектор элемента ```Input```. При валидном ```input``` элемента возвращает ```true```, иначе ```false```
```
3.	isValidInputByElement(inputElement: HTMLInputElement): boolean
```
Такая же логика как и у ```isValidInputValueBySelector```, но вместо селектора принимает сам элемент ```input```.
```
4.	isCorrectPatternInputBySelector(selector: string): boolean
```
Принимает селектор элемента ```input```. Если в теге есть атрибут ```pattern```, возвращает ```true```, если значение в ```input``` соответствует паттерну, иначе ```false```.
Важно, реализация метода учитывает пустое значение ```input```, в отличие от простой проверки свойства ```.validity.pattern```. Поэтому, к примеру, если в значении пусто, а паттерн требует хотя бы больше одного символа, методы выдаст ```false```, а не ```true```.
```
5.	isCorrectPatternInputByElement(inputElement: HTMLInputElement): boolean 
```
Такая же логика как и у ```isCorrectPatternInputBySelector```, но принимает вместо селектора сам элемент.
```
6.	getValidErrorBySelector(selector:string): string
```
Принимает селектор элемента ```input```. Возвращает ошибку валидации.
```
7.	getValidErrorByElement(inputElement: HTMLInputElement): string
```
Такая логика как ```getValidErrorBySelector```, но принимает сам элемент ```input```.
```
8.	setError (errorSelector: string, error: string, submitButtonSelector: string)
```
Принимает селектор элемента, куда нужно вставить ошибку валидации формы, текст ошибки, который будет вставлен в свойство ```textContent``` элемента с селектором ошибки и элемент кнопки формы, которая будет деактивирована. 
```
9.	setSuccess(successSelector: string, success: string, submitButtonSelector: string)
```
Имеет примерно ту же логику метода ```setError```, но используется вывода не ошибки, а сообщения, что форма верна (на практике в success передают пустую строку). Вместо деактивации кнопки – активирует её.
```
10.	setInputError(errorSelector: string, error: string)
```
Принимает селектор элемента, куда будет вставлен текст ошибки и саму ошибку. Используется в методе ```setError```.
```
11.	deactivateButton(buttonSelector: string)
```
Принимает селектор элемента кнопки и деактивирует её.
```
12.	activateButton(buttonSelector: string)
```
Принимает селектор элемента кнопки и активирует её.
```
13.	getInputValue(selector: string): string
```
Принимает селектор элемента ```input``` и возвращает значение, которое введено в данный ```input```. Используется почти во всех методах ```Form```.

**Класс class ModalView extends View<Modal, ModalSettings> implements Modal**

Класс представления модальных окон, расширяется от базового представления и реализует интерфейс ```Modal```, требующий методы для открытия, закрытия, вставки контента и удаления контента.
Класс не является самым базовым, но может быть использован и в других проектах.
Методы:
```
1.	init()
```
Переопределяет родительский ```init``` для вызова при создании экземпляра класса.
В нем навешивается слушатель события на кнопку закрытия модального окна.
```
2.	open(): void
```
Открывает модальное окно. В нем вызываются методы ```fixPosition``` и ```configureScroll``` для ограничения скроллинга мыши в пределах модального окна (Если модальное окно маленькое и не пересекает экран – скролл блокируется, если оно большое и необходимо прокрутить к низу или вверху модального окна – скроллить можно в переделах модального окна).
```
3.	close():
```
Закрывает модальное окно. В методе разблокируется скролл и убирается контент.
```
4.	pushContent(content: HTMLElement): void
```
Принимает контент, который необходимо отобразить, вставляет его в своего потомка с селектором контента.
```
5.	popContent():
```
Удаляет контент
```
6.	fixPosition(): void
```
Вставляет модальное окно на странице там, где оно было открыто. Используется в методе открытия окна.
```
7.	configureScroll(): void
```
Конфигурирует область, в которой можно прокручивать скролл (Область модального окна). В логике метода используется обзервер. 
```
8.	blockScroll(): void
```
Блокирует скролл
```
9.	unblockScroll(): void
```
Разблокирует скролл. Также отключает обзервер.

**Класс  EventEmitter**

Реализует паттерн «Наблюдатель» и позволяет подписываться на события и уведомлять подписчиков о наступлении события. 
Класс имеет методы ```on``` ,  ```off``` ,  ```emit``` — для подписки на событие, отписки от события и уведомления подписчиков о наступлении события соответственно. 

Методы  ```onAll``` и  ```offAll``` — для подписки на все события и сброса всех подписчиков. Интересным дополнением является метод  trigger , генерирующий заданное событие с заданными аргументами. 

Это позволяет передавать его в качестве обработчика события в другие классы. Эти классы будут генерировать события, независимо от класса  EventEmitter.

**Класс api**

Необходим для расширения отдельных API приложения, наследуемые классы API используют методы ```get``` и ```post``` для отправки запросов и получения ответов.


## Модели

Модели представлены в папке ```src/components/model```.

**Класс AppState**

Хранит состояние приложения. В классе есть поля:

всех доступных товаров - ```products```, представленный хэш-таблицей, где ключ - id товара, значение - интерфейс товара, 

выбранный товар - ```selectedProduct``` 

корзина - ```basket```, которая представлена хэш-таблицей, где ключ - id товара, а значение - интерфейс товара, 

информация о клиенте - ```customerInfo```, требующий интерфейс ```ICustomerInfo```

```
//src/types/model/AppState.ts
export interface ICustomerInfo extends IContactsOptions, IAddressOptions{
}

export interface IContactsOptions {
  email: string;
  phone: string;
}

export interface IAddressOptions {
  address: string;
  payment: Payments;
}
```

и методы:

для загрузки товаров ```loadProducts```, выбора товара ```selectProduct```, добавления товара в корзину ```addProductToBasket```, удаления товара из корзины ```removeProductFromBasket```, вставки адреса```writeAddress```, вставки E-mail ```writeEmail```, выбора способа оплаты ```choosePaymentMethod```, сборки заказа ```submitOrder```, подтверждения заказа ```successOrder```, получения товаров из корзины ```get basketProducts()```, получения заказа на основе полученных данных пользователя и корзины ```get order()``` и другие вспомогательные методы.

**Класс ProductApi**

Класс расширяет базовый класс ```api```, используется для получения данных о товарах и отправке заказа, используя методы родительского класса ```get``` и ```post```.

Методы:

```getProducts``` - получает ответ с интерфейсом ```IProductList<IProduct>```:

```
interface IProductList<T> {
  total: number;
  items: T[];
}
```

где дженерик T - должен реализовывать интерфейс товара ```IProduct```:

```
interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
}
```

```postOrder``` - отправляет объект заказа на сервер с интерфейсом ```IOrder``` (Интерфейс описан выше в главе *Класс AppState*)

Также в классе есть вспомогательные методы для расширения ссылок на изображения из полученных товаров - ```formatProducts``` и ```formatImage```.

## Компоненты представлений

Компоненты представлений представлены в папке ```src/components/view/partial```.

Важно уточнить, что в рамках архитектуры MVP представления получают слушатели событий из слоя презентера, по которым происходит бизнес-логика приложения. 

Например, при нажатии кнопки "Оплатить" в модальном окне с контентом контактных данных, вызывается слушатель события, который передал слой презентера из index.ts, сам класс представления контактных данных ничего не знает о логике нажатия на кнопку и ничего с данными не делает, а лишь отдает их.

**Класс ProductView**

Наследуется от базового представления ```View```.
Рендерит карточку. В нем проставляется необходимая информация о товаре - категория, название, цена и изображение.

**Класс OpenProductView**

Наследуется от базового представления ```View```
Рендерит карточку. В нем проставляется более подробная информация о товаре - категория, название, цена, изображение и описание.

**Класс BasketProductView**

Наследуется от базового представления ```View```.
Рендерит карточку товара, с более краткой информации о товаре - название и цена.

**Класс BasketView**

Наследуется от базового представления ```View```
Рендерит контент корзины из любых элементов.
Элементы должны реализовывать интерфейс ```IBasketItem<T,S extends Object>``` и интерфейс ```IView<T,S extends Object>```

```
interface IBasketItem<T, S extends Object> extends IView<T, S>{
  setIndex(index: number): void;
  price: number;
  id: string;
}
``` 

```
interface IView<T, S = object> {
	element: HTMLElement;
	copy(settings?: S): IView<T>; 
	render(selector: string|undefined): HTMLElement; 
}
```

В проекте, например, в нем вставляются карточки товаров из представления ```BasketProductView```, реализующий данные интерфейсы.

Метод для вставки элемента:
```
insertProduct(newProduct: IBasketItem<T, S>, index: number)
```

Методы для удаления всех элементов:
```
removeProducts()
```

**Класс ContactView**

Наследуется от базового представления ```FormView```
Рендерит контент формы с полями E-mail и телефона.

Позволяет получить введенные пользователем данные с помощью метода ```contactsData```, который возвращает объект интерфейса ```IContactsOptions```

```
interface IContactsOptions {
  email: string;
  phone: string;
}
```

**Класс OrderView**

Наследуется от базового представления ```FormView```.
Рендерит контент формы с полем адреса и выбора способа получения заказа.

Позволяет получить введенные пользователем данные с помощью метода ```orderData```, который возвращает объект интерфейса ```IAddressOptions```

```
interface IAddressOptions {
  address: string;
  payment: Payments;
}
```

В свою очередь ```Payments``` - коллекция уникальных значений, способы оплаты, которые также используются в представлении ```OrderView```

```
enum Payments {
  none = undefined,
  online = 'online',
  offline = 'offline'
}
```

**Класс PageView**

Наследуется от базового представления ```View```
Рендерит контент главной страницы.

Позволяет вставить контент в галерею (Например, карточки товаров) и изменять отображение счетчика количества товаров в корзине.

**Класс SuccessView**

Наследуется от базового представления ```View```.
Рендерит контент страницы успешной оплаты.

Позволяет вставить количество списанных средств.


## Слой презентера

Логика презентера представлена в коде ```index.ts``` в каталоге ```src/```.

Сначала инициализируются необходимые модели - AppState, ProductApi, EventEmitter:

```
//index.ts
const events = new EventEmitter();
const api = new ProductApi(API_URL, CDN_URL);
const appData = new AppState({}, events);
```

Далее создаются необходимые отображения, куда презентер передает ссылки на события:

```
//index.ts
const basketView = new Basket(cloneTemplate(basketTemplate), settings.basketSettings, events);
const orderView = new OrderForm(cloneTemplate(orderTemplate), settings.orderSettings, events);
...
```

При создании представления презентер передает в представления слушатели событий, которые инициализируются в представлениях, например:

```
//index.ts
const contactsView = new ContactForm(cloneTemplate(contactsTemplate), settings.contactsSettings, events);
//Навешивание слушателя на кнопку "Отправить"
settings.contactsSettings.onSubmit = (event: Event) => {
  event.preventDefault();
  //Модель собирает данные из представления и передает их свои поля и методы
  appData.setContactsOptions(contactsView.contactsData);
};
//Инициализация слушателей в представлении
contactsView.setupListeners();
```

```
//contacts.ts
/*Здесь на кнопку навешивается слушатель события, который передал презентер из index.ts*/
this.render(this.settings.submitButton).addEventListener('click', this.settings.onSubmit);
```

При изменении данных в модели происходит оповещение подписанных на событие слушателей. К примеру выше, вызов метода ```appData.setContactsOptions(contactsView.contactsData);``` вызывает оповещение слушателей:

```
//AppState.ts
setContactsOptions(options: IContactsOptions): void {
      ...
      this.emitChanges('order:all');
  }
```

Далее подписчики получают оповещение об изменении данных.

```
//index.ts
events.on("order:all", ()=>{
  appData.submitOrder();
})
```

Для начала работы вызывается метод получения товаров:
```
api.getProducts().then((products) => {
  appData.loadProducts(products.items);
});
```

