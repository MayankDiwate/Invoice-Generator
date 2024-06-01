import { UserType } from "./User";

export type InitialUserState = {
  currentUser: {
    message: string | null;
    user: UserType | null;
  } | null;
  error: string | null;
  loading: boolean;
};
