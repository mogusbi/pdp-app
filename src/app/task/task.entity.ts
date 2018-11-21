import {Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';

export class Task {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @CreateDateColumn({
    type: 'timestamp'
  })
  public createdAt: Date;

  @Column({
    unique: true
  })
  public name: string;

  @UpdateDateColumn({
    type: 'timestamp'
  })
  public updatedAt: Date;
}
