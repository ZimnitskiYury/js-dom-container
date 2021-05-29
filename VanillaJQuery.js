class VanillaJQuery {
  constructor(node) {
    this.node = node;
    this.addClass = function addClass(className) {
      this.node.classList.add(className);
      return this;
    };
    this.removeClass = function removeClass(className) {
      this.node.classList.remove(className);
      return this;
    };
    //  append(element) {},
    //  remove(element) {},
    this.text = function text() {
      return this.node.innerText;
    };
    this.attr = function attr(name, value) {
      this.node.setAttribute(name, value);
      return this;
    };
    //  children(element) {},
    this.empty = function empty() {
      while (this.node.firstChild) {
        this.node.removeChild(this.node.firstChild);
      }
      return this;
    };
    this.css = function css(property, value) {
      if (property instanceof Map) {
        property.forEach((val, key) => {
          this.node.style[key] = val;
        });
      } else {
        if (value === undefined) {
          const computedStyle = getComputedStyle(this.node);
          return computedStyle[property];
        }
        this.node.style[property] = value;
      }
      return this;
    };
    //  click() {},
  }
}

// eslint-disable-next-line no-unused-vars
function $(selector) {
  const node = document.querySelector(selector);
  return new VanillaJQuery(node);
}
