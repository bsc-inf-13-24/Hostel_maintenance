import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('requests')
export class Request {

  @PrimaryGeneratedColumn()
  id !: number;

  @Column()
  studentId !: number;

  @Column()
  roomNumber !: string;

  @Column()
  issueType !: string;

  @Column()
  description !: string;

  @Column({ default: 'pending' })
  status !: string;

  @CreateDateColumn()
  createdAt !: Date;
}