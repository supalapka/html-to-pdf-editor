import templateToPdfApi from "./axios";

export type Template = {
  id: string;
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

export const updateTemplate = async (id: string, data: { name: string; htmlContent: string }) => {
  const response = await templateToPdfApi.put(`/templates/${id}`, data);
  return response.data;
};

export const deleteTemplate = async (id: string) => {
  const response = await templateToPdfApi.delete(`/templates/${id}`);
  return response.data;
};

export const generatePDF = async (id: string, jsonData: object) => {
  const response = await templateToPdfApi.post(`/templates/${id}/pdf`, jsonData, {
    responseType: "blob",
  });
  return response.data;
};
