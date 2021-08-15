export interface IModalProps {
  isOpen: boolean;
  header: string;
  handleClose?: () => void;
  handleSave?: () => void;
}
