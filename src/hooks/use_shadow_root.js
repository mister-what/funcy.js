import { hookus } from "hookuspocus/src";

export const useShadowRoot = hookus(({ context: element }) => element._shadowRoot);
