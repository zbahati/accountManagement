import { AccountEntity } from "src/account/entity/account.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    email: string

    @Column()
    password: string

    @OneToMany(()=> AccountEntity, (account) => account.user)
    accounts: AccountEntity[]

    constructor(entity: Partial<UserEntity>){
        Object.assign(this, entity)
    }
}