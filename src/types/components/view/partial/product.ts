import { IClickable } from "../../base/View";
/*<template id="card-catalog">*/
export interface IProductData {
  category: string;
  title: string;
  img: string;
  price: number;
}

export interface IProductSettings extends IClickable<IProductData> {
  category: string;
  title: string;
  img: string;
  price: string;
}