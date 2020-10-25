import { IUser, Roles } from './../../interfaces/user';
import * as Knex from 'knex';

export async function seed(knex: Knex): Promise<void> {
  const adminUser: IUser = {
    firstName: 'Igor',
    lastName: 'Sily',
    email: 'igorsily2@gmail.com.br',
    password: '$2b$11$Ht0vFtWZHNh0nOlFr1iLUu2/.p//LlghbIxzckI1bmFjVNDn78tKm', //senha@123
    roles: Roles.sysAdmin as any,
    createdDate: new Date(),
    updatedDate: new Date()
  };

  const users = await knex
    .count()
    .from('user')
    .where({ email: adminUser.email })
    .first();

  if (Number(users.count) > 0) return;

  await knex.insert(adminUser).into('user');
}
