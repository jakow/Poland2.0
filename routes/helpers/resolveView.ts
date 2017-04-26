import {viewsDir, viewEngine, rootDir} from '../../config';
import {statSync, readdirSync} from 'fs';
import {join, basename, extname, relative, resolve} from 'path';
console.info('resolveView dirname: ');
class RouteNotFoundError extends Error {
  constructor(routeName: string) {
    super(`Route ${routeName} was not found`);
  }
}

const memo = new Map<string, string>();

function splitExtension(path: string): string {
  return path.slice(0, -extname(path).length);
}

/**
 * List views recursively in the config.viewsDir directory and map them to their names.
 * @param directory the directory to search in
 * @param filter the predicate that the file must meet to be listed.
 */
function traverseViewsDir(directory: string, filter: (fname: string) => boolean = () => true): void {
  const contents = readdirSync(directory);
  // full file names
  const files = contents
    .map((fname) => join(directory, fname)).filter((path) => statSync(path).isFile())
    // remove those that do not meet the `filter` predicate
    // the default predicate always returns true
    .filter(filter);
  // full directory paths
  const directories = contents
  .map((dname) => join(directory, dname)).filter((path) => statSync(path).isDirectory());

  for (const file of files) {
    const relativePath = relative(viewsDir, file);
    const name = splitExtension(basename(file));
    memo.set(name, relativePath);
  }
  for (const dir of directories) {
    traverseViewsDir(dir, filter);
  }
}

traverseViewsDir(viewsDir, (name) => extname(name) === `.${viewEngine}`);

export default function resolveView(name: string) {
  if (memo.has(name)) {
    return memo.get(name);
  } else {
    throw new RouteNotFoundError(name);
  }
}
