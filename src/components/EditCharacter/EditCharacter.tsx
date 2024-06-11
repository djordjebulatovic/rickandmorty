import { FC } from "react";
import { CharacterType } from "../../types/types";
import { Button, Form, Input, Modal, Select } from "antd";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  getLocalStorage,
  setLocalStorage,
} from "../Character/characters.service";

import styles from "./EditCharacter.module.scss";

interface IEditCharacterProps {
  character: CharacterType;
  closeEditModal: any;
  show: boolean;
}

const EditCharacter: FC<IEditCharacterProps> = ({
  character,
  closeEditModal,
  show,
}) => {
  const [form] = Form.useForm();
  const lista = getLocalStorage();

  // Todo: nije e nego values, vidi kako da istipiziras formu da bi znala sta ce joj biti vrednosti onFinish propa
  // takodje handleStorage je pogresan naming
  function submitEdit(value) {
    const char = lista.find((ch) => {
      return ch.id === character.id;
    });

    // Todo: ovo su neke stvari koje bi isle u chracters.service.ts a onda ova komponenta samo poziva funkciju iz tog servisa da bi dobila rezultat
    // time zelimo da uprostimo samu komponentu i da logiku sakrijemo iza funkcije, uz dobar naming mnogo je lakse razumeti sta se desava u komponenti
    // i tako mnogo manje vremena trosimo na tumacenje koda
    lista.find((ch) => {
      if (ch.id === character.id) {
        if (value.name !== undefined) {
          char.name = value.name;
        }
        if (value.species !== undefined) {
          char.species = value.species;
        }
        if (value.gender !== undefined) {
          char.gender = value.gender;
        }
        if (value.status !== undefined) {
          char.status = value.status;
        }
      }

      const index = lista.findIndex((c) => c.id === char.id);
      lista[index] = char;
      setLocalStorage(lista);
    });
    toast.success("Edited character", {
      position: "top-center",
    });
    closeEditModal();
  }

  return (
    <Modal
      className={styles.container}
      title={"Edit " + character.name}
      open={show}
      onCancel={() => closeEditModal()}
      footer={null}
    >
      <Form form={form} onFinish={submitEdit}>
        <Form.Item name={"name"} label="Name">
          <Input placeholder={character.name} />
        </Form.Item>
        <Form.Item name={"status"} label="Status">
          <Select placeholder={character.status}>
            <Select.Option value="Alive">Alive</Select.Option>
            <Select.Option value="Dead">Dead</Select.Option>
            <Select.Option value="Unknown">Unknown</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name={"species"} label="Species">
          <Input placeholder={character.species} />
        </Form.Item>
        <Form.Item name={"gender"} label="Gender">
          <Select placeholder={character.gender}>
            <Select.Option value="Male">Male</Select.Option>
            <Select.Option value="Female">Female</Select.Option>
            <Select.Option value="Genderless">Genderless</Select.Option>
            <Select.Option value="Unknown">Unknown</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditCharacter;
