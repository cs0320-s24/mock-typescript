import { REPLFunction, registerCommand } from "./CommandHub";
import { configValue } from "./REPL";
import { mockedSearchFunction } from "../../searchMockedJson";

// mock search command that returns static search responses
const searchCommand: REPLFunction = (
  args: Array<string>,
  configs: Map<string, configValue>,
  updateConfigs: (key: string, val: configValue) => void
): String | String[][] => {
  // parameter handling for bad user input
  if (args.length < 2) {
    return "Please input a column to search in and a value to search for.";
  } else if (args.length > 2) {
    return "Please do not give extra parameters.";
  }

  const csvData = configs.get("csv");

  // if the csv entry doesn't exist in the map, no csv is loaded
  if (!csvData) {
    return "No CSV file is loaded. Please load a file using the load command to search!";
  }

  const columnIdentifier = args[0];
  const searchTerm = args[1];

  // Call our mocked search function
  const searchResults = mockedSearchFunction(columnIdentifier, searchTerm);

  // Format search results for display
  if (searchResults.response_type === "success") {
    if (searchResults.responseMap.results.length > 0) {
      return searchResults.responseMap.results;
    } else {
      // If the results array is empty, return a descriptive message
      return "No results found for the given column specification and search term!";
    }
  } else {
    // If the searchResults object includes an error message, return that message
    return searchResults.response_type;
  }
};

registerCommand("search", searchCommand);
