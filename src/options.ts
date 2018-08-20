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
  indent_width: [
    ["indent_size"],
    (options): number => {
      if (options.indent_size) {
        return options.indent_size;
      }
      return 2;
    }
  ]
};

export default options;
