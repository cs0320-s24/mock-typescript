import { REPLFunction, commandHub, registerCommand } from "./CommandHub"; // Adjust import path as needed
import { dataMap } from "../../mockedJson";

console.log("hello world");

const mockLoadCommand: REPLFunction = (
  args: Array<string>,
  setCSV: React.Dispatch<React.SetStateAction<string[][]>>
): String => {
  const filepath = args[0];
  const csv = dataMap[filepath];

  setCSV(csv);

  return filepath;
};

registerCommand("load", mockLoadCommand);
