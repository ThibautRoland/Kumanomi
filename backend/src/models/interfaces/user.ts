export interface BaseUser {
    firstName: string,
    lastName: string,
    dateOfBirth: Date
    email: string,
    clearanceLevel: number,
    profileImg: string
}

export interface User extends BaseUser {
    id: number;
}