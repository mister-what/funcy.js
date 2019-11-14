import { hookus } from "hookuspocus/src";

export const useAttribute = hookus(({ context: element }, attributeName) => {
  const attributeValue = element.getAttribute(attributeName);
  return [
    attributeValue,
    value => {
      element.skipQueue = true;
      element.setAttribute(attributeName, value);
    }
  ];
});
