export class EntryEgress {

    description: string;
    mount: number;
    type: string;
    uid?: string;

    constructor( entryEgressObject: any ) {
        this.description = entryEgressObject && entryEgressObject.description || null;;
        this.mount = entryEgressObject && entryEgressObject.mount || null;
        this.type = entryEgressObject && entryEgressObject.type || null;
        // this.uid = entryEgressObject && entryEgressObject.uid || null;

    }
}