import performActions from "./perform-actions.js";

import {
  Action,
  ActionGetter,
  Actions,
  ActionType,
  Input,
  InputGetter,
  Inputs,
  InputType,
  Onerror,
  Output,
  OutputGetter,
  Outputs,
  OutputSetter,
  OutputType,
  Promises,
  PromisesOptions,
  PromisesOutput
} from "./types.js";


type ActionGetters = {
  single: ActionGetter,
  multiple: ActionGetter
};

type InputGetters = {
  none: InputGetter,
  single: InputGetter,
  multiple: InputGetter
};

type OutputSetters = {
  none: OutputSetter,
  single: OutputSetter,
  multiple: OutputSetter
};

type OutputInitializer = (outputType: OutputType, outputCount: number) => Output | Outputs;

const promises: Promises = async (options) => {
  let {
    input,
    inputs,
    action,
    actions,
    actionCount,
    outputType,
    filterOutput,
    onerror
  } = options;

  if (!actionCount) {
    actionCount = actions ? actions.length
    : inputs ? inputs.length
    : undefined;
  };

  if (!actionCount) throw new Error(`Parameter missing required property "actionCount".`);

	let output: Output | Outputs = initializeOutput(outputType, actionCount || inputs && inputs.length);
  const actionType: ActionType = action ? "single" : "multiple";

  const inputType: InputType = (
    input ? "single"
    : inputs ? "multiple"
    : "none"
  );

  const getAction: ActionGetter = createActionGetters(action, actions)[actionType];
  const getInput: InputGetter = createInputGetters(input, inputs)[inputType];
  const outputFilter = (output: Output): boolean => output !== undefined;
	const getOutput: OutputGetter = () => filterOutput ? output.filter(outputFilter) : output;

  const outputSetters: OutputSetters = {
		none: () => undefined,
		single: (actionOutput) => {
			if (actionOutput !== undefined) output = actionOutput;
		},
		multiple: (actionOutput, index) => {
			output[index] = actionOutput;
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
  return (outputType === "multiple") ? new Array(outputCount) : undefined;
};

const createActionGetters = (action: Action, actions: Actions): ActionGetters => {
  return {
    single: () => action,
    multiple: (index) => actions[index]
  };
};

const createInputGetters = (input: Input, inputs: Inputs): InputGetters => {
  return {
    none: () => undefined,
    single: () => input,
    multiple: (index: number) => inputs[index]
  };
};


export default promises;