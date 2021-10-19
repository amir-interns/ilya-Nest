import { Entity, Column, PrimaryGeneratedColumn , ColumnOptions} from 'typeorm';

@Entity()
export class BalanceRequest {

    @PrimaryGeneratedColumn()
    id: number

    @Column({length: 15})
    ip: string

    @Column({length: 100, nullable:true})
    address: string

    @Column({type: 'text'})
    type: string

    @Column('jsonb')
    result: string

    @Column('date')
    createdAt: string

    @Column({type:'date', nullable:true})
    updatedAt: string

}