/*<template id="contacts">*/

import { IClickable } from "../../base/View";

export interface IContactsData {
  email: string;
  phone: string;
}

export interface IContactsSettings {
  emailInput: string;
  phoneInput: string;
  submitButton: string;
  formError: string;
  phoneErrorText: string;
}