import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

interface UserCreationAttrs {
  email: string;
  password: string;
  fullName: string;
}

@Table({ tableName: 'vacancies' })
export class Vacancies extends Model<Vacancies, UserCreationAttrs> {
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
  title: string;

  @ApiProperty({
    example:
      'փնտրում է Վաճառքի և սպասարկման կենտրոններում մասնագետ Նոյեմբերյան քաղաքի համար, որը գտնվում է ինչ որ վայրում',
    description: 'description',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;

  @ApiProperty({ example: 'http://test.com', description: 'user full name' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  link: string;
}
