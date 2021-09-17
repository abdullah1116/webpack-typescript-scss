export function lazyScript() {
  const element = document.createElement('div');
  const button = document.createElement('button');
  const br = document.createElement('br');

  button.innerHTML = 'load lazy styles';
  element.appendChild(br);
  element.appendChild(button);
  // @ts-ignore
  button.onclick = () => import('../scss/lazyStyles.scss');
  document.body.appendChild(element);
}
