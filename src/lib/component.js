import { queueRender, defaultRenderer, getPassableProps } from "./renderer";
import { onStateChanged, fidibus } from "hookuspocus/src";

const componentMap = new Map();

function addComponent(name, options = {}) {
  const { BaseElement = HTMLElement } = options;
  class Component extends BaseElement {
    constructor() {
      super();
      this._props = {};
      this._renderer = defaultRenderer;
      this._isConnected = false;
      onStateChanged(queueRender);
    }
    connectedCallback() {
      if (!this._shadowRoot) {
        const { shadowOptions } = options;
        this._shadowRoot = this.attachShadow({
          mode: "open",
          ...shadowOptions
        });
      }
      if (!this._isConnected) {
        this._isConnected = true;
        queueRender(this);
      }
    }
    disconnectedCallback() {
      if (this._isConnected) {
        this._isConnected = false;
        queueRender(this);
      }
    }
    destroy() {
      this.parentElement.removeChild(this);
      //dispose(this);
    }
    async render() {
      const propsId = this.getAttribute("data-props");
      if (propsId) {
        this._props = getPassableProps(propsId);
        this.skipQueue = true;
        this.removeAttribute("data-props");
      }
      const wrapped = fidibus(componentMap.get(name), this);
      const view = await Promise.resolve().then(() => wrapped(this._props));
      await this._renderer(view, this._shadowRoot);
      this.init = false;
    }
    attributeChangedCallback(attrName, oldVal, newVal) {
      if (this.init) {
        return;
      }
      if (!this.skipQueue && oldVal !== newVal) {
        queueRender(this);
      }
      this.skipQueue = false;
    }
    static get observedAttributes() {
      let observedAttributes = ["data-props"];
      if (options.observedAttributes) {
        observedAttributes = observedAttributes.concat(
          options.observedAttributes
        );
      }
      return observedAttributes;
    }
  }
  customElements.define(name, Component);
}
export const defineComponent = (name, component, options = {}) => {
  if (!componentMap.has(name)) {
    componentMap.set(name, component);
    addComponent(name, options);
  } else {
    console.warn(`Component ${name} was already defined.`);
  }
};
