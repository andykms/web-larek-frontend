import { Modal } from "../../types/components/base/modal";
import { ModalSettings } from "../../types/components/base/modal";
import { View } from "./View";
import { IEvents } from "./events";

export class ModalView extends View<Modal, ModalSettings> implements Modal {
  options = {
    rootMargin: `0px 0px ${this.render().getBoundingClientRect().width}px 0px`,
    threshold: [0,1],
  };
  observer: IntersectionObserver = new IntersectionObserver(this.blockScroll.bind(this), this.options);

  init() {
    const deleteButton = this.getElementFromCache(this.settings.buttonClose);
    deleteButton.addEventListener('click',this.close.bind(this));
	}

  initializeContent(content: HTMLElement): void {
    this.open();
    this.popContent();
    this.pushContent(content);
  }

  open(): void {
    this.fixPosition();
    this.configureScroll();
    this.element.classList.add(this.settings.activeClass);
  };

  close(): void {
    this.unblockScroll();
    this.element.classList.remove(this.settings.activeClass);
    this.popContent();
  };

  pushContent(content: HTMLElement): void {
    this.appendChildView(this.settings.modalContent, content);
  }

  popContent(): void {
    this.removeChildView(this.settings.modalContent);
  }

  fixPosition(): void {
    const scrollY = window.scrollY;
    this.render().style.top = `${scrollY}px`;
  }

  configureScroll(): void {
    this.observer.observe(this.element);
  }

  blockScroll(): void {
    document.body.style.overflow = 'hidden';
  }

  unblockScroll(): void {
    document.body.style.overflow = '';
    this.observer.disconnect();
  }
} 