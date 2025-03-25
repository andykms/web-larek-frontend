import { IChangeable } from "../../base/View";
import { Payments } from "../../model/AppState";
/*<template id="order">*/
export interface IOrderData {
  payment: Payments;
  address: string;
}

export interface IOrderSettings extends IChangeable<IOrderData> {
  buttonOnline: string;
  buttonOffline: string;
  activeButton: string;
  addressInput: string;
}