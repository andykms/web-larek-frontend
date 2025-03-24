import { View } from "../../base/View";
import { IContactsData, IContactsSettings } from "../../../types/components/view/partial/contacts";

export class ContactView extends View<IContactsData, IContactsSettings> {
  
  init(data: IContactsData|undefined = undefined) {
    if(data === undefined) {
      return;
    }
    this.setEmail(data.email);
    this.setPhone(data.phone);
  }

  setEmail(email: string) {
    this.setValue(this.settings.emailInput, email);
  }

  setPhone(phone: string) {
    this.setValue(this.settings.phoneInput, phone);
  }

  /*TODO: написать метод для проверки ошибки ввода:
  Вот что написано в требованиях на этот счет:
  если одно из полей не заполнено, появляется сообщение об ошибке; */
}
