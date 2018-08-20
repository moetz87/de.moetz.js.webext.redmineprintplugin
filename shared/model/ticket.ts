export class TicketExtended implements Ticket {
    // tslint:disable:variable-name
    public readonly status: Status;
    public readonly project: Project;
    public readonly category: Category;
    public readonly author: Author;
    public readonly subject: string;
    public readonly created_on: string;
    public readonly assigned_to: AssignedTo;
    public readonly start_date: string;
    public readonly custom_fields: CustomField[];
    public readonly done_ratio: number;
    public readonly updated_on: string;
    public readonly description: string;
    public readonly parent: Parent;
    public readonly id: number;
    public readonly fixed_version: FixedVersion;
    public readonly priority: Priority;
    public readonly tracker: Tracker;

    constructor(ticket: Ticket) {
        Object.assign(this, ticket);
    }

    public get backlog_nr() { return this.getCustomField('BacklogNr'); }
    public get komplexitaetspunkte() { return this.getCustomField('Komplexitätspunkte'); }

    private getCustomField(name: string): any {
        const field = (this.custom_fields && this.custom_fields.find(f => f.name === name));
        return (field && field.value || undefined);
    }
}

export interface Ticket {
    readonly status: Status;
    readonly project: Project;
    readonly category: Category;
    readonly author: Author;
    readonly subject: string;
    readonly created_on: string;
    readonly assigned_to: AssignedTo;
    readonly start_date: string;
    readonly custom_fields: CustomField[];
    readonly done_ratio: number;
    readonly updated_on: string;
    readonly description: string;
    readonly parent: Parent;
    readonly id: number;
    readonly fixed_version: FixedVersion;
    readonly priority: Priority;
    readonly tracker: Tracker;
}

export interface Status {
    readonly name: string;
    readonly id: number;
}

export interface Project {
    readonly name: string;
    readonly id: number;
}

export interface Category {
    readonly name: string;
    readonly id: number;
}

export interface Author {
    readonly name: string;
    readonly id: number;
}

export interface AssignedTo {
    readonly name: string;
    readonly id: number;
}

export interface CustomField {
    readonly value: string;
    readonly name: string;
    readonly id: number;
}

export interface FixedVersion {
    readonly name: string;
    readonly id: number;
}

export interface Priority {
    readonly name: string;
    readonly id: number;
}

export interface Tracker {
    readonly name: string;
    readonly id: number;
}

export interface Parent {
    readonly id: number;
}
