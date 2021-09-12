export interface IPopperProps {
  title?: string;
  body: string | JSX.Element;
  onAgree?: () => void;
  onCancel?: () => void;
  open: boolean;
  showSave?: boolean;
  showCancel?: boolean;
  maxWidth?: "lg" | "md" | "sm" | "xl" | "xs" | false;
}
