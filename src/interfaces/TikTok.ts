export interface TikTok {
    id: string;
    embed: string;
    nombre?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface CreateTikTokVideoDto {
    embed: string;
}

export interface UpdateTikTokVideoDto {
    embed?: string;
}