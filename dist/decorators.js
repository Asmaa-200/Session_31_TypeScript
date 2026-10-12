"use strict";
//! ------------------------------------------------------------------------------
//!                               Decorators
//! ------------------------------------------------------------------------------
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
//? ______________________ Class Constructor ______________________
// In JavaScript, a class is represented by a constructor function internally.
// The class name refers to the class constructor itself.
// Calling the class name gives us the class constructor:
class User {
    constructor(name) {
        this.name = name;
    }
}
// User       -> The class constructor itself.
// new User() -> Creates a new object using the class constructor.
//! The constructor method:
// - constructor() is a special method inside a class.
// - It runs automatically when we create an object using new.
// - It initializes the object's properties.
//! The default constructor:
// - If we do not write a constructor, JavaScript provides a default one.
// - For a base class, the default constructor does nothing.
// - For a derived class, the default constructor forwards arguments
//   to the parent constructor using super(...args).
//! Important:
// The class constructor and the constructor() method are not the same thing.
// - User refers to the class constructor function.
// - constructor() is the special method used to initialize new objects.
//? ______________________ Types of Decorators ______________________
//? A decorator is a special function used to customize
//? or modify the behavior of a class or its members.
//? Decorators in TypeScript can be used with different parts of a class,
//? depending on what we want to customize or add extra behavior to.
//! Types of Decorators:
// - Class Decorator: Applied to the entire class.
// - Method Decorator: Applied to a method inside a class.
// - Accessor Decorator: Applied to a getter or setter.
// - Property Decorator: Applied to a property inside a class.
// - Parameter Decorator: Applied to a parameter of a method or constructor.
//! Note:
// - The available decorators and how they work depend on the decorator
//   system used in TypeScript.
// - Parameter decorators are supported by legacy experimental decorators,
//   but not by the newer standard decorators.
//? Decorators in TypeScript:
// - A decorator is a special function used to modify or extend the behavior of a class or its members.
// - We write @decoratorName before the class or member we want to decorate.
// - We don't use parentheses when applying a decorator directly, because TypeScript calls it automatically.
// - TypeScript passes the decorated target as an argument to the decorator function.
// - The argument depends on the type of decorator and what it is applied to.
// - We write @test without parentheses when applying a decorator directly.
// - TypeScript calls the decorator automatically and passes the decorated target as an argument in first parameter in function decorator.
// - We write @test() when test is a decorator factory that returns a decorator.
// - In this case, test() is called first to get the decorator that TypeScript will apply.
//! ____________________________________________ 1. Class Decorator ____________________________________________
function test(constructor) {
    console.log(constructor, 'from decorator');
    constructor.prototype.age = 21;
}
//? - The @test decorator is called automatically as soon as the Auth class is defined,
//?   without waiting for creating an object from the class.
//? - It receives the class itself as its first argument.
//? - The class is represented by a constructor function, so we can receive it
//?   as a function parameter inside the decorator.
let Auth = class Auth {
    constructor() {
        this.name = 'aaa';
    }
    fun() {
        console.log(this.age);
        console.log(this.age);
    }
};
Auth = __decorate([
    test
], Auth);
let obj = new Auth();
obj.fun();
// console.log((<any>obj).age);
// console.log(Auth.prototype);
// class me extends Auth {
//     public fun2() {
//         console.log((<any>this).age);
//     }
// }
// let meObj: me = new me();
// console.log(meObj);
//? - Every object has an internal link (__proto__) that points to its prototype,
//?   which contains the methods and properties the object can inherit.
//? - To add a shared method to all instances, we can access the class's prototype:
//?   ClassName.prototype.myMethod = function () { ... };
// --------------------------------------------
//? - `as any  | <any>` tells TypeScript to allow accessing properties
//?   that are not defined in the class, such as `age`.
//? - It disables type checking for this expression only.
//? - It does not create the property; if it does not exist at runtime,
//?   its value will be `undefined`.
// --------------------------------------------
//? - The decorator adds a new property to the class's prototype at runtime.
//? - Objects created from the class can access this property through the prototype.
//? - TypeScript does not know about this property because it is not defined
//?   inside the class at compile time.
//? - So, accessing it directly using `this.age` causes a TypeScript error.
//? - Solution: Use `(this as any).age` to tell TypeScript to treat `this`
//?   as `any`, allowing access to the property without a type-checking error.
//? - Note: `as any` does not create the property.
//?   It only bypasses TypeScript's type checking.
//?   If the property does not exist at runtime, its value will be `undefined`.
// --------------------------------------------
//? - `as any` bypasses TypeScript's type checking for the object,
//?   allowing us to access members without checking if they are defined in the class.
//?   TS stops verifying its members, so it behaves like plain JavaScript:
//?   loosely typed, and I can access a member that doesn't exist on the class without a compile error.
//? - Note: This does not create the missing member; if it does not exist
//?   at runtime, its value will be `undefined`.
//! if i need passes arguments to decorator
//! Decorator Factory
//? - A decorator factory is a function that takes arguments and returns a decorator.
//? - The outer function receives the arguments we pass to the decorator.
//? - The inner function is the actual decorator that receives the class.
//? - The inner function can also access the outer function's arguments.
function test2(message) {
    // The inner function is the actual decorator.
    return function (constructor) {
        console.log(message);
        console.log(constructor);
        constructor.prototype.name = 'asmaa';
    };
}
let Auth2 = class Auth2 {
    fun2() {
        console.log(this.name, 'inner');
    }
};
Auth2 = __decorate([
    test2("Hello from decorator")
], Auth2);
let obj2 = new Auth2();
obj2.fun2();
console.log(obj2.name, 'outer');
//? - We can apply multiple decorators to the same class.
//? - Decorators are executed from bottom to top (in reverse order).
function first(construct) {
    console.log("First decorator");
}
function second(construct) {
    console.log("Second decorator");
}
let Auth3 = class Auth3 {
    constructor() {
        this.name = 'aaa';
    }
};
Auth3 = __decorate([
    second,
    first
], Auth3);
//! ____________________________________________ 2. Method Decorator ____________________________________________
//? - Applied to a method inside a class.
console.log('--------------  Method Decorator --------------');
//? - For an instance method, the target (classProperty) is the class's prototype.
//? - For a static method, the target (classProperty) is the class constructor itself (e.g., test3).
//? - The descriptor contains information about the method,
//?   including the function itself in the `value` property.
//? - It also contains `writable`, `enumerable`, and `configurable`
//?   properties that control how the method behaves.
function methodDecorator(classProperty, methodName, descriptor) {
    console.log(classProperty);
    console.log(methodName);
    console.log(descriptor);
    //* - `originalMethod` stores the original method before replacing it.
    //* - `descriptor.value` is assigned a new function that replaces the original method.
    //* - The new function prints a message, then calls the original method.
    let originalMethod = descriptor.value;
    //* - `descriptor.value` contains the method's original function.
    //* - By assigning a new function to `descriptor.value`,
    //*   we replace the original method with the new function.
    descriptor.value = function () {
        console.log('from decorator');
        return originalMethod();
    };
}
function classDecorator(constructor) {
    constructor.prototype.age = 21;
}
let test3 = class test3 {
    myMethod() {
        console.log('from object');
        return 10;
    }
};
__decorate([
    methodDecorator,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], test3.prototype, "myMethod", null);
