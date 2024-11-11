import { MODE_SCROLL_SLIDER_ITEM } from "./constants.slider.client";

export function isDifferenceOne(numberOne, numberTwo) {
    return Math.abs(numberOne - numberTwo) === 1
}

export function isDifferenceTwoOrMoreThanTwo(numberOne, numberTwo) {
    return Math.abs(numberOne - numberTwo) >= 2
}

export function isBetweenNumbers(number, edgeOne, edgeTwo) {
    return (number > edgeOne && number < edgeTwo) || (number < edgeOne && number > edgeTwo);
}

export function isBetweenNumbersInclusive(number, edgeOne, edgeTwo) {
    return (number >= edgeOne && number <= edgeTwo) || (number <= edgeOne && number >= edgeTwo);
}

/* */

export function getPageNumberOfSliderItem(sliderItemIndex, columnOrRowCount) {
    return Math.floor(sliderItemIndex / columnOrRowCount)
}

export function areSliderItemsAtSamePage(sliderItemIndex, sliderIndex, columnOrRowCount) {
    return getPageNumberOfSliderItem(sliderItemIndex, columnOrRowCount) === getPageNumberOfSliderItem(sliderIndex, columnOrRowCount)
}

export function getPageCount(scrollMode, elementCount, columnOrRowCount) {
    if (scrollMode === MODE_SCROLL_SLIDER_ITEM || columnOrRowCount === 1)
        return elementCount - columnOrRowCount + 1;

    return Math.ceil(elementCount / columnOrRowCount);
}