import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

interface VacanciesCreationAttrs {
  link: string;
  ar_title: string;
  en_title?: string;
  ru_title?: string;
  ar_description: string;
  en_description?: string;
  ru_description?: string;
}

@Table({ tableName: 'vacancies' })
export class Vacancies extends Model<Vacancies, VacanciesCreationAttrs> {
  @ApiProperty({ example: '1', description: 'unique id' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Գլխավոր Ճարտարապետ', description: 'title' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  ar_title: string;

  @ApiProperty({ example: 'Գլխավոր Ճարտարապետ', description: 'title' })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  en_title?: string;

  @ApiProperty({ example: 'Գլխավոր Ճարտարապետ', description: 'title' })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  ru_title?: string;

  @ApiProperty({
    example:
      'փնտրում է Վաճառքի և սպասարկման կենտրոններում մասնագետ Նոյեմբերյան քաղաքի համար, որը գտնվում է ինչ որ վայրում',
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

  @ApiProperty({ example: 'http://test.com', description: 'user full name' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  link: string;
}
