/*<template id="card-preview">*/
import { IClickable } from "../../base/View";
import { IProduct } from "../../model/API";
import {activeClasses} from './product'

export interface IOpenedProductData extends IProduct {

}

export interface IOpenedProductSettings extends IClickable<IOpenedProductData> {
  category: string;
  title: string;
  img: string;
  price: string;
  description: string;
  buyButton: string;
  nullPrice: string;
  categoriesClasses: activeClasses;
  templateBaseCategory: string;
}