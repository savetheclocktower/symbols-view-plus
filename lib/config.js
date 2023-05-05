const { CompositeDisposable, Emitter } = require('atom');

const Config = {
  activate () {
    if (this.activated) return;
    this.emitter ??= new Emitter();
    this.subscriptions = new CompositeDisposable();

    this.subscriptions.add(
      atom.config.onDidChange('symbols-view-plus', config => {
        this.emitter.emit('did-change-config', config);
      })
    );
    this.activated = true;
  },

  deactivate () {
    this.activated = false;
    this.subscriptions?.dispose();
  },

  get (key) {
    return atom.config.get(`symbols-view-plus.${key}`);
  },

  set (key, value) {
    return atom.config.set(`symbols-view-plus.${key}`, value);
  },

  onDidChange (callback) {
    return this.emitter.on('did-change-config', callback);
  }
};

module.exports = Config;