test3 = __decorate([
    classDecorator
], test3);
// class test3 {
//     public name = 'asmaa';
//     @methodDecorator
//     public static myMethod() {
//     }
//     public fun() {
//     }
// }
let obj3 = new test3();
obj3.myMethod();
console.log(test3.prototype, 'prototype');
console.log(typeof test3.prototype);
// console.log(test3); // The class itself
// console.log(test3.myMethod); // The method
// --------------------------------------------
function methodDecorator2(classProperty, methodName, descriptor) {
    let originalMethod = descriptor.value;
    descriptor.value = function (num) {
        console.log('from decorator');
        // return originalMethod(num);
        //*  another way to execute originalMethod
        //* (this) here refer to originalMethod
        return originalMethod.call(this, num);
        //? - We pass the parameters received by the decorator's function to the original method.
        //? - This ensures that the original method receives the same arguments passed when it is called.
    };
}
class test4 {
    myMethod(x) {
        console.log('from object');
        return x;
    }
}
__decorate([
    methodDecorator2,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], test4.prototype, "myMethod", null);
let obj4 = new test4();
console.log(obj4.myMethod(30));
// --------------------------------------------
function methodDecorator3(classProperty, methodName, descriptor) {
    let originalMethod = descriptor.value;
    descriptor.value = function (...arg) {
        console.log('from decorator');
        // return originalMethod(...arg);
        return originalMethod.call(this, ...arg);
    };
}
class test5 {
    myMethod(x) {
        console.log('from object');
        return x;
    }
}
__decorate([
    methodDecorator3,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], test5.prototype, "myMethod", null);
