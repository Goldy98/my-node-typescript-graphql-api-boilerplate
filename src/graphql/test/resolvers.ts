import { sayHello } from "./queries";

export const Query = {
  helloWorld: _ => sayHello()
};

export const Mutation = {
  onePlusOne: _ => 1 + 1
};
