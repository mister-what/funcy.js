import { useRenderer } from "./use_renderer";
import { html, render } from "htm/preact/standalone";

export const usePreactHtm = () => {
  useRenderer((view, shadowRoot) => {
    render(view, shadowRoot);
  });
  return html;
};
