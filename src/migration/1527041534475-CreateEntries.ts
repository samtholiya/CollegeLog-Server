import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateEntries1527041534475 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("INSERT INTO `college`.`role` (`name`) VALUES ('Admin');");
        await queryRunner.query("INSERT INTO `college`.`role` (`name`) VALUES('Anonymous');");
        await queryRunner.query("INSERT INTO `college`.`user` (`firstName`, `lastName`, `userName`, `password`, `dateOfBirth`, `mobile`, `email`, `address`, `isActive`, `roleId`)  SELECT 'Admin', 'Admin', 'admin', '63a9f0ea7bb98050796b649e85481845', '1994-11-10', '7777777777', 'admin@college.in', 'Mumbai', '1', id FROM `college`.`role` WHERE  `name` =  'Admin';");
        await queryRunner.query("INSERT INTO `college`.`user` (`firstName`, `lastName`, `userName`, `password`, `dateOfBirth`, `mobile`, `email`, `address`, `isActive`, `roleId`)  SELECT 'Anonymous', 'Anonymous', 'anonymous', '63a9f0ea7bb98050796b649e85481845', '1984-11-10', '1234567890', 'test@college.in', 'Mumbai', '1', id FROM `college`.`role` WHERE  `name` =  'Anonymous';");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
