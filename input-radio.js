import { setAttributes } from "https://js.sabae.cc/stdcomp.js";

class InputRadio extends HTMLElement {
  constructor(opts) {
    super();
    setAttributes(this, opts);
    this.name = (Math.random() * 10000000) >> 0;
    this.options = [];
    this._replace();
    if (opts?.data) {
      this.data = opts.data;
    }
    if (opts?.value) {
      this.value = opts.value;
    }
  }
  _replace() {
    let flg = false;
    const rep = (o) => {
      for (const opt of o.childNodes) {
        /*
        for (const n in opt) {
          console.log(n);
        }
        */
        // console.log(opt.nodeName);
        if (opt.nodeName == "OPTION") {
          const text = opt.innerHTML;
          const value = opt.getAttribute("value") || text;
          //const text = opt.textContent;
          const selected = opt.getAttribute("selected") === "" || this.getAttribute("value") === value;
          const disabled = opt.getAttribute("disabled");
          //console.log(value, text, selected, opt.getAttribute("selected"));
          
          const c = document.createElement("span");
          const label = document.createElement("label");
          const radio = document.createElement("input");
          radio.type = "radio";
          radio.name = this.name;
          radio.checked = selected;
          radio.disabled = disabled == "";
          radio.value = value;
          radio.id = Math.random();
          //label.appendChild(radio);
          //const span = document.createElement("span");
          //label.appendChild(span);
          label.setAttribute("for", radio.id);
          label.id = opt.id;
          //span.textContent = text;
          //span.innerHTML = text;
          label.innerHTML = text;
          
          //opt.parentNode.replaceChild(label, opt);
          c.appendChild(radio);
          c.appendChild(label);
          opt.parentNode.replaceChild(c, opt);
  
          //radio.onchange = () => this.changed(); // 勝手にやってくれる様子
          if (!flg) {
            flg = true;
            this.options = [];
          }
          this.options.push(radio);
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
    this._checkRequired();
    this.onchange = () => this._checkRequired();

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
  _checkRequired() {
    if (this.getAttribute("required") == "required") {
      this.className = this.value ? "" : "required";
    }
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
    const o = this.options.find(o => o.checked);
    if (!o) {
      return null;
    }
    return o.value;
  }
  set value(v) {
    if (v == null) {
      this.options.forEach(o => o.checked = false);
      this._checkRequired();
      return;
    }
    const o = this.options.find(o => o.value == v);
    if (!o) {
      this._checkRequired();
      return;
    }
    o.checked = true;
    this._checkRequired();
  }
  set data(json) {
    if (!Array.isArray(json)) {
      throw new Error("input-radio#data param is not Array");
    }
    if (json.length == 0) {
      this.innerHTML = "";
      this._checkRequired();
      return;
    }
    const d = json[0];
    if (typeof d == "object") {
      const ss = [];
      ss.push("<option value='' disabled>");
      for (const n in d) {
        ss.push("<span class=" + n + ">" + n + "</span>");
      }
      ss.push("</option>");
      let idx = 0;
      for (const d of json) {
        ss.push("<option value=" + idx++ + ">");
        for (const n in d) {
          ss.push("<span class=" + n + ">" + d[n] + "</span>");
        }
        ss.push("</option>");
      }
      this.innerHTML = ss.join("");
    } else if (typeof d == "string") {
      const ss = [];
      for (const d of json) {
        ss.push("<option value=" + d + ">");
        ss.push("<span>" + d + "</span>");
        ss.push("</option>");
      }
      this.innerHTML = ss.join("");
    }
    this._checkRequired();
  }
}

customElements.define("input-radio", InputRadio);

export { InputRadio };
