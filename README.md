# 📖 Project Details 📖

Project Name: Mock Sprint

This is the frontend for a website for a real estate appraiser. It has functionality to work with CSV files, via mocked data.


Team Members:

Cecily Chung, cchung46, cecily_chung@brown.edu

Jay Gopal, jgopal, Jay_Gopal@brown.edu


Estimated Time Spent: 15


# 🔎 Design Choices 🔎

Our main design choice for this sprint was the design of our `commandHub` and use of the `REPLFunction` interface. Our `commandHub` class stores a `commandMap` which maps command names (such as `mock`, `load`, anbd more) to their functions, allowing them to be called upon accessing from the `commandMap`. Our `handleSubmit()` function calls the `REPLFunction`’s function by searching in the map given the keyword granted by the user and executes that function, storing its output in a results variable which gets sent to `REPLHistory` to display. This interface allows a developer to implement their own functions easily by importing the file, registering it with our commandHub, and importing into `REPLInput`. They can easily adjust the return values of the `REPLFunction` interface if needed as well.

Because we have `commandHub`, we didn’t feel the need to abstract functions further between real and mocked implementations. We instead implemented mocked versions with their real names (i.e. the mocked load command is registered under `load`). When we eventually integrate our back-end, it will be easy to sub in a real command: upload the new file and take out the old – the two files can exist in the same directory too if the developers comment out the register line at the end of the mock file.

The last design feature of our code that wasn’t specified by the write-up was our use of the configs map – this serves as a place to store any variables that need to be shared between commands, for example csv data loaded by load should be accessible by search and view. We used a map from string to describe the entry (ex: `outputMode` or `csvData`) to a `String` or `String[][]`. These two data types fit our needs, but a developer implementing a function that needs to store something in the configs map that isn’t of these types can easily add their necessary type by adjusting our `configValue` variable in `REPL`. By storing this in a type variable, it allows for easy extensibility across the entire code. All `REPLFunctions` are passed the configs map and an `updateConfigs` function, allowing the commands to access and update the map inside their functions if needed. The `updateConfigs` uses React’s `useState setConfigs` function to trigger re-renderings of the map whenever updates are made, ensuring the map is synced across all functions.


# 🐛 Errors/Bugs 🐛

No known bugs.

Future implementations should think about how to work with headers that have spaces in them.


# ✅ Tests ✅ 

These are all end-to-end tests (`tests/e2e`).

## `App.spec.ts`
All tests copied from gear-up. We removed the counter on the submit button since it didn't align with the user stories here, and we removed the test for that.


## `Load.spec.ts`

1. tests for no parameters
2. tests for loading a file in brief mode
3. tests for loading a file in verbose mode
4. tests for calling a malformed file
5. tests for switching csvs


## `Mode.spec.ts`

1. tests for default brief mode
2. tests switch to verbose mode
3. tests nonsense input


## `View.spec.ts`

1. tests for viewing without a loaded file
2. tests for viewing a file with headers
3. tests for viewing a file without headers
4. tests for switching csvs


## `Search.spec.ts`

1. Search requires login
2. Search requires loading the CSV
3. Several mocked tests get the correct content (pre-defined for now)
4. Search is invariant to capitalization, assuming the backend does a “fuzzy search” implementation
5. Search can handle empty responses (no rows found)
6. Sequential searches, one after the other, can be done.
7. It’s possible to do view, then search. It’s also possible to do search without view.
8. Column identifier can be an index or name
9. Search works in multiple files, including one without a header
10. After logging in once and loading in a csv, signing out clears the csv from memory, meaning we cannot search it without loading it in again
11. We can search through data of different forms, such as single-column data


# ⭐ How to ⭐

Start the server: run `npm start` in the terminal and command-click the link to get to the website. Click "Login" to begin!

Change output view: `mode <brief/verbose>`

This allows the output mode to change from brief, which just displaying the results of your functions, or verbose which includes the command that produced the result.


## Load a file: 

`load_file <filepath>`

For the purposes of this sprint, choose from:

`load_file census/dol_ri_earnings_disparity.csv`

`load_file census/dol_ri_earnings_disparity_no_header.csv`

`load_file single_column.csv`

`load_file empty.csv`

`load_file malformed.csv`


This will load a file to the database on which the user can operate. Please note that `malformed.csv` will return an error response.


## Search a file

Search `<column identifier> <value>`

For the purposes of this sprint, choose from:

`search 1 american`

`search 1 American`

`search DataType American`

`search EmployedPercent 75`

`search -1 75`

`search NumberofWorkers 75`


If you load in the single-column data, try these:

`search 0 RI`

`search 0 MA`


`<column identifier>` will be the column in which you want to search, given by either a name or an index, and `<value>` is the value for which you want to search.

The search command will display a table of all rows from the loaded csv file that match the value given in the given column. A match is defined as matching any substring of the csv data in the given column and is case-insensitive.


## View a file

`view`

Please ensure you load a file first (use the `load_file` command). This will allow the user to see the loaded file in its entirety.


## Run tests

Run `npm run test` in the terminal to run all tests for this sprint.


## Implement new functions as a developer

Upload your own .tsx file into the src directory. Ensure you utilize the REPLFunction interface and call `registerCommand("command name", commandFunction)` at the end of the file. If your function updates the configs map with a data type not previously specified, add this type to the type variable configValue in `REPL.tsx`. Finally, in `REPLInput.tsx`, import your command file at the top of the page, and you are good to go!


# Collaboration

None outside of class materials (livecode + gearup).

Splitting a string by commas: https://stackoverflow.com/questions/10346722/how-to-split-a-string-by-white-space-or-comma

Used this to help to make the enter key work: https://stackoverflow.com/questions/73056217/how-to-listen-for-an-enter-keypress-from-typescript



