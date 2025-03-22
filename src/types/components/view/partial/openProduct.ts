/*<template id="card-preview">*/
import { IClickable } from "../../base/View";

export interface IOpenedProductData {
  category: string;
  title: string;
  img: string;
  price: number;
  description: string;
}

export interface IOpenedProductSettings extends IClickable<IOpenedProductData> {
  category: string;
  title: string;
  img: string;
  price: string;
  description: string;
  buyButton: string;
}