import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    email: string;

    @Column({ nullable: true })
    password?: string;

    @Column({ nullable: true })
    googleId?: string;

    @Column({ nullable: true })
    hashedRefreshToken?: string;

    @Column()
    createdAt: Date;
}
