import performActions from "./perform-actions.js";
import { IOType, Input, SAInput, MAInput, Action, Actions, ActionPerformerInput } from "./types.js";


const actions = (inputType: IOType, outputType: IOType): Actions => {
	let output: any, filter: Boolean;
	
	const sa = ({ action, actionCount, input, inputs, filterOutput }: SAInput): Promise<any> => getActionPerformer({
    getAction: (): Function => action,
    actionCount,
    input,
    inputs,
    filterOutput
  });

	const ma = ({ actions, input, inputs, filterOutput }: MAInput): Promise<any> => getActionPerformer({
    getAction: (actionCount: number) => actions[actionCount],
    actionCount: actions.length,
    input,
    inputs,
    filterOutput
  });
	
	const getActionPerformer = async ({ getAction, actionCount, input, inputs, filterOutput }: ActionPerformerInput) => {
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
			none: (): undefined => undefined,
			single: (): any => input,
			multiple: (actionCount: number): any => inputs[actionCount]
		};
	};
	
	const setOutput = {
		none: (): undefined => undefined,
		single: (actionCount: number, actionOutput: any) => {
			if (actionOutput !== undefined) output = actionOutput;
		},
		multiple: (actionCount: number, actionOutput: any) => {
			output[actionCount] = actionOutput;
		}
	};
	
	const getOutput = (): any => filter ? output.filter((value: any): boolean => value !== undefined) : output;
	
	return { sa, ma };
};


export default actions;