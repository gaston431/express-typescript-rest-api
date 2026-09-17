export interface Shelter {
    id: number;
    name: string;
    location: string;
}

export type ShelterQueryParams = {
    name?: string;
    location?: string;
}