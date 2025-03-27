import { Modal } from "../../types/components/base/modal";
import { ModalSettings } from "../../types/components/base/modal";
import { View } from "./View";
import { IEvents } from "./events";

export class ModalView extends View<Modal, ModalSettings> implements Modal {
  init() {
    const deleteButton = this.getElementFromCache(this.settings.buttonClose);

    deleteButton.addEventListener('click',this.close.bind(this));
	}

  open(content: HTMLElement|undefined = undefined): void {
    this.element.classList.add(this.settings.activeClass);
    if(content) {
      this.pushContent(content);
    }
  };
  close(): void {
    this.element.classList.remove(this.settings.activeClass);
    this.popContent();
    this.events.emit('modal:close');
  };

  pushContent(content: HTMLElement): void {
      this.appendChildView(this.settings.modalContent, content);
  }

  popContent(): void {
    this.removeChildView(this.settings.modalContent);
  }

  toggleContent(newContent: HTMLElement): void {
      this.popContent();
      this.pushContent(newContent);
  }
} 