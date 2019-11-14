import { hookus, useEffect, useState } from "hookuspocus/src";

export const useCSS = hookus(({ context }, parts, ...slots) => {
  if (!Array.isArray(parts) || typeof parts !== "string")
    throw new TypeError("Argument 1 must have type of string");
  const styles = (Array.isArray(parts)
    ? parts
        .map((part, index) => {
          if (slots[index] != null) {
            return part + slots[index];
          } else {
            return part;
          }
        })
        .join("")
    : parts
  ).replace(/\s+/gm, " ");

  const { _shadowRoot: shadowRoot } = context;
  const [styleElement, setStyleElement] = useState(null);

  useEffect(() => {
    if (!styleElement) {
      setStyleElement(document.createElement("style"));
    }
    if (styleElement) {
      shadowRoot.appendChild(styleElement);
      return () => {
        styleElement.remove();
      };
    }
  }, [styleElement]);

  useEffect(() => {
    if (styleElement) {
      styleElement.innerHTML = styles;
    }
  }, [styleElement, styles]);
});
