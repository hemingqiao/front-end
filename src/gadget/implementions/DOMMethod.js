/*! *****************************************************************************
@author Heming
founded at 2021-01-05 17:07:44
created by WebStorm
description: 模拟DOM中的一些方法
***************************************************************************** */

class DOMMethod {
  getElementById(id) {
    const startNode = document.documentElement;
    return dfs(startNode, id);

    function dfs(startNode, id) {
      if (startNode.id === id) {
        return startNode;
      }
      for (let n of startNode.children) {
        let res = dfs(n, id);
        if (res) return n;
      }
      return null;
    }
  }

  /**
   * DOM元素上的getElementsByTagName方法搜索范围限定为该元素的子元素（后代）
   * @param startNode
   * @param tagName
   * @return {[]}
   */
  getElementsByTagName(startNode, tagName) {
    const ret = [];
    tagName = tagName.toUpperCase();
    dfs(startNode, tagName);
    return ret;

    function dfs(startNode, tagName) {
      if (startNode.nodeType === document.TEXT_NODE) {
        return;
      }
      for (let node of startNode.children) {
        if (node.tagName === tagName) ret.push(node);
        dfs(node, tagName);
      }
    }
  }

  // another version
  getElementsByTagName1(startNode, tagName) {
    let ret = [];
    if (startNode.nodeType === document.TEXT_NODE) {
      return [];
    } else {
      for (let node of startNode.children) {
        if (node.tagName.toLowerCase() === tagName) ret.push(node);
        ret = ret.concat(this.getElementsByTagName1(node, tagName));
      }
      return ret;
    }
  }

  /**
   * 深克隆一个DOM节点
   * @see Node.cloneNode
   * @param node
   * @return {Node}
   */
  cloneNode(node) {
    let ret;
    if (node.nodeType === document.TEXT_NODE) {
      ret = document.createTextNode(node.tagName);
      return ret;
    } else if (node.nodeType === document.ELEMENT_NODE) {
      ret = document.createElement(node.tagName);
      const attrNames = node.getAttributeNames();
      for (let attr of attrNames) {
        ret.setAttribute(attr, node.getAttribute(attr));
      }
      for (let child of node.childNodes) {
        ret.appendChild(this.cloneNode(child));
      }
      return ret;
    }
  }


  createElement(nodeName, attr = {}, ...children) {
    let ret = document.createElement(nodeName);
    let keys = Object.keys(attr);
    for (let key of keys) {
      ret.setAttribute(key, attr[key]);
    }
    for (let child of children) {
      ret.appendChild(child);
    }
    return ret;
  }


  /**
   * @see Node.normalize
   * @param node
   * @return {*}
   */
  normalize(node) {
    let children = [].slice.call(node.childNodes);
    let i = 0;
    while (i < children.length) {
      if (children[i].nodeType === document.ELEMENT_NODE) {
        this.normalize(children[i++]);
      } else {
        let temp = '';
        while (i < children.length && children[i].nodeType === document.TEXT_NODE) {
          temp += children[i].nodeValue;
          node.removeChild(children[i++])
        }
        // if (i < children.length) {
        //   node.insertBefore(document.createTextNode(temp), children[i]);
        // } else {
        //   node.appendChild(document.createTextNode(temp));
        // }

        // insertBefore的第二个参数为null时，insertBefore的行为和appendChild一致
        node.insertBefore(document.createTextNode(temp), i < children.length ? children[i] : null);
      }
    }
    return node;
  }

  /**
   * 参见：https://developer.mozilla.org/zh-CN/docs/Web/API/Node/textContent
   * @see Node.textContent
   * @param node
   * @return {string}
   */
  textContent(node) {
    let ret = '';
    if (node.nodeType === document.TEXT_NODE) {
      ret = node.nodeValue;
    } else if (node.nodeType === document.ELEMENT_NODE) {
      for (let e of node.childNodes) {
        ret += this.textContent(e);
      }
    }
    return ret;
  }


  /**
   * 参见：https://developer.mozilla.org/zh-CN/docs/Web/API/Element/outerHTML
   * @see Element.outerHTML
   * @param node
   * @return {string}
   */
  outerHTML(node) {
    let ret = '';
    if (node.nodeType === document.TEXT_NODE) {
      ret = node.nodeValue;
    } else if (node.nodeType === document.ELEMENT_NODE) {
      ret += `<${node.tagName.toLowerCase()}`;
      let attrNames = node.getAttributeNames();
      if (attrNames.length) {
        ret += ` ${Array.from(attrNames).map(name => `${name}="${node.getAttribute(name)}"`).join(" ")}`;
      }
      ret += ">";
      ret += Array.from(node.childNodes).map(this.outerHTML.bind(this)).join(" ");
      ret += `</${node.tagName.toLowerCase()}>`;
    }
    return ret;
  }
}
