import React, { useState } from "react";
import { createTemplate } from "../api/myApi";
import styles from "./CreateTemplateForm.module.css";

type Props = {
  onCreated: () => void;
};

const CreateTemplateForm: React.FC<Props> = ({ onCreated }) => {
  const [name, setName] = useState("");
  const [htmlContent, setHtmlContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await createTemplate({ name, htmlContent });
      setName("");
      setHtmlContent("");
      onCreated();
    } catch (err) {
      setError("Failed to create template");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.field}>
        <label className={styles.label}>Name:</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className={styles.input}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>HTML Content:</label>
        <textarea
          value={htmlContent}
          onChange={(e) => setHtmlContent(e.target.value)}
          required
          className={styles.textarea}
        />
      </div>

      <button type="submit" className={styles.button} disabled={loading}>
        {loading ? "Creating..." : "Create Template"}
      </button>

      {error && <p className={styles.error}>{error}</p>}
    </form>
  );
};

export default CreateTemplateForm;