/*<template id="contacts">*/

import { IClickable } from "../../base/View";

export interface IContactsData {
  email: string;
  phone: string;
}

export interface IContactsSettings extends IClickable<IContactsData> {
  emailInput: string;
  phoneInput: string;
  submitButton: string;
  regex: string;
}