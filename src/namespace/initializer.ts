interface IService {
    // add some methods or something to distinguish from {}
    init(): void;
}

// add a registry of the type you expect
export namespace IServicePanel {
    type Constructor<T> = {
        new(...args: any[]): T;
        readonly prototype: T;
    }
    const implementations: Constructor<IService>[] = [];
    export function GetImplementations(): Constructor<IService>[] {
        return implementations;
    }
    export function register<T extends Constructor<IService>>(ctor: T) {
        implementations.push(ctor);
        return ctor;
    }
}