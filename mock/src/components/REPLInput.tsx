import "../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "./ControlledInput";
import { commandHub, getCommand } from "./CommandHub";
import { outputMode } from "./commandMode";

interface REPLInputProps {
  
  history: { command: string; result: string }[];
  setHistory: React.Dispatch<React.SetStateAction<{ command: string; result: string }[]>>;

}


export function REPLInput(props: REPLInputProps) {
  
  const [commandString, setCommandString] = useState<string>("");
  const [count, setCount] = useState<number>(0);


  const handleSubmit = () => {
    // Source: https://stackoverflow.com/questions/10346722/how-to-split-a-string-by-white-space-or-comma
    const [coreCommand, ...args] = commandString.split(/\s+/);

    const commandFunction = getCommand(coreCommand);

    let result = '';
    if (commandFunction) {
      result = commandFunction(args);
    } else {
      result = `Command not found: ${coreCommand}`;
    }

    props.setHistory([...props.history, { command: commandString, result: result }]);
    
    setCount(count + 1);
    setCommandString("");
  };

  
  return (
    <div className="repl-input">
      
      <fieldset>
        <legend>Enter a command:</legend>
        <ControlledInput
          value={commandString}
          setValue={setCommandString}
          ariaLabel={"Command input"}
        />
      </fieldset>
      <button aria-label={"Submit button"} onClick={handleSubmit}>
        Count is {count}.
      </button>
    </div>
  );
}
