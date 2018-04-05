export interface Ticket {
    status: Status;
    project: Project;
    category: Category;
    author: Author;
    subject: string;
    created_on: string;
    assigned_to: AssignedTo;
    start_date: string;
    custom_fields: CustomField[];
    done_ratio: number;
    updated_on: string;
    description: string;
    parent: Parent;
    id: number;
    fixed_version: FixedVersion;
    priority: Priority;
    tracker: Tracker;
}

export interface Status {
    name: string;
    id: number;
}

export interface Project {
    name: string;
    id: number;
}

export interface Category {
    name: string;
    id: number;
}

export interface Author {
    name: string;
    id: number;
}

export interface AssignedTo {
    name: string;
    id: number;
}

export interface CustomField {
    value: string;
    name: string;
    id: number;
}

export interface FixedVersion {
    name: string;
    id: number;
}

export interface Priority {
    name: string;
    id: number;
}

export interface Tracker {
    name: string;
    id: number;
}

export interface Parent {
    id: number;
}
