class DataStorage<T> {
    private items: T[] = [];

    public addItem(item: T) {
        this.items.push(item);
    }

    public getItems(): T[] {
        return this.items;
    }
}

class store<U = string> extends DataStorage<U> {

}

let obj: store = new store();
obj.getItems();
let obj2: store<number> = new store<number>();
obj2.getItems();


/*

! Generic Default Type
* A generic type parameter can have a default type using `=`.
* The default type is used when no type is specified explicitly.
* If a type is specified, it replaces the default type.
* Generic parameters with default types must come after required parameters.

 */


//! -------------------------------------------------

/*

 ! Generic Constraints (extends)

 * Problem: By default, a generic type parameter can represent any type,
            so we cannot guarantee that it has the properties or methods we need.

 * Solution: Use `extends` to restrict the generic type to types that
            satisfy specific requirements, allowing us to safely use their
            required properties and methods.
*/

//!  Using type
type lengthWise1 = {
    length: number;
};


type lengthWise2 = string | [];


//!  Using interface
interface lengthWise3 {
    length: number;
};




function echo1<T extends lengthWise1>(value: T): number {
    return value.length;
}

function echo2<T extends lengthWise2>(value: T): number {
    return value.length;
}

function echo3<T extends lengthWise3>(value: T): number {
    return value.length;
}


/*

 ? Generic Constraints with `extends`
 * `extends` in generics can use a `type` or an `interface` as a constraint.
 * It doesn't mean class inheritance here; it restricts T to types that
 * satisfy the specified requirements.
 
 */

/*

* T must satisfy the `lengthWise` interface, meaning it must have a
* `length` property of type `number`.
* T can be any type that meets this requirement

  */


//! -------------------------------------------------

/*

 ? Property Separators in Object Types and Interfaces
 * Properties can be separated using commas (,) or semicolons (;), or written on separate lines without separators.
 * Both `type` and `interface` support these options.
 * Using semicolons consistently is a common coding style.
 
 In a regular JavaScript object, properties must be separated by commas.
 Semicolons cannot be used instead of commas between object properties.
 
*/


interface person {
    name: string;
    age: number,
    address: string;
}

type person1 = {
    name: string;
    age: number,
    address: string;
};


//! --------------------- keyof ----------------------------

/*

 ? keyof Operator

 * `keyof` is used to get the names of all properties in a type.
 * It returns a union type containing the property keys themselves, not the types of their values.
 * TypeScript gets these keys from the properties defined in the type.

 * When used with `extends`, `keyof` can restrict a generic type parameter to only the keys that actually exist in another type.
 * This helps prevent using invalid property names and keeps type safety.

 * To get the types of the property values instead of their keys,
 * we can use indexed access types: `T[keyof T]`.
  
 */


//!  Using type
type Person = {
    name: string;
    age: number;
};

type PersonKeys = keyof Person; // "name" | "age"


//!  Using interface
interface User {
    id: number;
    email: string;
}

type UserKeys = keyof User;  // "id" | "email"

// *************************************************************

// K extends keyof T >>>> as   K extends  "id" | "email" | "name" | "age"

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

let person: Person = {
    name: "asmaa",
    age: 21
};

getProperty(person, "name");  // Valid
getProperty(person, "age");   // Valid
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