let obj5 = new test5();
console.log(obj5.myMethod(30));
//! ____________________________________________ 3. Accessor Decorator ____________________________________________
//? - Applied to an accessor (`get` or `set`) in a class.
//? - Receives the class prototype (or the class constructor for static accessors),
//?   the accessor name, and the PropertyDescriptor.
//? - The PropertyDescriptor allows us to modify the accessor's behavior.
//? - `descriptor.get` refers to the original getter function, which is called when reading a property.
//? - `descriptor.set` refers to the original setter function, which is called when assigning a value to a property.
//? - We can modify `descriptor.get` or `descriptor.set` to change the accessor's behavior.
//? - A decorator can be applied to only one accessor (`get` or `set`) of the same name.
//? - Both accessors share the same property descriptor, so applying a decorator to both causes an error.
console.log('--------------  Accessor Decorator --------------');
function accessorDecorator(classPrototype, accessorName, descriptor) {
    console.log(classPrototype);
    console.log('Accessor Name:', accessorName);
    console.log('descriptor', descriptor);
    // ******************* get *********************
    let originalGet = descriptor.get;
    descriptor.get = function () {
        console.log('from getter');
        return originalGet === null || originalGet === void 0 ? void 0 : originalGet.call(this);
    };
    // ****************** set **********************
    let originalSet = descriptor.set;
    descriptor.set = function (value) {
        console.log('from setter decorator');
        originalSet === null || originalSet === void 0 ? void 0 : originalSet.call(this, value);
    };
}
class Test6 {
    constructor() {
        this._name = 'aaa';
        this._age = 0;
    }
    // ****************************************
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    // ****************************************
    get age() {
        return this._age;
    }
    set age(value) {
        this._age = value;
    }
}
__decorate([
    accessorDecorator,
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], Test6.prototype, "name", null);
__decorate([
    accessorDecorator,
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], Test6.prototype, "age", null);
let obj6 = new Test6();
console.log(obj6.name);
//! ____________________________________________ 4. Property Decorator ____________________________________________
//? - Applied before a class property.
//? - In legacy decorators, receives:
//?   1. The class prototype (for instance properties) or the class constructor (for static properties).
//?   2. The property name.
//? -  Unlike Method and Accessor Decorators, it does not receive a PropertyDescriptor.
//? - It cannot directly change the property's value or modify its PropertyDescriptor.
//? - However, it can indirectly affect the property through other mechanisms,
//?   such as modifying the class prototype or using metadata.
console.log('--------------  Property Decorator --------------');
function propertyDecorator(classPrototype, propertyName) {
    let value;
    let descriptor = {
        //? - `value` must be initialized before it is read to avoid returning `undefined`.
        //? - The property initializer (`name: string = ''`) provides an initial value,
        //?   but the setter must be connected and called to store that value.
        //? The getter returns the value stored by the setter.
        //? The setter is called when a new value is assigned to the property.
        //? It stores the assigned value in `value`, so the getter can return it later.
        get: () => {
            console.log('From Get Property Decorator');
            return value;
        },
        set: (newValue) => {
            console.log('From Set Property Decorator');
            value = newValue;
        }
    };
    Object.defineProperty(classPrototype, propertyName, descriptor);
    //? - `classPrototype`: The prototype where the property is defined.
    //? - `propertyName`: The name of the property to which the descriptor is applied.
    //? - `descriptor`: Defines what happens when the property is read (`get`) or assigned a new value (`set`).
}
class Test7 {
    constructor() {
        this.name = '';
    }
}
__decorate([
    propertyDecorator,
    __metadata("design:type", String)
], Test7.prototype, "name", void 0);
let obj7 = new Test7();
obj7.name = 'asmaa';
console.log(obj7.name);
//! ____________________________________________ 5. Parameter Decorator ____________________________________________
console.log('--------------  Parameter Decorator --------------');
function parameterDecorator(classPrototype, methodName, parameterIndex) {
    console.log(classPrototype);
    console.log(methodName);
    console.log(parameterIndex);
}
class Test8 {
    fun(x) {
    }
}
__decorate([
    __param(0, parameterDecorator),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], Test8.prototype, "fun", null);
let obj8 = new Test8();
//# sourceMappingURL=decorators.js.map