import templateToPdfApi from "./axios";

export type Template = {
  id: number;
  name: string;
  htmlContent: string;
};

export const getTemplates = async (): Promise<Template[]> => {
  const response = await templateToPdfApi.get<Template[]>("/templates");
  return response.data;
};

export const createTemplate = async (data: { name: string; htmlContent: string }) => {
  const response = await templateToPdfApi.post("/templates", data);
  return response.data;
};

export const updateTemplate = async (id: number, name: string, htmlContent: string) => {
  const data = { id, name, htmlContent };
  const response = await templateToPdfApi.put(`/templates/`, data);
  return response.data;
};


export const deleteTemplate = async (id: number) => {
  const response = await templateToPdfApi.delete(`/templates/${id}`);
  return response.data;
};


export const generatePdf = async (id: number) => {
  const response = await templateToPdfApi.post(`/templates/${id}/pdf`, {}, {
    responseType: "blob",
  });
  return response.data;
};
