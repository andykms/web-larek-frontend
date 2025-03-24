import { IClickable } from "./View";

export interface Modal {
  open(): void;
  close(): void;
  pushContent(content:HTMLElement): void;
  popContent(): void;
  toggleContent(newContent: HTMLElement): void;
}

export interface ModalSettings extends IClickable<Modal> {
  activeClass: string;
  modalContent: string;
  buttonClose: string;
}