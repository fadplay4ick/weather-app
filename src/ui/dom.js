export function el(tag, className, content) {
  const node = document.createElement(tag)
  if (className) node.className = className
  if (typeof content === 'string') node.textContent = content
  else if (content) node.append(...[].concat(content))
  return node
}

export function svgIcon(markup, className) {
  const wrapper = el('span', className)
  wrapper.innerHTML = markup ?? ''
  return wrapper
}