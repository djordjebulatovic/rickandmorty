import { FC, useState } from "react";
import styles from "./EditCharacter.module.scss";
import CharacterType from "../../types/types";
import { Button, Form, Input, Select } from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type LayoutType = Parameters<typeof Form>[0]["layout"];

interface IEditCharacterProps {
  character: CharacterType;
  closeEditModal: any;
}

const EditCharacter: FC<IEditCharacterProps> = ({
  character,
  closeEditModal,
}) => {
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState<LayoutType>("horizontal");
  const onFormLayoutChange = ({ layout }: { layout: LayoutType }) => {
    setFormLayout(layout);
  };
  const lista = window.localStorage.getItem("favorites");

  function handleStorage(e) {
    const char = JSON.parse(lista).find((ch) => {
      return ch.id === character.id;
    });

    JSON.parse(lista).find((ch) => {
      if (ch.id === character.id) {
        if (e.name != undefined) {
          char.name = e.name;
        }
        if (e.species != undefined) {
          char.species = e.species;
        }
        if (e.gender != undefined) {
          char.gender = e.gender;
        }
        if (e.status != undefined) {
          char.status = e.status;
        }
      }

  
      const index = JSON.parse(lista).findIndex((c) => c.id === char.id);
      const finalList = JSON.parse(lista);
      finalList[index] = char;
      window.localStorage.setItem("favorites", JSON.stringify(finalList));
    });
    toast.success("Edited character", {
      position: "top-center",
    });
    closeEditModal();
  }

  const formItemLayout =
    formLayout === "horizontal"
      ? {
          labelCol: { span: 4 },
          wrapperCol: { span: 14 },
        }
      : null;

  return (
    <div className={styles.container}>
      <button className={styles.close} onClick={closeEditModal}>
        X
      </button>
      <Form
        {...formItemLayout}
        layout={formLayout}
        form={form}
        onFinish={handleStorage}
        initialValues={{ layout: formLayout }}
        onValuesChange={onFormLayoutChange}
      >
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
      {/* <ToastContainer /> */}
    </div>
  );
};

export default EditCharacter;
