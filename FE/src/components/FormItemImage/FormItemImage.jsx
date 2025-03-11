import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload } from "antd";

import styles from "./index.module.scss";

const FormItemImage = ({ value, onChange }) => {
  return (
    <Upload
      beforeUpload={() => false}
      onChange={({ file }) => {
        onChange({
          file,
          preview: URL.createObjectURL(file),
        });
      }}
      fileList={[]}
      accept="image/*"
    >
      {value?.preview ? (
        <img src={value.preview} className={styles.image} />
      ) : (
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      )}
    </Upload>
  );
};

export default FormItemImage;
