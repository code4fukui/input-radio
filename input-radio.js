class InputRadio extends HTMLElement {
  constructor() {
    super();
    this.name = (Math.random() * 10000000) >> 0;
    this._replace();
  }
  _replace() {
    this.opts = [];

    const rep = (o) => {
      for (const opt of o.childNodes) {
        /*
        for (const n in opt) {
          console.log(n);
        }
        */
        // console.log(opt.nodeName);
        if (opt.nodeName == "OPTION") {
          const value = opt.getAttribute("value");
          const text = opt.textContent;
          const selected = opt.getAttribute("selected");
          //console.log(value, text, selected);
  
          const label = document.createElement("label");
          const radio = document.createElement("input");
          radio.type = "radio";
          radio.name = this.name;
          radio.checked = selected == "";
          radio.value = value || text;
          label.appendChild(radio);
          const span = document.createElement("span");
          label.appendChild(span);
          span.textContent = text;
  
          opt.parentNode.replaceChild(label, opt);
  
          //radio.onchange = () => this.changed(); // 勝手にやってくれる様子
          this.opts.push(radio);
        } else if (opt.nodeName == "INPUT") {
          //console.log(opt.nodeName, opt.getAttribute("type"));
          opt.name = this.name;
        } else {
          const ch = opt.childNodes;
          if (ch.length > 0) {
            rep(opt);
          }
        }
      }
    };
    rep(this);

    // Options for the observer (which mutations to observe)
    const config = { attributes: true, childList: true, subtree: true };

    // Callback function to execute when mutations are observed
    const callback = (mlist, observer) => {
      //console.log(mlist);
      /*
      // Use traditional 'for loops' for IE 11
      for (const mutation of mlist) {
        if (mutation.type === 'childList') {
          console.log('A child node has been added or removed.');
        } else if (mutation.type === 'attributes') {
          console.log('The ' + mutation.attributeName + ' attribute was modified.');
        }
      }
      */
      // Later, you can stop observing
      observer.disconnect();
      this._replace();
    };
    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(callback);
    // Start observing the target node for configured mutations
    observer.observe(this, config);
  }
  /*
  changed() { // 勝手にやってくれたので不要
    if (this.onchange != null) {
      const v = this.value;
      console.log(v, this.lastvalue)
      if (v != this.lastvalue) {
        console.log("ch")
        this.lastvalue = v;
        //this.onchange();
      }
    }
  }
  */
  get value() {
    const o = this.opts.find(o => o.checked);
    if (!o) {
      return null;
    }
    return o.value;
  }
  set value(v) {
    const o = this.opts.find(o => o.value == v);
    if (!o) {
      return;
    }
    o.checked = true;
  }
}


customElements.define("input-radio", InputRadio);

export { InputRadio };
