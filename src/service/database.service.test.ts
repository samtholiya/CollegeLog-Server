import * as mocha from 'mocha';
import * as chai from 'chai';
import { DatabaseService } from './database.service';
import { Connection } from 'typeorm';

const expect = chai.expect;

describe("Database Service", () => {
    it("should connect to database", function(done) {
        this.timeout(0);
        DatabaseService.connectDatabase().then((connection:Connection)=>{
            expect(connection.isConnected).to.be.true;
            done();
        }).catch(reason=>{
            done(reason);
        })
    });
});