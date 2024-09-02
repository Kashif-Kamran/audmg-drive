import UserInterface from "@domain/User";
import { model, Document, Schema } from "mongoose";
import { UserInfo } from "os";
export interface UserDocument extends UserInterface, Document { }
const UserSchema = new Schema<UserDocument>({
    username: {
        type: String,
    },
    password: {
        type: String,
    },
    email: {
        type: String,
    },
});

const UserModel = model<UserDocument>("Users", UserSchema);
export default UserModel;