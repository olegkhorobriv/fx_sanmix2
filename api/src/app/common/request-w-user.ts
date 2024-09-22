import {UserModel} from "../../../../@libs/models/user.model";

export type RequestWithUser = Request & { user: UserModel };
