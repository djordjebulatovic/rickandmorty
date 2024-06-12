import { makeAutoObservable } from "mobx";
import { ModalsEnum } from "./modal.constants";

class ModalStore {
  openModal: ModalsEnum | null;

  constructor() {
    makeAutoObservable(this);
  }

  get isModalOpen() {
    return (modalName: ModalsEnum) => this.openModal === modalName;
  }

  setOpenModal = (modalName: ModalsEnum) => {
    this.openModal = modalName;
  };

  clearModal = () => {
    this.openModal = null;
  };
}

export const modalStore = new ModalStore();
