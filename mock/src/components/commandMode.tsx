import { REPLFunction, commandHub, registerCommand } from "./CommandHub"; // Adjust import path as needed

// Use let to allow this to be changed as state updates
//export let outputMode = "brief";

// Core mode command function!
const modeCommand: REPLFunction = (
  args: Array<string>,
  configs: Map<string, any>,
  updateConfigs: (key: string, val: any) => void
): String => {
  // We are ignoring all args after the first
  // For now, no error if someone enters may args. Just look at first one.
  const newMode = args[0];
  if (newMode === "brief" || newMode === "verbose") {
    updateConfigs("outputMode", newMode);

    //outputMode = newMode;

    console.log("mode in configs is: ", configs.get("outputMode"));
    return `Switched to ${newMode} mode.`;
  }
  return "Invalid mode. You need to use 'brief' or 'verbose' only";
};

registerCommand("mode", modeCommand);
