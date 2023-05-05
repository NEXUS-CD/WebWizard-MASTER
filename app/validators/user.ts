import { string, number, date, object } from 'yup';
import Validate from "./index"
export const userSchema = new Validate(object({
    name: string().required(),
    age: number().required().positive().integer(),
    email: string().email(),
    website: string().url().nullable(),
    createdOn: date().default(() => new Date()),
}))