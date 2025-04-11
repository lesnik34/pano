import { RoleNamesEnum } from '@api/types/roles';

export const ROLE_RESTRICTIONS = {
  structure: {
    main: [RoleNamesEnum.admin, RoleNamesEnum.manager, RoleNamesEnum.moderator, RoleNamesEnum.tech],
    common: [RoleNamesEnum.user],
  },
};
