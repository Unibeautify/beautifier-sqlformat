import * as fs from "fs";
import * as path from "path";

import { newUnibeautify, Beautifier } from "unibeautify";
import beautifier from "../../src";
import { raw } from "../utils";

// tslint:disable:mocha-no-side-effect-code
test(`should uppercase SQL keywords`, () => {
  const text: string = fs
    .readFileSync(path.resolve(__dirname, `../fixtures/test2.sql`))
    .toString();
  const unibeautify = newUnibeautify();
  unibeautify.loadBeautifier(beautifier);
  return unibeautify
    .beautify({
      languageName: "SQL",
      options: {
        SQL: {
          keyword_case: "uppercase",
        },
      },
      text,
    })
    .then(results => {
      expect(raw(results)).toMatchSnapshot();
    });
});
test(`should capitalize SQL keywords`, () => {
  const text: string = fs
    .readFileSync(path.resolve(__dirname, `../fixtures/test2.sql`))
    .toString();
  const unibeautify = newUnibeautify();
  unibeautify.loadBeautifier(beautifier);
  return unibeautify
    .beautify({
      languageName: "SQL",
      options: {
        SQL: {
          keyword_case: "capitalize",
        },
      },
      text,
    })
    .then(results => {
      expect(raw(results)).toMatchSnapshot();
    });
});
test(`should lowercase SQL keywords`, () => {
  const text: string = fs
    .readFileSync(path.resolve(__dirname, `../fixtures/test2.sql`))
    .toString();
  const unibeautify = newUnibeautify();
  unibeautify.loadBeautifier(beautifier);
  return unibeautify
    .beautify({
      languageName: "SQL",
      options: {
        SQL: {
          keyword_case: "lowercase",
        },
      },
      text,
    })
    .then(results => {
      expect(raw(results)).toMatchSnapshot();
    });
});
