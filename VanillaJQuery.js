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

  // ToDo: test this
  append(element) {
    if (this.isNodeList()) {
      this.node.forEach((x) => x.append(element));
      return this;
    }
    this.node.append(element);
    return this;
  }

  remove() {
    if (this.isNodeList()) {
      this.node.forEach((x) => x.remove());
    } else {
      this.node.remove();
    }
  }

  // ToDo: add multiple arguments ...strings
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
    if (this.isNodeList()) {
      this.node.forEach((x) => x.setAttribute(name, value));
      return this;
    }
    this.node.setAttribute(name, value);
    return this;
  }

  // ToDo: need to add work with Nodelist
  children() {
    this.node = this.node.children;
    return this;
  }

  empty() {
    if (this.isNodeList()) {
      this.node.forEach((x) => {
        while (x.firstChild) {
          x.removeChild(x.firstChild);
        }
      });
      return this;
    }
    while (this.node.firstChild) {
      this.node.removeChild(this.node.firstChild);
    }
    return this;
  }

  css(property, value) {
    function setCss(node) {
      if (property instanceof Map) {
        // eslint-disable-next-line no-param-reassign
        property.forEach((val, key) => { node.style[key] = val; });
      } else {
        // eslint-disable-next-line no-param-reassign
        node.style[property] = value;
      }
    }

    function getCss(node) {
      const computedStyle = getComputedStyle(node);
      return computedStyle[property];
    }

    if (this.isNodeList()) {
      const array = [];
      this.node.forEach((x) => {
        if (value === undefined && !(property instanceof Map)) {
          array.push(getCss(x));
        }
        setCss(x);
      });
      if (Array.length === 0) {
        return this;
      }
      return array;
    }
    if (value === undefined && !(property instanceof Map)) {
      return getCss(this.node);
    }
    setCss(this.node);
    return this;
  }

  // ToDo: need to add work with Nodelist
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
