import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

interface EmployeesCreationAttrs {
  ar_fullName: string;
  en_fullName?: string;
  ru_fullName?: string;
  ar_rank: string;
  en_rank?: string;
  ru_rank?: string;
  ar_content: string;
  en_content?: string;
  ru_content?: string;
  image: string;
}

@Table({ tableName: 'employees' })
export class Employees extends Model<Employees, EmployeesCreationAttrs> {
  @ApiProperty({ example: '1', description: 'unique id' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'ar Title', description: 'ar title' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  ar_fullName: string;

  @ApiProperty({ example: 'en Title', description: 'en title' })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  en_fullName: string;

  @ApiProperty({ example: 'ru Title', description: 'ru title' })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  ru_fullName: string;

  @ApiProperty({ example: 'ar Rank', description: 'ar Rank' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  ar_rank: string;

  @ApiProperty({ example: 'en Rank', description: 'en Rank' })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  en_rank: string;

  @ApiProperty({ example: 'ru Rank', description: 'ru Rank' })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  ru_rank: string;

  @ApiProperty({ example: 'ar Content', description: 'ar Content' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  ar_content: string;

  @ApiProperty({ example: 'en Content', description: 'en Content' })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  en_content: string;

  @ApiProperty({ example: 'ru Content', description: 'ru Content' })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  ru_content: string;

  @ApiProperty({ example: '', description: 'image' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  image: string;
}
