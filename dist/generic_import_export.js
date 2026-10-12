class DataStorage {
    constructor() {
        this.items = [];
    }
    addItem(item) {
        this.items.push(item);
    }
    getItems() {
        return this.items;
    }
}
class store extends DataStorage {
}
let obj = new store();
obj.getItems();
let obj2 = new store();
obj2.getItems();
;
function echo1(value) {
    return value.length;
}
function echo2(value) {
    return value.length;
}
function echo3(value) {
    return value.length;
}
// *************************************************************
// K extends keyof T >>>> as   K extends  "id" | "email" | "name" | "age"
function getProperty(obj, key) {
    return obj[key];
}
let person = {
    name: "asmaa",
    age: 21
};
getProperty(person, "name"); // Valid
getProperty(person, "age"); // Valid
// getProperty(person, "email"); // Error
//! ------------------------------------------------------------------------------
//!                               import & export
//! ------------------------------------------------------------------------------
/*
  The idea of export & import

  - JS was originally a scripting language, built to run in the browser.
    Today, it is a full programming language that can also run
    outside the browser using environments like Node.js.

  - Before modules, we could load multiple JS files using <script src="..."></script>.
    These files shared the same global scope when loaded as classic scripts.

    - Top-level `var` and `function` declarations can become
      properties of `window` in classic browser scripts.
    - Two files could accidentally use the same name and cause
      conflicts by overwriting or accessing shared variables.

  - The solution: ES Modules.
    Each module has its own scope, so its variables and functions
    are not automatically added to `window`.

    Example:
       file1.js
            const message = "Hello";

       file2.js
            const message = "Welcome";

    These declarations can exist in separate modules without
    causing a naming conflict.

  * To share code between files:

  *  export => makes a variable, function, class, or other
              supported declaration available to other modules.

  * import => allows another module to use the exported value.

    Example:
       math.js
            export const add = (a, b) => a + b;

       main.js
            import { add } from "./math.js";
            console.log(add(2, 3)); // 5


  * In the browser, we must use type="module" to load a JavaScript file as an ES Module:
      <script type="module" src="main.js"></script>

  * The project should be served over HTTP or HTTPS
    (e.g., using Live Server), instead of opening the HTML
    file directly through file://.

    Browsers commonly block module imports from file:// URLs
    because of security restrictions, which can cause loading
    or CORS-related errors.

  - Node.js is not a server by itself; it is a JavaScript runtime
    that can execute JavaScript outside the browser.

    Node.js supports import/export too.
    To use ES Modules, you can:
      - Set "type": "module" in package.json.
      - Use the .mjs extension.
*/
/*
  Ways to use ES Modules in TypeScript with Node.js

  - Node.js supports ES Modules using import and export.
    In TypeScript, we can write import and export in .ts files,
    then compile the TypeScript code into JavaScript.

  1. Using the .mts extension:
     - The .mts extension identifies a TypeScript file as an ES Module.
     - TypeScript compiles .mts files into .mjs files.
     - Node.js treats .mjs files as ES Modules by default.
     - This method does not require "type": "module"
       in tsconfig.json to identify these files as ES Modules.

     Example:
       math.mts
            export const add = (a: number, b: number): number => a + b;

       main.mts
            import { add } from "./math.mjs";
            console.log(add(2, 3)); // 5

  2. Using .ts with "type": "module" in tsconfig.json:
     - Add "type": "module" to tsconfig.json.
     - TypeScript files use the .ts extension.
     - Node.js treats the corresponding compiled .js files as ES Modules.
     - TypeScript compiles .ts files into .js files.
     - In NodeNext mode, relative imports in TypeScript
       commonly use the .js extension, even when the source
       file is actually named .ts.

     Example:
       package.json
            {
                "type": "module"
            }

       math.ts
            export const add = (a: number, b: number): number => a + b;

       main.ts
            import { add } from "./math.js";
            console.log(add(2, 3)); // 5

  - Both methods allow us to use import and export in
    TypeScript and run the compiled JavaScript using Node.js.

  - Important differences:
     .ts  => TypeScript source file.
     .mts => TypeScript source file explicitly identified
             as an ES Module.
     .js  => JavaScript file; its module type depends on
             tsconfig.json and Node.js module rules.
     .mjs => JavaScript file explicitly identified
             as an ES Module.

  - Note:
    The .mjs and .mts extensions are not interchangeable.
    TypeScript source files must be compiled before Node.js
    can execute them directly as ordinary JavaScript output.

    The exact setup depends on tsconfig.json, tsconfig.json,
    and the Node.js module system being used.
*/
//! ---------------------------------
//! ---------------------------------
// import { add } from "./math";
// console.log(add(10, 30));
//! ---------------------------------
//! Rename using as:
// - The as keyword allows us to use a different name when importing
//   a named export.
// import { add as sum } from "./math";
// console.log(sum(1, 3));
//! ---------------------------------
// import { add, subtract  } from "./math";
// console.log(add(1, 3));
// console.log(subtract(5, 3));
//! ---------------------------------
//! Default Export:
// - A module can have only one default export.
// - The default export can be a value, function, class, or expression.
// - Import the default export without curly braces { }.
// - We can choose any local name when importing a default export.
// import PI from "./math";
// console.log(PI);
//! ---------------------------------
//! Combining Default and Named Imports:
// - We can import the default export and named exports in one statement.
// - The default import comes first, followed by named imports in {}.
import PI, { add, subtract } from "./math";
console.log(add(1, 3));
console.log(subtract(5, 3));
console.log(PI);
//# sourceMappingURL=generic_import_export.js.map