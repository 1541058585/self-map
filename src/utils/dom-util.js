
/**
* dom操作
* */
/*eslint-disable */
export const DomUtil = {
  // 获取一个元素
  get: function (id) {
    return typeof id === 'string' ? document.getElementById(id) : id;
  },
  // 获取元素的样式
  getStyle: function (el, style) {
    // IE: currentStyle
    // Firefox: defaultView
    let value = el.style[style] || (el.currentStyle && el.currentStyle[style]);
    if ((!value || value === 'auto') && document.defaultView) {
      let css = document.defaultView.getComputedStyle(el, null);
      let value = css ? css[style] : null;
    }
    return value === 'auto' ? null : value;
  },
  // 创建一个元素（可以将其放入父元素） tagName：创建的元素（div,span....）,className:class样式的名称，container:父容器存在，放入父容器
  create: function (tagName, className, container) {
    let el = document.createElement(tagName);
    el.className = className;
    // 是否存在父容器
    if (container) {
      container.appendChild(el);
    }
    return el;
  },
  // 移除元素 // 先获取父元素，然后父元素移除子元素
  remove: function (el) {
    let parent = el.parentNode;
    if (parent) {
      parent.removeChild(el);
    }
  },
  // 清空元素内部子元素
  empty: function (el) {
    while (el.firstChild) {
      el.removeChild(el.firstChild);
    }
  },
  // 置于顶上  将元素取出放在队尾或者说是叠加层的最上面，就像加饼一样，一层一层往上放，但是如果引用的是同一个元素，则在父容器中有且仅存在一个元素。
  toFront: function (el) {
    el.parentNode.appendChild(el);
  },
  // 置于底部 置于队首或者叠加层底部。
  toBack: function (el) {
    let parent = el.parentNode;
    // insertBefore：insertBefore(newchild,refchild)
    parent.insertBefore(el, parent.firstChild);
  },
  // 返回class集合  className.baseVal是获取SVG的一个方法，className是获取带空格类名的集合。
  getClass: function (el) {
    return el.className.baseVal === undefined
      ? el.className
      : el.className.baseVal;
  },
  // 是否有CSS类
  hasClass: function (el, name) {
    // 先判断是否支持了classList，classList包含了has、add、remove等方法
    if (el.classList !== undefined) {
      return el.classList.contains(name);
    }
    let className = DomUtil.getClass(el);
    return (
      className.length > 0 && new RegExp(`(^|\\\\s)${name}(\\\\s|$)`).test(className)
    );
  },
  // 设置class  setClass,覆盖之前的类串 DomUtil.setClass(el, (className ? className + ' ' : '') + name); } }
  setClass: function (el, name) {
    if (el.className.baseVal === undefined) {
      el.className = name;
    } else {
      el.className.baseVal = name;
    }
  },
   myTrim: function (x) {
    return x.replace(/^\s+|\s+$/gm, '');
  },
  // 移除class2
  removeClass: function (el, name) {
    if (el.classList !== undefined) {
      el.classList.remove(name);
    } else {
      // 以字符串的形式替换
      DomUtil.setClass(el, DomUtil.myTrim((`' '${DomUtil.getClass(el)}' '`).replace(`' '${name} ' '`, `' '`))
      );
    }
  },
  // 设置透明度
  setOpacity: function (el, value) {
    // 如果存在opactity的属性
    if ('opacity' in el.style) {
      el.style.opacity = value;
    } else if ('filter' in el.style) {
      // 存在filter 8 9
      let filter = false;
      let filterName = 'DXImageTransform.Microsoft.Alpha';
      // filters collection throws an error if we try to retrieve a filter that doesn't exist
      try {
        filter = el.filters.item(filterName);
      } catch (e) {
        // don't set opacity to 1 if we haven't already set an opacity,it isn't needed and breaks transparent pngs.
        if (value === 1) {
          return;
        }
        value = Math.round(value * 100);
        if (filter) {
          filter.Enabled = value !== 100;
          filter.Opacity = value;
        } else {
          el.style.filter += `PRogid: ${filterName}(opacity=${value})`;
        }
      }
    }
  }
};
