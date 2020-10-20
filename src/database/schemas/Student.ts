import { ObjectID, Entity, Column, CreateDateColumn, UpdateDateColumn, ObjectIdColumn } from 'typeorm';

@Entity('student')
class Subject {

  @ObjectIdColumn()
  _id: ObjectID;
  @Column('uuid')
  id: string;
  @Column()
  avatar: string;
  @Column()
  name: string;
  @Column()
  email: string;
  @Column() 
  birth: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Subject;