export interface IImageElementProps {
    fileId : string;
    fileUrl: string;
    onDelete :(fileId: string) =>  Promise<void>
}