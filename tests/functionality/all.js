import { input, inputs, action, actions } from "./utils.js";
import { all } from "/lib/esm/main.js";

const test = async (input) => {
  let start = performance.now();
  const output = await all(input);
  const time = performance.now() - start;
  start = performance.now();
  console.log({ output, time });
};

const actionCount = 10;
const SINGLE_ACTION_INPUT = { action, actionCount };
const MULTIPLE_ACTIONS_INPUT = { actions };

const singleAction = {
  noInput: {
    noOutput: () => test({ action, actionCount, outputType: "none" }),
    singleOutput: () => test({ action, actionCount, outputType: "single" }),
    multipleOutputs: () => test({ action, actionCount, outputType: "multiple" })
  },
  singleInput: {
    noOutput: () => test({ action, actionCount, input, outputType: "none" }),
    singleOutput: () => test({ action, actionCount, input, outputType: "single" }),
    multipleOutputs: () => test({ action, actionCount, input, outputType: "multiple" })
  },
  multipleInputs: {
    noOutput: () => test({ action, actionCount, inputs, outputType: "none" }),
    singleOutput: () => test({ action, actionCount, inputs, outputType: "single" }),
    multipleOutputs: () => test({ action, actionCount, inputs, outputType: "multiple" })
  }
};

const multipleActions = {
  noInput: {
    noOutput: () => test({ actions, outputType: "none" }),
    singleOutput: () => test({ actions, outputType: "single" }),
    multipleOutputs: () => test({ actions, outputType: "multiple" })
  },
  singleInput: {
    noOutput: () => test({ actions, input, outputType: "none" }),
    singleOutput: () => test({ actions, input, outputType: "single" }),
    multipleOutputs: () => test({ actions, input, outputType: "multiple" })
  },
  multipleInputs: {
    noOutput: () => test({ actions, inputs, outputType: "none" }),
    singleOutput: () => test({ actions, inputs, outputType: "single" }),
    multipleOutputs: () => test({ actions, inputs, outputType: "multiple" })
  }
};

export default { singleAction, multipleActions };
