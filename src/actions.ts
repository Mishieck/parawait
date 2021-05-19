import performActions from "./perform-actions.js";

import {
  IOType,
  Input,
  Output,
  SA,
  MA,
  SAMA,
  SAMAOutput
} from "./types.js";

type ActionPerformerInput = Input & {
  getAction(actionCount: number): Function;
  actionCount: number;
};

type GetActionPerformer = (options: ActionPerformerInput) => SAMAOutput;


const actions = (inputType: IOType, outputType: IOType): SAMA => {
	let output: any | Array<any>, filter: Boolean;
	
	const sa: SA = ({ action, actionCount, input, inputs, filterOutput, onerror }) => getActionPerformer({
    getAction: (): Function => action,
    actionCount,
    input,
    inputs,
    filterOutput,
    onerror
  });

	const ma: MA = ({ actions, input, inputs, filterOutput, onerror }) => {
    return getActionPerformer({
      getAction: (index: number) => actions[index],
      actionCount: actions.length,
      input,
      inputs,
      filterOutput,
      onerror
    });
  };
	
	const getActionPerformer: GetActionPerformer = async (options) => {
    const {
      getAction,
      actionCount,
      input,
      inputs,
      filterOutput,
      onerror
    } = options;

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
			getOutput,
      onerror
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

  const outputFilter = (output: Output): boolean => output !== undefined;
	const getOutput = (): any => filter ? output.filter(outputFilter) : output;
	const sama: SAMA = { sa, ma };
	return sama;
};


export default actions;