import "../styles/main.css";
import { configValue } from "./REPL";

interface REPLHistoryProps {
  history: { command: string; result: string }[];
  configs: Map<string, configValue>;
}
export function REPLHistory(props: REPLHistoryProps) {
  return (
    <div className="repl-history">
      {props.history.map((elem, idx) => {
        let displayText;
        if (props.configs.get("outputMode") === "verbose") {
          displayText = `Command: ${elem.command} \n Output: ${elem.result}`;
        } else {
          displayText = elem.result;
        }
        return <p key={idx}>{displayText}</p>;
      })}
    </div>
  );
}
