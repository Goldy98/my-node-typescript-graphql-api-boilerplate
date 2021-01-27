import { sayHello } from "./queries";

export const Query = {
  helloWorld: (_: any) => sayHello()
};

export const Mutation = {
  onePlusOne: (_: any) => 1 + 1
};
