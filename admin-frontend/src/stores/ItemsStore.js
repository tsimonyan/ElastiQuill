import { action, computed, observable } from 'mobx';
import md5 from 'md5';
import localforage from 'localforage';
import BaseStore from './BaseStore';
import * as api from '../api';

export default class ItemsStore extends BaseStore {

  @observable
  items = [];

  @observable
  currentItem = null;

  @observable
  deleteItemId = null;

  @observable
  pageIndex = 0;

  @observable
  totalPages = 0;

  @observable
  formErrorMessage = null;

  @observable
  itemFormOpen = false;

  @observable
  isFormSaving = false;

  @observable
  isFormModalOpen = false;

  @observable
  isItemDeleting = false;

  @action
  setItemDeleting(deleting) {
    this.isItemDeleting = deleting;
  }

  @action
  setDeleteItemId(id) {
    this.deleteItemId = id;
  }

  @action
  setFormErrorMessage(message) {
    this.formErrorMessage = message;
  }

  @action
  setFormModalOpen(open) {
    this.isFormModalOpen = open;
  }

  @action
  setItemFormOpen(open) {
    this.itemFormOpen = open;
  }

  @action
  setCurrentItem(item) {
    this.currentItem = item;
  }

  @action
  setFormSaving(isSaving) {
    this.isFormSaving = isSaving;
  }

  @action
  async _loadPage(pageIndex, name, func) {
    this.loading(name);

    try {
      const resp = await func(pageIndex);
      this.items = resp.items;
      this.totalPages = resp.total_pages;
      this.pageIndex = pageIndex;
    }
    catch (err) {
      console.log(err);
    }
    finally {
      this.loaded(name);
    }
  }

  @action
  async _loadItem(id, name, func) {
    this.loading(name);

    try {
      this.currentItem = await func(id)
    }
    catch (err) {
      console.log(err);
    }
    finally {
      this.loaded(name);
    }
  }
}
