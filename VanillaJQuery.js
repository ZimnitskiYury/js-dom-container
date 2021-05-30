class VanillaJQuery {
  constructor(node) {
    this.node = node;
  }

  isNodeList() {
    return (this.node instanceof NodeList);
  }

  first() {
    this.node = this.node.item(0);
    return this;
  }

  last() {
    this.node = this.node.item(this.node.length - 1);
    return this;
  }

  // ToDo: Split string by space separator 'myClass-1 myClass-2'
  addClass(...classNames) {
    if (this.isNodeList()) {
      this.node.forEach((x) => x.classList.add(...classNames));
      return this;
    }
    this.node.classList.add(...classNames);
    return this;
  }

  // ToDo: Split string by space separator 'myClass-1 myClass-2'
  removeClass(...classNames) {
    if (this.isNodeList()) {
      this.node.forEach((x) => x.classList.remove(...classNames));
      return this;
    }
    this.node.classList.remove(...classNames);
    return this;
  }

  append(element) {
    this.node.append(element);
    return this;
  }

  remove() {
    this.node.remove();
  }

  text(string) {
    if (string === undefined) {
      if (this.isNodeList()) {
        let text = '';
        this.node.forEach((x) => {
          if (text) {
            text += ` ${x.innerText}`;
          } else {
            text += x.innerText;
          }
        });
        return text;
      }
      return this.node.innerText;
    }

    if (this.isNodeList()) {
      this.node.forEach((x) => {
        // eslint-disable-next-line no-param-reassign
        x.innerText += string;
      });
      return this;
    }
    this.node.innerText += string;
    return this;
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
  const node = document.querySelectorAll(selector);
  return new VanillaJQuery(node);
}
