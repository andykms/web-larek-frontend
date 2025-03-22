/*<template id="card-basket"> */
import { IClickable } from "../../base/View";

export interface IBasketProductData {
  category: string;
  title: string;
  img: string;
  price: number;
}

export interface IBasketProductSettings extends IClickable<IBasketProductData> {
  index: string;
  category: string;
  title: string;
  img: string;
  price: string;  
  deleteButton: string;
}