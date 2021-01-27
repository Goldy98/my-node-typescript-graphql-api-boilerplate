import { appLog } from "../helpers/helper";

export function sayHello() {
  appLog("info", "Said Hello to World");
  return { message: "Hello World" };
}
