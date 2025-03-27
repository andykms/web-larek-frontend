/*<template id="card-basket"> */
import { IClickable } from "../../base/View";

export interface IBasketProductData {
  id: string;
  title: string;
  price: number|null;
}

export interface IBasketProductSettings extends IClickable<IBasketProductData> {
  index: string;
  title: string;
  price: string;  
  nullPrice: string;
  deleteButton: string;
}