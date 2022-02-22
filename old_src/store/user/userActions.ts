export const SetUser = "SET User";
export const InitUser = "INIT User";

export function actionSetUser(userEmail: string, isAdmin: boolean) {
  return {
    type: SetUser,
    payload: { userEmai: userEmail, isAdmin: isAdmin },
  } as const;
}

export function actionInitUser() {
  return {
    type: InitUser,
  } as const;
}

type SetUserType = ReturnType<typeof actionSetUser>;
type InitUserType = ReturnType<typeof actionInitUser>;

export type UserActions = SetUserType | InitUserType;
