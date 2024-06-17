import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    email: string

    @Column()
    password: string

    constructor(entity: Partial<UserEntity>){
        Object.assign(this, entity)
    }
}