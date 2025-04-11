export interface RoleI {
  id: string;
  name: RoleNamesEnum;
}

export enum RoleNamesEnum {
  user = 'user',
  manager = 'manager',
  moderator = 'moderator',
  admin = 'admin',
  tech = 'tech',
}
