import { ISubmit } from "../../base/View";

export interface ISuccessData {
  total: number;
}

export interface ISuccessSettings extends ISubmit {
  totalClass: string;
  submitButton: string;
  additionalMessage: string;
  currency: string;
}