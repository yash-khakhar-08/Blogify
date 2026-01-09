import bcrypt from 'bcrypt'
import User, {IUserModel} from '../../models/userModel'
import { signToken } from '../jwt/jwtHelper'
import { RegisterInput, LoginInput } from '../../types/authTypes'

export const registerUser = async (data: RegisterInput) => {

    const { firstName, lastName, email, password } = data;

    const existingUser = await User.findOne({ email })
    if (existingUser) {
        throw new Error('User already exists')
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user: IUserModel = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
    })

    await user.save()

    return { message: 'User registered successfully' }
}

export const loginUser = async (data: LoginInput) => {

    const { email, password } = data

    const user = await User.findOne({ email })
    if (!user) throw new Error('Invalid credentials')
3
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) throw new Error('Invalid credentials')

    const token = signToken({ id: String(user._id) })

    return {
        token,
        user: {
            id: user._id.toString(),
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        }
    }
}