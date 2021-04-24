import { SAMAOutput } from "./types.js";


type Input = {
  getAction: Function;
  actionCount: number;
  getInput: Function;
  setOutput: Function;
  getOutput: Function;
};


const performActions = ({ getAction, actionCount, getInput, setOutput, getOutput }: Input): SAMAOutput => {
	return new Promise((resolve: Function, reject: Function) => {
		let resolveCount: number = actionCount;
		
		while (actionCount--) {
			getAction(actionCount)(getInput(actionCount), actionCount).then((output: any) => {
				setOutput(actionCount, output);
				--resolveCount || resolve(getOutput());
			});
		};
	});
};


export default performActions;