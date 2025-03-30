/*<template id="basket"> */
import { IBasketProductData } from './basketProduct';
import { ListData, ListSettings } from '../common/List';
import { ISubmit } from '../../base/View';

export interface IBasketData extends ListData<IBasketProductData>{
}

export interface IBasketSettings extends ISubmit{
  listClass: string;
  totalClass: string;
  buttonClass: string;
  totalPriceClass: string;
  currency: string;
}