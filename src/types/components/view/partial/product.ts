import { IClickable } from "../../base/View";
import { IProduct } from "../../model/API";
/*<template id="card-catalog">*/
export interface IProductData extends IProduct {
}

export type activeClasses = {
  [key: string]: string;
}

export interface IProductSettings extends IClickable<IProductData> {
  category: string;
  title: string;
  img: string;
  price: string;
  nullPrice: string;
  categoriesClasses: activeClasses;
  templateBaseCategory: string;
  currency: string;
}