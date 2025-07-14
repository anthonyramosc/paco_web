export interface Post {
    id: string;
    title: string;
    content: string;
    imageUrl?: string; // Opcional
    authorId: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface CreatePostDto {
    title: string;
    content: string;
    imageUrl?: string; // Opcional
    authorId: string;
}

export interface UpdatePostDto {
    title?: string;
    content?: string;
    imageUrl?: string;
    authorId?: string;
}