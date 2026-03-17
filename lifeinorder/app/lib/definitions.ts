export type Criticality = "red" | "yellow" | "green";

export type RecurrenceOneTime = { type: "one_time" };
export type RecurrenceRecurring = { type: "recurring"; every_months: number };
export type RecurrenceAgeRange = { type: "age_range"; every_months: number; start_age: number; end_age: number };
export type Recurrence = RecurrenceOneTime | RecurrenceRecurring | RecurrenceAgeRange;

export type ItemStep = {
    id: string;
    item_id: string;
    step_order: number;
    text: string;
    resource_url?: string;
};

export type ItemResourceType = "email_template" | "phone_script" | "provider_link" | "calendar_event";

export type ItemResource = {
    id: string;
    item_id: string;
    type: ItemResourceType;
    label: string;
    content: string;
};

export type ApplicableSex = "all" | "female" | "male";

export type ChecklistItem = {
    id: string;
    category_id: string;
    title: string;
    subtitle: string;
    description: string;
    why: string;
    criticality: Criticality;
    applicable_sex: ApplicableSex;
    estimated_time?: string;
    estimated_cost?: string;
    source: string;
    start_age: number;
    end_age?: number;
    recurrence: Recurrence;
    steps?: ItemStep[];
    resources?: ItemResource[];
};

export type Category = {
    id: string;
    name: string;
    description: string;
    entity_type: "user" | "house" | "car";
    display_order: number;
};

export type UserProfile = {
    userAge: number;
    houseAge?: number;
};

export type CompletionRecord = {
    [itemId: string]: string; // ISO timestamp
};

export type LocalStorage = {
    profile: UserProfile;
    completions: CompletionRecord;
};
