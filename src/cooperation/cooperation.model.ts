import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

interface CooperationCreationAttrs {
  title: string;
  link: string;
  image: string;
}

@Table({ tableName: 'cooperation' })
export class Cooperation extends Model<Cooperation, CooperationCreationAttrs> {
  @ApiProperty({ example: '1', description: 'unique id' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'English Title', description: 'English title' })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  en_title: string;

  @ApiProperty({ example: 'Russia Title', description: 'Russia title' })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  ru_title: string;

  @ApiProperty({ example: 'Armenian Title', description: 'Armenian title' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  ar_title: string;

  @ApiProperty({
    example: 'https://translate.google.com',
    description: 'link',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  link: string;

  @ApiProperty({ example: '', description: 'image' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  image: string;
}
