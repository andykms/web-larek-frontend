/*<template id="basket"> */
import { IBasketProductData } from './basketProduct';
import { ISubmit } from '../../base/View';
import { IView } from '../../base/View';
export interface IBasketData{
}

export interface IBasketSettings extends ISubmit{
  listClass: string;
  totalClass: string;
  buttonClass: string;
  totalPriceClass: string;
  currency: string;
}

export interface IBasketItem<T, S extends Object> extends IView<T, S>{
  setIndex(index: number): void;
  price: number;
  id: string;
}