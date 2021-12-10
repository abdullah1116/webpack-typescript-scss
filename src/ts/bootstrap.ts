import '/src/scss/index.scss';

window.addEventListener('load', () => {
  const headingText = `Webpack 5.28 & TypeScript 4.4 & Scss 1.41`;
  document.getElementById('error')!.innerText = '';
  document.getElementById('heading')!.innerText = headingText;
  import(
    /* webpackChunkName: 'lazyScript', webpackPrefetch: true */ './lazyScript'
  ).then((module) => {
    module.lazyScript();
  });
});
