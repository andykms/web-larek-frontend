import { IPageData, IPageSettings } from "../../../types/components/view/partial/Page";
import { View } from "../../base/View";

export class PageView extends View<IPageData, IPageSettings> {

  init() {
    this.render(this.settings.basketIconClass).addEventListener("click", () => {
      this.events.emit("basket:open");
    });
  }

  setCatalog(items: HTMLElement[]): void {
    items.forEach((item) => {
      this.appendChildView(this.settings.catalogClass, item);
    });
  }

  setCounter(value: number): void {
    this.setValue(this.settings.basketCounterClass, value.toString());
  }
}