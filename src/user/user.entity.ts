import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {IsNotEmpty,MinDate } from 'class-validator';
import { EmailEntity } from '../email/email.entity';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsNotEmpty({message: "Le nom de l''utilisateur n''est pas défini"})
  @Column({ type: 'varchar', length: 50 })
  name: string;

  @MinDate(new Date(),{message: "La date de naissance ne peut pas être définie dans le future"})	
  @Column({ type: 'timestamptz', nullable: true })
  birthdate?: Date | null;

  @Column({ type: 'varchar', length: 8 })
  status: string;

  @OneToMany(() => EmailEntity, (email) => email.user)
  emails: EmailEntity[];
}
