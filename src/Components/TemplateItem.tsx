import React, { useState } from "react";
import styles from "./TemplateItem.module.css";
import { generatePdf, generatePdfWithSubstitution, deleteTemplate, updateTemplate } from "../api/myApi";


type TemplateItemProps = {
  id: number;
  name: string;
  htmlContent: string;
};

const TemplateItem: React.FC<TemplateItemProps> = ({ id, name, htmlContent }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(name);
  const [templateName, setTemplateName] = useState(name);
  const [editHtml, setEditHtml] = useState(htmlContent);
  const [templateHTML, setTemplateHTML] = useState(htmlContent);

  const [customData, setCustomData] = useState(""); // to JSON substitution


  const handleDownload = async () => {
    try {
      let blob;
      if(customData)
        blob = await generatePdfWithSubstitution(id, customData);
      else
        blob = await generatePdf(id);

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${name}.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);
        setCustomData("");

    } catch (err) {
      console.error("Failed to download PDF", err);
    } 
  };

  const handleDelete = async () => {
    try {
     deleteTemplate(id)
    } catch (err) {
      console.error("Failed to delete template", err);
    } 
  };

  const handleEdit = () => {
       setIsEditing(true);
  };

   const handleSave = async () => {
    try {
      await updateTemplate(id, editName, editHtml);
      setIsEditing(false);

      setTemplateName(editName); //update displaying name instead of fetching from API
      setTemplateHTML(editHtml); //update displaying html instead of fetching from API
    } catch (err) {
      console.error("Failed to update template", err);
    }
  };

  const handleCancel = () => {
    setEditName(name); 
    setEditHtml(htmlContent);
    setIsEditing(false);
  };

 return (
  <div className={styles.card}>
    <h2>{templateName}</h2>
    <div
      className={styles["card-content"]}
      dangerouslySetInnerHTML={{ __html: templateHTML }}
    />
    <div className={styles["card-buttons"]}>

      <textarea
        placeholder='JSON for substitution (Optional)'
        value={customData}
        onChange={(e) => setCustomData(e.target.value)}
        className={styles.jsonInput}
      />
      <button className={styles.downloadButton} onClick={handleDownload}>
        Download PDF
      </button>
      <button className={styles.deleteButton} onClick={handleDelete}>
        Delete
      </button>
      <button className={styles.editButton} onClick={handleEdit}>
        Edit
      </button>
    </div>

    {isEditing && (
      <div className={styles.editForm}>
        <input
          type="text"
          value={editName}
          onChange={(e) => setEditName(e.target.value)}
        />
        <textarea
          value={editHtml}
          onChange={(e) => setEditHtml(e.target.value)}
        />
        <button onClick={handleSave}>Save</button>
        <button onClick={handleCancel}>Cancel</button>
      </div>
    )}
  </div>
);

};

export default TemplateItem;