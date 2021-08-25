export interface IPopperProps {
    title? : string;
    body : string;
    onAgree : () => void;
    onCancel: () => void;
    open : boolean;
}