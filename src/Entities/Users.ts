import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Users extends BaseEntity {
    @PrimaryGeneratedColumn()
    user_id!: number;
    @Column()
    user_name!: string;
    @Column("text", {array: true})
    bank_accounts!: string[];

}