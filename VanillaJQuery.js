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
    this.append = function append(element) {
      this.node.append(element);
      return this;
    };
    this.remove = function remove() {
      this.node.remove();
    };
    this.text = function text() {
      return this.node.innerText;
    };
    this.attr = function attr(name, value) {
      this.node.setAttribute(name, value);
      return this;
    };
    this.children = function children() {
      this.node = this.node.children;
      return this;
    };
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
    this.click = function click(callback) {
      if (typeof callback !== 'function') {
        return this;
      }
      this.node.addEventListener('click', callback);
      return this;
    };
  }
}

// eslint-disable-next-line no-unused-vars
function $(selector) {
  const node = document.querySelector(selector);
  return new VanillaJQuery(node);
}
