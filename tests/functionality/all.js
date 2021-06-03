import { input, inputs, action, actions } from "./utils.js";
import { all } from "/lib/esm/main.js";
import test from "./test.js";

const actionCount = 10;
const SINGLE_ACTION_INPUT = { action, actionCount };
const MULTIPLE_ACTIONS_INPUT = { actions };

const singleAction = {
  noInput: {
    noOutput: () => test(all, { action, actionCount, outputType: "none" }),
    singleOutput: () => test(all, { action, actionCount, outputType: "single" }),
    multipleOutputs: () => test(all, { action, actionCount, outputType: "multiple" })
  },
  singleInput: {
    noOutput: () => test(all, { action, actionCount, input, outputType: "none" }),
    singleOutput: () => test(all, { action, actionCount, input, outputType: "single" }),
    multipleOutputs: () => test(all, { action, actionCount, input, outputType: "multiple" })
  },
  multipleInputs: {
    noOutput: () => test(all, { action, actionCount, inputs, outputType: "none" }),
    singleOutput: () => test(all, { action, actionCount, inputs, outputType: "single" }),
    multipleOutputs: () => test(all, { action, actionCount, inputs, outputType: "multiple" })
  }
};

const multipleActions = {
  noInput: {
    noOutput: () => test(all, { actions, outputType: "none" }),
    singleOutput: () => test(all, { actions, outputType: "single" }),
    multipleOutputs: () => test(all, { actions, outputType: "multiple" })
  },
  singleInput: {
    noOutput: () => test(all, { actions, input, outputType: "none" }),
    singleOutput: () => test(all, { actions, input, outputType: "single" }),
    multipleOutputs: () => test(all, { actions, input, outputType: "multiple" })
  },
  multipleInputs: {
    noOutput: () => test(all, { actions, inputs, outputType: "none" }),
    singleOutput: () => test(all, { actions, inputs, outputType: "single" }),
    multipleOutputs: () => test(all, { actions, inputs, outputType: "multiple" })
  }
};

export default { singleAction, multipleActions };
