import { Action } from "../../src/types.js";

let input,
  inputs,
  action,
  actions;

const generateInputs = () => {
  let inputs = [];
  for (let i = 0; i < 10; i++) inputs.push(i % 2 ? true : false);
  return inputs;
};

const generateAction = (numberOfLoops) => {
	const output = numberOfLoops % 2000 ? true : undefined;
	
	return async (input)=> {
		while (numberOfLoops--) continue;
		return output;
	};
};

input = true;
inputs = generateInputs();
action = generateAction(5000);
actions = [];

for (let i = 1; 1 <= 10; i++) actions.push(generateAction(i * 1000));


export { input, inputs, action, actions };