export interface VolumeInfo {
    authors: string[];
    categories?: string[];
    industryIdentifiers: {
        type: string;
        identifier: string;
    }[];
    description: string;
    imageLinks?: {
        smallThumbnail: string;
        thumbnail: string;
    };
    language: string;
    pageCount: number;
    publisher: string;
    title: string;
    subtitle: string;
    publishedDate: string;
}

export interface Volume {
    id: string;
    searchInfo: {
        textSnippet: string;
    };
    volumeInfo: VolumeInfo;
}
