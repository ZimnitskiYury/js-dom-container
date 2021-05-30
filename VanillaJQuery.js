class VanillaJQuery {
  constructor(node) {
    this.node = node;
  }

  addClass(className) {
    this.node.classList.add(className);
    return this;
  }

  removeClass(className) {
    this.node.classList.remove(className);
    return this;
  }

  append(element) {
    this.node.append(element);
    return this;
  }

  remove() {
    this.node.remove();
  }

  text() {
    return this.node.innerText;
  }

  attr(name, value) {
    this.node.setAttribute(name, value);
    return this;
  }

  children() {
    this.node = this.node.children;
    return this;
  }

  empty() {
    while (this.node.firstChild) {
      this.node.removeChild(this.node.firstChild);
    }
    return this;
  }

  css(property, value) {
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
  }

  click(callback) {
    if (typeof callback !== 'function') {
      return this;
    }
    this.node.addEventListener('click', callback);
    return this;
  }
}

// eslint-disable-next-line no-unused-vars
function $(selector) {
  const node = document.querySelector(selector);
  return new VanillaJQuery(node);
}
