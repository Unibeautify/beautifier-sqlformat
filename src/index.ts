import {
  Beautifier,
  Language,
  BeautifierBeautifyData,
  DependencyType,
  ExecutableDependency,
} from "unibeautify";
import * as readPkgUp from "read-pkg-up";
import * as tmp from "tmp";
import * as fs from "fs";
import * as path from "path";
import * as os from "os";
import options from "./options";

const { pkg } = readPkgUp.sync({ cwd: __dirname });
export const beautifier: Beautifier = {
  name: "sqlformat",
  package: pkg,
  dependencies: [
    {
      type: DependencyType.Executable,
      name: "sqlformat",
      program: "sqlformat",
      parseVersion: [/(\d+\.\d+\.\d+)/],
      homepageUrl: "https://github.com/andialbrecht/sqlparse",
      installationUrl: "https://github.com/andialbrecht/sqlparse",
      bugsUrl: "https://github.com/andialbrecht/sqlparse/issues",
      badges: [],
    },
  ],
  options: {
    SQL: options,
  },
  beautify({
    text,
    options,
    filePath,
    projectPath,
    dependencies,
    beautifierConfig,
  }: BeautifierBeautifyData) {
    const sqlformat = dependencies.get<ExecutableDependency>("sqlformat");
    const basePath: string = os.tmpdir();
    const transformedOptions = transformOptionsToCli(options);
    transformedOptions.push("--reindent");
    return tmpFile({ postfix: ".sql" }).then(filePath =>
      writeFile(filePath, text).then(() =>
        sqlformat
          .run({
            args: transformedOptions.concat(
              relativizePaths(["-o", filePath, filePath], basePath)
            ),
            options: {
              cwd: basePath,
            },
          })
          .then(({ exitCode, stderr }) => {
            if (exitCode) {
              return Promise.reject(stderr);
            }
            return readFile(filePath);
          })
      )
    );
  },
};

function transformOptionsToCli(options: Option) {
  return Object.keys(options).map(key => {
    const value = options[key];
    switch (typeof value) {
      case "boolean":
        return `--${key}`;
      default:
        return `--${key}=${value}`;
    }
  });
}

function tmpFile(options: tmp.Options): Promise<string> {
  return new Promise<string>((resolve, reject) =>
    tmp.file(
      {
        prefix: "unibeautify-",
        ...options,
      },
      (err, path, fd) => {
        if (err) {
          return reject(err);
        }
        return resolve(path);
      }
    )
  );
}

function writeFile(filePath: string, contents: string): Promise<void> {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, contents, error => {
      if (error) {
        return reject(error);
      }
      return resolve();
    });
  });
}

function readFile(filePath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (error, data) => {
      if (error) {
        return reject(error);
      }
      return resolve(data.toString());
    });
  });
}

function relativizePaths(args: string[], basePath: string): string[] {
  return args.map(arg => {
    const isTmpFile =
      typeof arg === "string" &&
      !arg.includes(":") &&
      path.isAbsolute(arg) &&
      path.dirname(arg).startsWith(basePath);
    if (isTmpFile) {
      return path.relative(basePath, arg);
    }
    return arg;
  });
}

export default beautifier;

interface Option {
  [outOptionName: string]: any;
}
