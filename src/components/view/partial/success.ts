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
    this.setValue(this.settings.totalClass, this.formatMessage(total));
  }

  private formatMessage(total: number): string {
    return `${this.settings.additionalMessage} ${total} ${this.settings.currency}`;
  }
}