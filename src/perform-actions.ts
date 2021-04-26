import { Action, Input, SAMAOutput } from "./types.js";


type PerformAcionInput = {
  getAction: Function;
  actionCount: number;
  getInput: Function;
  setOutput: Function;
  getOutput: Function;
};

type PerformActions = (options: PerformAcionInput) => SAMAOutput;
type Promisify = (action: Action, input: Input, actionIndex: number) => SAMAOutput;

const performActions: PerformActions = ({ getAction, actionCount, getInput, setOutput, getOutput }) => {
	return new Promise((resolve: Function, reject: Function) => {
		let resolveCount: number = actionCount;
		
		while (actionCount--) {
			promisify(getAction(actionCount), getInput(actionCount), actionCount).then((output: any) => {
				setOutput(actionCount, output);
				--resolveCount || resolve(getOutput());
			});
		};
	});
};

const promisify: Promisify = async (action, input, actionIndex) => action(input, actionIndex);


export default performActions;