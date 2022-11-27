import { User } from "./user";

export class Image {
    id !: number;
    name !: string;
    size !: number;
    type !: string;
    link !: string;
    data !: string[];
    uploadedBy !: User;
    uploadedAt !: Date;
}
