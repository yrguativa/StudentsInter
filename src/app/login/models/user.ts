import { Roles } from "./roles";

export class User {
    uid!: string;
    email!: string | undefined | null;
    roles!: string | undefined | null;

    haveRol(rolesValidate: string[]): boolean {
        if (this.roles === null || this.roles === undefined || this.roles == '') {
            return false;
        }
        let rolesArray = this.roles.split(',');

        return rolesValidate.some(rol => {
            return rolesArray.includes(rol);
        })
    }
}