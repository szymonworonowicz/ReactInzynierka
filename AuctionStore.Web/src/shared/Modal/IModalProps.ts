export interface IModalProps {
  isOpen: boolean;
  header: string;
  handleClose?: () => void;
  handleSave?: (data? :any) => void;
}
