import { ValueTransformer } from "typeorm/decorator/options/ValueTransformer";
import { Md5 } from "md5-typescript";

export class PasswordTransformer implements ValueTransformer {
    to(value: string):string {
        return Md5.init(value);
    }
    from(value: string):string {
        return value;
    }
}