import { chunk } from "/lib/esm/main.js";
import test from "./test.js";
import { action, inputs } from "./utils.js";

const chunkSize = 3;
const input = { action, inputs, chunkSize };

export default {
  noOutput: () => test(chunk, { ...input, outputType: "none" }),
  singleOutput: () => test(chunk, { ...input, outputType: "single" }),
  multipleOutputs: () => test(chunk, { ...input, outputType: "multiple" })
};
