import { useRenderer } from "../hooks/use_renderer";
import { pocus } from "hookuspocus/src";
import { html, render } from "htm/preact/standalone";

export const usePreactHtm = pocus(() => {
  useRenderer((view, shadowRoot) => {
    render(view, shadowRoot);
  });
  return html;
});
