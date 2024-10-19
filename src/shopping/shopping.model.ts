import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

interface ShoppingCreationAttrs {
  link: string;
  ar_title: string;
  en_title?: string;
  ru_title?: string;
  ar_description: string;
  en_description?: string;
  ru_description?: string;
  image: string;
}

@Table({ tableName: 'shopping' })
export class Shopping extends Model<Shopping, ShoppingCreationAttrs> {
  @ApiProperty({ example: '1', description: 'unique id' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: '', description: 'title' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  ar_title: string;

  @ApiProperty({ example: '', description: 'title' })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  en_title?: string;

  @ApiProperty({ example: '', description: 'title' })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  ru_title?: string;

  @ApiProperty({
    example: '',
    description: 'description',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  ar_description: string;

  @ApiProperty({
    example: '',
    description: 'description',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  en_description?: string;

  @ApiProperty({
    example: '',
    description: 'description',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  ru_description?: string;

  @ApiProperty({ example: 'http://test.com', description: 'link' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  link: string;

  @ApiProperty({ example: '', description: 'image' })
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  image: string;
}
