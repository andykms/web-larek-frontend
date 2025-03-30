/*<template id="contacts">*/

import { IClickable, ISubmit } from "../../base/View";

export interface IContactsData {
  email: string;
  phone: string;
}

export interface IContactsSettings extends ISubmit{
  emailInput: string;
  phoneInput: string;
  submitButton: string;
  formError: string;
  phoneErrorText: string;
}