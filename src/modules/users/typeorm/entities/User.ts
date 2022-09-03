import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @Column({ length: 250 })
  public name!: string;

  @Column({ length: 250, unique: true })
  public email!: string;

  @Column({ length: 250 })
  public password!: string;

  @Column({ length: 250 })
  public avatar?: string;

  @CreateDateColumn()
  public created_at!: Date;

  @UpdateDateColumn()
  public updated_at!: Date;
}

export default User;
