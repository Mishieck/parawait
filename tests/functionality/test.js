const test = async (action, input) => {
  let start = performance.now();
  const output = await action(input);
  const time = performance.now() - start;
  start = performance.now();
  console.log({ output, time });
};

export default test;
