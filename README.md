# Project Details

Project Name: Mock Sprint

Cecily Chung, cchung46, cecily_chung@brown.edu
Jay Gopal, jgopal, Jay_Gopal@brown.edu

est. hours: 15

# Design Choices

Our main design choice for this sprint was the design of our commandHub and use of the REPLFunction interface. Our commandHub class stores a commandMap which maps command names (such as “mock”, “load”, etc.) to their functions, allowing them to be called upon accessing from the commandMap. Our handleSubmit() function calls the REPLFunction’s function by searching in the map given the keyword granted by the user and executes that function, storing its output in a results variable which gets sent to REPLHistory to display. This interface allows a developer to implement their own functions easily by importing the file, registering it with our commandHub, and importing into REPLInput. They can easily adjust the return values of the REPLFunction interface if needed as well.

Because we have commandHub, we didn’t feel the need to abstract functions further between real and mocked implementations. We instead implemented mocked versions with their real names (i.e. the mocked load command is registered under “load”). When we eventually integrate our back-end, it will be easy to sub in a real command: upload the new file and take out the old – the two files can exist in the same directory too if the developers comment out the register line at the end of the mock file.

The last design feature of our code that wasn’t specified by the write-up was our use of the configs map – this serves as a place to store any variables that need to be shared between commands, for example csv data loaded by load should be accessible by search and view. We used a map from string to describe the entry (ex: “outputMode” or “csvData”) to a string or string[][]. These two data types fit our needs, but a developer implementing a function that needs to store something in the configs map that isn’t of these types can easily add their necessary type by adjusting our “configValue” variable in REPL. By storing this in a type variable, it allows for easy extensibility across the entire code. All REPLFunctions are passed the configs map and an updateConfigs function, allowing the commands to access and update the map inside their functions if needed. The updateConfigs uses React’s useState setConfigs function to trigger re-renderings of the map whenever updates are made, ensuring the map is synced across all functions.

# Errors/Bugs

No known bugs.

# Tests

END-TO-END:
App.spec.ts: all tests copied from gear-up, no app-wide functionality added.
Load.spec.ts:

1. tests for no parameters
2. tests for loading a file in brief mode
3. tests for loading a file in verbose mode
4. tests for calling a malformed file
   Mode.spec.ts:
5. tests for default brief mode
6. tests switch to verbose mode
7. tests nonsense input

# How to

Start the server: run “npm start” in the terminal and command-click the link to get to the website. Click Login to begin!

Change output view: mode <brief/verbose>.
This allows the output mode to change from brief, which just displaying the results of your functions, or verbose which includes the command that produced the result.

Load a file: load_file <filepath>
For the purposes of this sprint, choose from:
load_file census/dol_ri_earnings_disparity.csv
load_file census/dol_ri_earnings_disparity_no_header.csv
load_file empty.csv
load_file malformed.csv

This will load a file to the database on which the user can operate. Please note that malformed.csv will return an error response.

Search a file: search <column identifier> <value>
For the purposes of this sprint, choose from:
search 1 american
search 1 American
search Data Type American
search Employed Percent 75
search -1 75
search Number of Workers 75

Please ensure you load a file first. <column identifier> will be the column in which you want to search, given by either a name or an index, and <value> is the value for which you want to search.
This will display a table of all rows from the loaded csv file that match the value given in the given column. A match is defined as matching any substring of the csv data in the given column and is case-insensitive.

View a file: view

Please ensure you load a file first. This will allow the user to see the loaded file in its entirety.

Run tests: Run “npm run test” in the terminal to run all tests for this sprint.

Implement new functions as a developer: Upload your own .tsx file into the src directory. Ensure you utilize the REPLFunction interface and call registerCommand("command name", commandFunction) at the end of the file. If your function updates the configs map with a data type not previously specified, add this type to the type variable configValue in REPL.tsx. Finally, in REPLInput.tsx, import your command file at the top of the page, and you are good to go!

# Collaboration

None outside of class materials (livecode + gearup).
