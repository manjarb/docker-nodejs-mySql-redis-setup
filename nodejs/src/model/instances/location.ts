import {Table, Column, Model, HasMany, DataType, AutoIncrement, PrimaryKey} from 'sequelize-typescript';

@Table
export default class Location extends Model<Location> {

    @AutoIncrement
    @PrimaryKey
    @Column
    id: number;

    @Column(DataType.STRING(128))
    info: string;
}