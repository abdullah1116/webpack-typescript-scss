import '../scss/index.scss';
import { lazyScript } from './lazyScript';

window.addEventListener('load', () => {
  const headingText = `Webpack 5.28 & TypeScript 4.4 & Scss 1.41`;
  document.getElementById('error')!.innerText = '';
  document.getElementById('heading')!.innerText = headingText;
  lazyScript();
});
