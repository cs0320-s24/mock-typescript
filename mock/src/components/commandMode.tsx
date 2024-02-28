import { REPLFunction, commandHub, registerCommand } from "./CommandHub"; // Adjust import path as needed

// Use let to allow this to be changed as state updates
export let outputMode = "brief";

// Core mode command function!
const modeCommand: REPLFunction = (
  args: Array<string>,
  setCSV: React.Dispatch<React.SetStateAction<string[][]>>
): String => {
  // We are ignoring all args after the first
  // For now, no error if someone enters may args. Just look at first one.
  const newMode = args[0];
  if (newMode === "brief" || newMode === "verbose") {
    outputMode = newMode;
    return `Switched to ${newMode} mode.`;
  }
  return "Invalid mode. You need to use 'brief' or 'verbose' only";
};

registerCommand("mode", modeCommand);
