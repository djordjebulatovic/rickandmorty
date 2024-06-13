import { FC } from "react";
import { CharacterType } from "../../types/types";
import { Button, Form, Input, Modal, Select } from "antd";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { charactersService } from "../../modules/characters/characters.service";

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

  function submitEdit(value) {
    charactersService.editCharacterInLocalStorage(character, value);
    toast.success("Edited character", {
      position: "top-center",
    });
    closeEditModal();
  }

  return (
    <Modal
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
