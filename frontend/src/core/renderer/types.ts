export interface PageSchema {
    components: string[],
    params: Record<string, unknown>,
}

export interface PageProps {
    schema: PageSchema;
}
