import { ObjectID, Entity, Column, CreateDateColumn, UpdateDateColumn, ObjectIdColumn } from 'typeorm';

@Entity('registrations')
class Subject {

  @ObjectIdColumn()
  _id: ObjectID;
  @Column('uuid')
  id: string;
  @Column()
  name: string;
  @Column()
  subjects: [string];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Subject;