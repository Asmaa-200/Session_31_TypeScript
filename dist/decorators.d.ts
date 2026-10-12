declare class User {
    name: string;
    constructor(name: string);
}
declare function test(constructor: Function): void;
declare class Auth {
    name: string;
    fun(): void;
}
declare let obj: Auth;
declare function test2(message: string): (constructor: Function) => void;
declare class Auth2 {
    fun2(): void;
}
declare let obj2: Auth2;
declare function first(construct: Function): void;
declare function second(construct: Function): void;
declare class Auth3 {
    name: string;
}
declare function methodDecorator(classProperty: Object, methodName: string, descriptor: PropertyDescriptor): void;
declare function classDecorator(constructor: Function): void;
declare class test3 {
    myMethod(): number;
}
declare let obj3: test3;
declare function methodDecorator2(classProperty: Object, methodName: string, descriptor: PropertyDescriptor): void;
declare class test4 {
    myMethod(x: number): number;
}
declare let obj4: test4;
declare function methodDecorator3(classProperty: Object, methodName: string, descriptor: PropertyDescriptor): void;
declare class test5 {
    myMethod(x: number): number;
}
declare let obj5: test5;
declare function accessorDecorator(classPrototype: Object, accessorName: string, descriptor: PropertyDescriptor): void;
declare class Test6 {
    private _name;
    private _age;
    get name(): string;
    set name(value: string);
    get age(): number;
    set age(value: number);
}
declare let obj6: Test6;
declare function propertyDecorator(classPrototype: Object, propertyName: string): void;
declare class Test7 {
    name: string;
}
declare let obj7: Test7;
declare function parameterDecorator(classPrototype: Object, methodName: string, parameterIndex: number): void;
declare class Test8 {
    fun(x: string): void;
}
declare let obj8: Test8;
//# sourceMappingURL=decorators.d.ts.map