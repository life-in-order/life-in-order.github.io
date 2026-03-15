export type ListItem = {
    id: number,
    title: string,
    subtitle: string,
    reason: Reason
};

export type Reason = {
    description: string,
    source: string
}