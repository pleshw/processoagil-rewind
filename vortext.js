const ITEM_COUNT = 2;
const DIAMETER = 1300;
const PROJECTION = DIAMETER / 2;
const ANIM_DUR = 1000;
const STAGE_SELECTOR = '.stage'
const OUTER_SELECTOR = '.vortext'
const INNER_SELECTOR = '.vortextRibbon'

const els = document.querySelectorAll(OUTER_SELECTOR);
const stageEl = document.querySelector(STAGE_SELECTOR);

const getAngle = (adjacentLen, oppositeLen) => {
  const hypotenuse = Math.hypot(adjacentLen, oppositeLen);
  return Math.asin(oppositeLen / hypotenuse) * 180 / Math.PI;
}

const setStyles = () => {
  stageEl.style.width = `${ DIAMETER }px`;
  stageEl.style.perspective = `${ (DIAMETER / 1.5) * 1.5 }px`;
  for (let i = 0; i < els.length; i++) {
    if (i === 0) {
      els[i].querySelector(INNER_SELECTOR).style.transform = `translateZ(-${ PROJECTION }px) rotateY(${ 180 + 32 }deg)`;
      els[i].querySelector(INNER_SELECTOR).setAttribute(`inicioCostas`, true);
    }

    if (i === 1) {
      els[i].querySelector(INNER_SELECTOR).style.transform = `translateZ(-${ PROJECTION }px) rotateY(${ 32 }deg)`;
      els[i].querySelector(INNER_SELECTOR).setAttribute(`inicioFrente`, true);
    }
  }
}

const getLetterMarkup = (letter) => `<div class="letterWrap"><div class="letter"><span>${ letter }</span></div></div>`

const render = () => {
  for (let i = 0; i < els.length; i++) {
    const el = els[i].querySelector(INNER_SELECTOR);
    const bounds = el.getBoundingClientRect();
    const str = el.innerText.replace(/ /g, '\u00a0'); // replace spaces with thin spaces
    const strLen = str.split('').length;
    let newHtmlStr = str.split('').map(s => getLetterMarkup(s)).join('');
    el.innerHTML = newHtmlStr;
    let proportionInc = 0;
    let proportion = 0;
    let contentWidth = 0;
    let delta = 0;

    // Get the content width vs the bounds width
    for (let child of el.children) {
      contentWidth += child.children[0].getBoundingClientRect().width;
    }
    delta = bounds.width - contentWidth;

    for (let ii = 0; ii < el.children.length; ii++) {
      const correction = 1.1;
      const paddingMultiplier = 0.01;


      const childEl = el.children[ii].children[0];
      const grandChildEl = childEl.children[0];
      const grandChildBounds = grandChildEl.getBoundingClientRect();

      const padding = delta / strLen / 2 * paddingMultiplier;
      const boundsWidth = grandChildBounds.width + correction + padding;

      const halfAngle = getAngle(PROJECTION, boundsWidth / 2);

      proportionInc += halfAngle;
      childEl.style.transform = `rotateY(${ (proportionInc - 90) }deg)`;

      grandChildEl.style.transform = `translateZ(${ PROJECTION }px)`;
      proportionInc += halfAngle;
    }

  }

}

let iteration = 0;

const animate = () => {
  iteration++
  for (let i = 0; i < els.length; i++) {
    const inner = els[i].querySelector(INNER_SELECTOR);
    inner.classList.add('transitionEnabled');
    const actualAngle = inner.computedStyleMap().get('transform')[1].angle.value;
    inner.style.transform = `translateZ(-${ PROJECTION }px) rotateY(${ 160 + actualAngle }deg)`;
    inner.classList.toggle('spotlight');
  }
}
