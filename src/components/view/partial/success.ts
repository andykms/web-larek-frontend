import { View } from "../../base/view";
import { ISuccessData, ISuccessSettings } from "../../../types/components/view/partial/success";
export class SuccessView extends View<ISuccessData, ISuccessSettings> {
  init(data: ISuccessData|undefined = undefined): void{
    if(data){
      this.setTotalPrice(data.total);
    }
    if(this.settings.onSubmit) {
      this.render(this.settings.submitButton).addEventListener('click', this.settings.onSubmit);
    }
  }

  setTotalPrice(total: number): void {
    const message: string = `${this.settings.additionalMessage} ${total} ${this.settings.currency}`;
    this.setValue(this.settings.totalClass, message);
  }
}