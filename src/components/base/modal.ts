import { Modal } from "../../types/components/base/modal";
import { ModalSettings } from "../../types/components/base/modal";
import { View } from "./View";


export class ModalView extends View<Modal, ModalSettings> implements Modal {
  
  
  init() {

  }

  open(): void {
    this.element.classList.add(this.settings.activeClass);
  };
  close(): void {
    this.element.classList.remove(this.settings.activeClass);
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