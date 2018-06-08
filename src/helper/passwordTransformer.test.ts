import * as mocha from 'mocha';
import * as chai from 'chai';
import { PasswordTransformer } from './passwordTransformer';
import { Md5 } from 'md5-typescript';

const expect = chai.expect;

describe("Password Transformation", () => {

    let pass = new PasswordTransformer();
    it("should send hash to database from string", () => {
        expect(pass.to("root")).to.equal(Md5.init("root"));
    });

    it("should get hash from database as is", () => {
        expect(pass.from(Md5.init("root"))).to.equal(Md5.init("root"));
    });
});