import { IUser } from '../interfaces/IUser'
import { Entity, Field, uuid, UUIDField } from '@marcj/marshal'

@Entity("User")
export class User implements IUser {
  @UUIDField().asId()
  uuid: string = uuid()

  @Field()
  public firstName: string = ""

  @Field()
  public lastName: string = ""

}