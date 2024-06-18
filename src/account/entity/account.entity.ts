import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AccountType } from "../account.enum";
import { UserEntity } from "src/user/entity/user.entity";

@Entity('accounts')
export class AccountEntity{
    @PrimaryGeneratedColumn()
    id: number

    @Column({default: AccountType.SAVING})
    accountType: string

    @Column()
    amount: number

    @Column()
    share: number

    @ManyToOne(() => UserEntity, (user) => user.id)
    user: UserEntity

    constructor(entity: Partial<AccountEntity>){
        Object.assign(this, entity)
    }
}
