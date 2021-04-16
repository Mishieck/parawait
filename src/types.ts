type IOType = "none" | "single" | "multiple";

type Input = {
  input?: any;
  inputs?: Array<any>;
  filterOutput?: boolean;
};

type Action = (input: any, actionCount: number) => Promise<any>;

type SAInput = Input & {
  action: Action;
  actionCount: number;
};

type MAInput = Input & {
  actions: Array<Function>;
};

type ActionPerformerInput = Input & {
  getAction(actionCount: number): Function;
  actionCount: number;
};

type SA = (options: SAInput) => Promise<any>;
type MA = (options: MAInput) => Promise<any>;

type Actions = {
  sa: SA;
  ma: MA;
};


export { IOType, Input, SAInput, MAInput, ActionPerformerInput, Action, Actions };