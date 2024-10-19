import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

interface ReportsCreationAttrs {
  fileName: string;
  file: string;
}

@Table({ tableName: 'reports' })
export class Reports extends Model<Reports, ReportsCreationAttrs> {
  @ApiProperty({ example: '1', description: 'unique id' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'file name', description: 'file name' })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  fileName: string;

  @ApiProperty({ example: '', description: 'pdf' })
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  file: string;
}
