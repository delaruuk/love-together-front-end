import { IRevealElement } from "./types";

export const handleReveal = (elem: IRevealElement, variant:string,  revealPoint = 95) => {
  const revealElemTop = elem.getBoundingClientRect().top;
  const revealElemBottom = elem.getBoundingClientRect().bottom;
  const windowHeight = window.innerHeight;
  const revealElemTopPercentage = (revealElemTop / windowHeight) * 100;
  const revealElemBottomPercentage = (revealElemBottom / windowHeight) * 100;

  if (
    revealElemTopPercentage < revealPoint &&
    revealElemBottomPercentage > 100 - (revealPoint + 10)
  ) {
    elem.classList.add(`${variant}-reveal`);
    elem.classList.remove(`${variant}-hide`);
  } else {
    elem.classList.add(`${variant}-hide`);
    elem.classList.remove(`${variant}-reveal`);
  }
};