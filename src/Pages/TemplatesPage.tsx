import React, { useEffect, useState } from "react";
import TemplateItem from "../Components/TemplateItem";
import { getTemplates, Template } from "../api/myApi";
import CreateTemplateSidebar from "../Components/CreateTemplateSidebar";
import styles from "./TemplatesPage.module.css";

const TemplatesPage: React.FC = () => {

  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

   const fetchTemplates = async () => {
      try {
        const data = await getTemplates();
        setTemplates(data);
      } catch (err) {
        setError("Failed to load templates");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const handleRemove = (id: number) => {
      setTemplates(prev => prev.filter(t => t.id !== id));
    };

  useEffect(() => {
    fetchTemplates();
  }, []);

  return (
    <div>
     <div>
        <button
            className={styles.floatingButton}
            onClick={() => setSidebarOpen(true)}>
            + Create Template
        </button>
<h1 className={styles.pageTitle}>Templates to PDF Editor</h1>
    </div>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {templates.map((t) => (
        <TemplateItem key={t.id} id={t.id} name={t.name} htmlContent={t.htmlContent} onRemove={handleRemove}/>
      ))}

       <CreateTemplateSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onCreated={fetchTemplates}
      />
    </div>
  );
};

export default TemplatesPage;
