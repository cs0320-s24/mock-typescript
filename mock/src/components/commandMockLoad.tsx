import { REPLFunction, commandHub, registerCommand } from "./CommandHub"; // Adjust import path as needed
import { dataMap } from "../../mockedJson"; // import a filepath-mockeddata map

// mock load function that gets static data from a map,
// sets that as the current csv then returns the filepath
const mockLoadCommand: REPLFunction = (
  args: Array<string>,
  setCSV: React.Dispatch<React.SetStateAction<string[][]>>
): String => {
  // gets the 2D mocked data from the dataMap in mockedJson
  const filepath = args[0];
  const csv = dataMap[filepath];

  // sets the csv variable in REPLInput
  setCSV(csv);

  return filepath;
};

registerCommand("load", mockLoadCommand);
