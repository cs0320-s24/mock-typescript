
const mockedSearchFunction = (columnIdentifier: string, searchTerm: string): any => {
  if (columnIdentifier === "1" && searchTerm === "American") {
    return {
      "response_type": "success",
      "responseMap": {
        "results": [
          [
            "RI",
            "Native American/American Indian",
            " $471.07 ",
            "2315.505646",
            " $0.45 ",
            "0%"
          ]
        ]
      }
    };
  }

  if (columnIdentifier === "1" && searchTerm === "american") {
    return {
      "response_type": "success",
      "responseMap": {
        "results": [
          [
            "RI",
            "Native American/American Indian",
            " $471.07 ",
            "2315.505646",
            " $0.45 ",
            "0%"
          ]
        ]
      }
    };
  }

  if (columnIdentifier === "DataType" && searchTerm === "American") {
    return {
      "response_type": "success",
      "responseMap": {
        "results": [
          [
            "RI",
            "Native American/American Indian",
            " $471.07 ",
            "2315.505646",
            " $0.45 ",
            "0%"
          ]
        ]
      }
    };
  }

  if (columnIdentifier === "EmployedPercent" && searchTerm === "75") {
    return {
      "response_type": "success",
      "responseMap": {
        "results": [
          [
            "RI", 
            "White", 
            '" $1,058.47 "', 
            "395773.6521", 
            " $1.00 ", 
            "75%"
          ]
        ]
      }
    };
  }

  if (columnIdentifier === "-1" && searchTerm === "75") {
    return {
      "response_type": "Invalid configuration parameters: [ERROR] Column index cannot be negative!",
      "responseMap": {
        "results": [
        ]
      }
    };
  }

  if (columnIdentifier === "NumberofWorkers" && searchTerm === "75") {
    return {
      "response_type": "success",
      "responseMap": {
        "results": []
      }
    };
  }

  return {
    "response_type": "success",
    "responseMap": {
      "results": []
    }
  };
};

export { mockedSearchFunction };
