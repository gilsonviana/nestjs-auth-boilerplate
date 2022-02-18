import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', unique: true, nullable: false })
  username: string;

  @Column({ type: 'text', unique: true, nullable: false })
  email: string;

  @Exclude()
  @Column({ type: 'text', nullable: false })
  password: string;

  @Exclude()
  @Column({ type: 'text', nullable: false })
  salt: string;
}
