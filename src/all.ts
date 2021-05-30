import performActions from "./perform-actions";

import {
  Action,
  ActionGetter,
  Actions,
  ActionType,
  Input,
  InputGetter,
  Inputs,
  InputType,
  Output,
  OutputGetter,
  Outputs,
  OutputSetter,
  OutputType,
  all
} from "./types.js";

type ActionGetters = {
  [actionType in ActionType]: ActionGetter;
};

type InputGetters = {
  [inputType in InputType]: InputGetter;
};

type OutputSetters = {
  [outputType in OutputType]: OutputSetter;
};

type OutputInitializer = (outputType: OutputType, outputCount: number) => Output | Outputs;

const all: all = async (options) => {
  let { input, inputs, action, actions, actionCount, outputType = "none", filterOutput, onerror = "throw" } = options;

  if (!actionCount) {
    actionCount = actions ? actions.length : inputs ? inputs.length : undefined;
  }

  if (!actionCount) throw new Error(`Parameter missing required property "actionCount".`);

  let output: Output | Outputs = initializeOutput(outputType, actionCount);
  const actionType: ActionType = action ? "single" : "multiple";

  const inputType: InputType = input ? "single" : inputs ? "multiple" : "none";

  const getAction: ActionGetter = createActionGetters(action, actions)[actionType];
  const getInput: InputGetter = createInputGetters(input, inputs)[inputType];
  const outputFilter = (output: Output): boolean => output !== undefined;
  const getOutput: OutputGetter = () => (filterOutput ? (output as Outputs).filter(outputFilter) : output);

  const outputSetters: OutputSetters = {
    none: () => undefined,
    single: (actionOutput) => {
      if (actionOutput !== undefined) output = actionOutput;
    },
    multiple: (actionOutput, index) => {
      (output as Outputs)[index] = actionOutput;
    }
  };

  const setOutput = outputSetters[outputType];

  return performActions({
    getAction,
    actionCount,
    getInput,
    setOutput,
    getOutput,
    onerror
  });
};

const initializeOutput: OutputInitializer = (outputType, outputCount) => {
  return outputType === "multiple" ? new Array(outputCount) : undefined;
};

const createActionGetters = (action?: Action, actions?: Actions): ActionGetters => {
  return {
    single: () => action as Action,
    multiple: (index) => (actions as Actions)[index]
  };
};

const createInputGetters = (input?: Input, inputs?: Inputs): InputGetters => {
  return {
    none: () => undefined,
    single: () => input,
    multiple: (index: number) => (inputs as Inputs)[index]
  };
};

export default all;
