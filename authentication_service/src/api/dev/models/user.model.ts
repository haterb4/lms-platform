import mongoose, { Document, Model, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import config from 'config';
import log from '../../../config/Logger';

const emailRegexPattern: RegExp  = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    isVerified: boolean;
    verificationCode: number;
    passwordResetCode: number;
    roles: string[];
    comparePassword: (password: string) => Promise<boolean>;
}

const userSchema: Schema<IUser> = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please entrer your name"]
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        validate: {
            validator: function(value: string){
                return emailRegexPattern.test(value)
            },
            message: "Please enter a valid email",
        },
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        minlength: [6, 'Password must be greather than 6 characters'],
        select: false,
    },
    verificationCode: {
        type: Number,
        required: [true, 'Please enter verification code'],
        default: 0,
        minlength: [4, 'Verification code must be greather than 4 digits'],
        select: false,
    },
    passwordResetCode: {
        type: Number,
        required: [false, 'Please enter reset code'],
        default: 0,
        minlength: [4, 'Reset code must be greather than 4 digits'],
        select: false,
    },
    roles: {
        type: [],
        default: ['user']
    },
    isVerified: {
        type: Boolean,
        default: false,
    }
}, {timestamps: true});

userSchema.pre<IUser>('save', async function (next) {
    let user = this as IUser;

  if (!user.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(config.get<number>("saltWorkFactor"));

  const hash = bcrypt.hashSync(user.password, salt);

  user.password = hash;

  next();
})

userSchema.methods.comparePassword = async function(
    candidatePassword: string
): Promise<boolean> {
    const user = this as IUser;
    return await bcrypt.compare(candidatePassword, this.password).catch((e) => {
        log.info(e.message)
        return false
    });
}

const UserModel: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default UserModel;