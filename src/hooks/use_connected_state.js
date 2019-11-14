import { hookus } from "hookuspocus/src";

export const useConnectedState = hookus(
  ({ context: element }) => element._isConnected
);
