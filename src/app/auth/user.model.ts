export class User {
    public name: string;
    public email: string;
    public uid: string;

    constructor( userObject: DataObject ) {
        this.name = userObject && userObject.name || null;;
        this.email = userObject && userObject.email || null;
        this.uid = userObject && userObject.uid || null;
    }
}


interface DataObject {
    uid: string;
    name: string;
    email: string;
}