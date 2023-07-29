import styles from "./modal-overlay.module.css";

export interface IEventHandlerProps {
  onClick: (e: React.MouseEvent) => void;
};

export function ModalOverlay() {
  return (
    <div className={styles.overlay}>
    </div>
  );
};
