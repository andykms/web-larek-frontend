import { IChangeable, ISubmit } from "../../base/View";
import { Payments } from "../../model/AppState";
/*<template id="order">*/
export interface IOrderData {
  payment: Payments;
  address: string;
}

export interface IOrderSettings extends ISubmit{
  buttonOnline: string;
  buttonOffline: string;
  activeButton: string;
  addressInput: string;
  submitButton: string;
  formError: string;
  paymentError: string;
}