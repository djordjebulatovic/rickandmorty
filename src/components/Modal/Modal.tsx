import { ModalProps, Modal as ANTModal } from "antd";
import { observer } from "mobx-react";
import { modalStore } from "../../modules/modals/modal.store";
import { ModalsEnum } from "../../modules/modals/modal.constants";

export interface IModalProps extends ModalProps {
  beforeClose?: () => void;
  modalName: ModalsEnum;
}

export const Modal: React.FC<IModalProps> = observer(
  ({ beforeClose, modalName, ...antModalProps }) => {
    const handleCancel = () => {
      beforeClose && beforeClose();
      modalStore.clearModal();
    };

    const isModalOpen = modalStore.isModalOpen(modalName);

    return (
      <ANTModal {...antModalProps} onCancel={handleCancel} open={isModalOpen} />
    );
  }
);
