import React from "react";
import styles from "./CreateTemplateSidebar.module.css";
import CreateTemplateForm from "./CreateTemplateForm";

type Props = {
  open: boolean;
  onClose: () => void;
  onCreated: () => void;
};

const CreateTemplateSidebar: React.FC<Props> = ({ open, onClose, onCreated }) => {
  return (
    <>
      {/* Overlay click to close*/}
      <div
        className={`${styles.overlay} ${open ? styles.show : ""}`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className={`${styles.sidebar} ${open ? styles.open : ""}`}>
        <h2>Create Template</h2>
        <CreateTemplateForm
          onCreated={() => {
            onCreated();
            onClose();
          }}
        />
      </div>
    </>
  );
};

export default CreateTemplateSidebar;
