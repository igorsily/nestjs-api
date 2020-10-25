import { ApiProperty } from '@nestjs/swagger';
import { Model } from 'objection';

import { Roles, IUser } from '../interfaces/user';

export class User extends Model implements IUser {
  @ApiProperty({ type: 'integer' })
  public id: number;
  @ApiProperty({ type: 'string' })
  public firstName: string;
  @ApiProperty({ type: 'string' })
  public lastName: string;
  @ApiProperty({ type: 'string' })
  public email: string;
  public password: string;
  @ApiProperty({ type: 'string', isArray: true })
  public roles: Roles[];
  @ApiProperty({ type: 'string', format: 'date-time' })
  public createdDate: Date;
  @ApiProperty({ type: 'string', format: 'date-time' })
  public updatedDate: Date;

  @ApiProperty({ type: 'string' })
  public get fullName(): string {
    return `${this.firstName} ${this.lastName}`.trim();
  }

  public static get tableName(): string {
    return 'User';
  }

  public static get virtualAttributes(): string[] {
    return ['fullName'];
  }

  public isSysAdmin(): boolean {
    return this.roles.includes(Roles.sysAdmin);
  }

  public $beforeInsert(): void {
    this.createdDate = this.updatedDate = new Date();
  }

  public $beforeUpdate(): void {
    this.updatedDate = new Date();
  }

  public $formatDatabaseJson(json: any): any {
    json = Model.prototype.$formatDatabaseJson.call(this, json);
    json.roles = json.roles && json.roles.length ? json.roles.join(',') : null;
    return json;
  }

  public $parseDatabaseJson(json: any): any {
    json.roles = json.roles ? json.roles.split(',') : [];
    return Model.prototype.$formatDatabaseJson.call(this, json);
  }

  public $formatJson(data: IUser): IUser {
    delete data.password;
    return data;
  }
}
