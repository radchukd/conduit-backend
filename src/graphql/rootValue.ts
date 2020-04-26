const rootValue = {
  hello: (args: Record<string, string>, context: Record<string, string>) => {
    console.log(args);
    console.log(context);
    return `Hello ${args.name}`;
  },
};

export default rootValue;
