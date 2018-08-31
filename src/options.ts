import { BeautifierLanguageOptions } from "unibeautify";

const options: BeautifierLanguageOptions = {
  // indent_tabs: [
  //   ["indent_style"],
  //   (options): boolean => {
  //     if (options.indent_style === "tab") {
  //       return true;
  //     }
  //     return false;
  //   },
  // ],
  identifiers: [
    ["identifier_case"],
    (options): string | undefined => {
      switch (options.identifier_case) {
        case "uppercase":
          return "upper";
        case "lowercase":
          return "lower";
        case "capitalize":
          return "capitalize";
      }
    },
  ],
  indent_width: [
    ["indent_size"],
    (options): number => {
      if (options.indent_size) {
        return options.indent_size;
      }
      return 2;
    },
  ],
  keywords: [
    ["keyword_case"],
    (options): string | undefined => {
      switch (options.keyword_case) {
        case "uppercase":
          return "upper";
        case "lowercase":
          return "lower";
        case "capitalize":
          return "capitalize";
      }
    },
  ],
};

export default options;
