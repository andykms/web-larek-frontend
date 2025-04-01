/*<template id="basket"> */
import { IBasketProductData } from './basketProduct';
import { ISubmit } from '../../base/View';

export interface IBasketData{
}

export interface IBasketSettings extends ISubmit{
  listClass: string;
  totalClass: string;
  buttonClass: string;
  totalPriceClass: string;
  currency: string;
}