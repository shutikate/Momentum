class StorageEventTarget extends EventTarget {
  changeSettings(settings) {
    this.dispatchEvent(new CustomEvent('settings', { detail: { settings } }));
  }
}

export const storageEventTarget = new StorageEventTarget();
