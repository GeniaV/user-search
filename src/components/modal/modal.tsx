import ReactDOM from "react-dom";
import { ModalOverlay } from "../modal-overlay/modal-overlay";
import styles from "./modal.module.css";
import { UserDetails } from "../user-details/user-details";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { IModal } from "../../utils/types";
import { useAppDispatch, useAppSelector } from "../..";
import { clearUserDetails } from "../../redux/userDetailSlice";
import { Preloader } from "../preloader/preloader";

const modalsContainer = document.querySelector("#modals") as HTMLElement;

export function Modal({ close }: IModal) {
  const { name } = useParams();
  const userDetails = useAppSelector(state => state.userDetailsReducer.details);
  const dispatch = useAppDispatch();

  const handleEscKeydown = (evt: { key: string }) => {
    if (evt.key === 'Escape') {
      close();
      dispatch(clearUserDetails());
    }
  };

  const handleClose = () => {
    close();
    dispatch(clearUserDetails());
  };

  useEffect(() => {
    document.addEventListener("keydown", handleEscKeydown);

    return () => {
      document.removeEventListener("keydown", handleEscKeydown);
    };
  }, []);

  if(userDetails.login === '') {
    return <Preloader />;
  }

  return ReactDOM.createPortal(
    <>
      <div className={styles.modal}>
        <button className={styles.close} onClick={handleClose}>X</button>
        {name && <UserDetails />}
      </div>
      <ModalOverlay />
    </>,
    modalsContainer
  )
};