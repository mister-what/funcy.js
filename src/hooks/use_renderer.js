import { hookus } from "hookuspocus/src";

export const useRenderer = hookus(
  ({ context }, newRenderer) => void (context._renderer = newRenderer)
);
