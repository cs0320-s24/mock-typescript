import "../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "./ControlledInput";

interface REPLInputProps {
  
  history: string[];
  setHistory: React.Dispatch<React.SetStateAction<string[]>>;
  
}


export function REPLInput(props: REPLInputProps) {
  
  const [commandString, setCommandString] = useState<string>("");
  const [count, setCount] = useState<number>(0);

  const handleSubmit = () => {
    setCount(count + 1);
    props.setHistory([...props.history, commandString]);
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
