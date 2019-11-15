import { hookus } from "hookuspocus/src";
export const useExposeMethod = hookus(
  ({ context: element }, name, method) =>
    void (element[name] = method.bind(element))
);
