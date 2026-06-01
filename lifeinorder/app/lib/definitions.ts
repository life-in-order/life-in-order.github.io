export type ListItem = {
    id: number,
    title: string,
    subtitle: string,
    reason: ExpertOpinion,
    how: string[],
    what: ExpertOpinion
};

export type ExpertOpinion = {
    description: string,
    source: string
};