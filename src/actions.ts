import performActions from "./perform-actions.js";

import {
  IOType,
  Input,
  Output,
  SA,
  MA,
  SAMA,
} from "./types.js";

type ActionPerformerInput = Input & {
  getAction(actionCount: number): Function;
  actionCount: number;
};


const actions = (inputType: IOType, outputType: IOType): SAMA => {
	let output: any | Array<any>, outputCount: number, filter: Boolean;
	
	const sa: SA = ({ action, actionCount, input, inputs, filterOutput }) => getActionPerformer({
    getAction: (): Function => action,
    actionCount,
    input,
    inputs,
    filterOutput
  });

	const ma: MA = ({ actions, input, inputs, filterOutput }) => {
    return getActionPerformer({
      getAction: (index: number) => actions[index],
      actionCount: actions.length,
      input,
      inputs,
      filterOutput
    });
  };
	
	const getActionPerformer = async ({ getAction, actionCount, input, inputs, filterOutput }: ActionPerformerInput) => {
    const getOutputCount = (): number => {
      return (
        actionCount ? actionCount
        : inputs ? inputs.length
        : 0
      );
    };
    
    if (outputType === "multiple") output = new Array(getOutputCount());
    filter = filterOutput;
	
		return performActions({
			getAction,
			actionCount,
			getInput: getInput({ input, inputs })[inputType],
			setOutput: setOutput[outputType],
			getOutput
		});
	};
	
	const getInput = ({ input, inputs }: Input) => {
		return {
			none: (): Input => undefined,
			single: (): Input => input,
			multiple: (index: number): Input => inputs[index]
		};
	};
	
	const setOutput = {
		none: (): undefined => undefined,
		single: (actionOutput: any) => {
			if (actionOutput !== undefined) output = actionOutput;
		},
		multiple: (actionOutput: Output, index: number,) => {
			output[index] = actionOutput;
		}
	};
	
	const getOutput = (): any => filter ? output.filter((value: any): boolean => value !== undefined) : output;
	const sama: SAMA = { sa, ma };
	return sama;
};


export default actions;