import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

interface EducationCreationAttrs {
  ar_title: string;
  en_title?: string;
  ru_title?: string;
  ar_description: string;
  en_description?: string;
  ru_description?: string;
  ar_content1?: string;
  en_content1?: string;
  ru_content1?: string;
  ar_content2?: string;
  en_content2?: string;
  ru_content2?: string;
  ar_content3?: string;
  en_content3?: string;
  ru_content3?: string;
  image: string;
  contentImages1?: string;
  contentImages2?: string;
}

@Table({ tableName: 'education' })
export class Education extends Model<Education, EducationCreationAttrs> {
  @ApiProperty({ example: '1', description: 'unique id' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Armenian Title', description: 'Armenian title' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  ar_title: string;

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
  ar_description: string;

  @ApiProperty({
    example: 'English description',
    description: 'English description',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  en_description: string;

  @ApiProperty({
    example: 'Russia description',
    description: 'Russia description',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  ru_description: string;

  @ApiProperty({ example: 'Armenian Title', description: 'Armenian title' })
  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  ar_content1: string;

  @ApiProperty({
    example: 'English content1',
    description: 'English content1',
  })
  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  en_content1: string;

  @ApiProperty({
    example: 'Russia content1',
    description: 'Russia content1',
  })
  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  ru_content1: string;

  @ApiProperty({
    example: 'English content1',
    description: 'English content1',
  })
  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  ar_content2: string;

  @ApiProperty({
    example: 'English content2',
    description: 'English content2',
  })
  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  en_content2: string;

  @ApiProperty({
    example: 'Russia content2',
    description: 'Russia content2',
  })
  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  ru_content2: string;

  @ApiProperty({
    example: 'English content3',
    description: 'English content3',
  })
  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  ar_content3: string;

  @ApiProperty({
    example: 'English content3',
    description: 'English content3',
  })
  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  en_content3: string;

  @ApiProperty({
    example: 'Russia content3',
    description: 'Russia content3',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  ru_content3: string;

  @ApiProperty({ example: '', description: 'image' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  image: string;

  @ApiProperty({ example: '', description: 'contentImages1' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  contentImages1: string;

  @ApiProperty({ example: '', description: 'contentImages2' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  contentImages2: string;
}
