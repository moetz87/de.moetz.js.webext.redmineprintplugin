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
