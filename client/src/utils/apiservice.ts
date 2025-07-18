interface UpdateTaskParams {
  task_id: string;
  status?: string;
  task_message?: string;
  token?: string;
}

import { userRequest, authRequest } from "../hooks/useCustomFetch";

export const userRegister = async (formdata: any) => {
  const registerData = await userRequest("/user/register", 'POST', formdata);
  return registerData;
};

export const userLogin = async (formdata: any) => {
  const response = await userRequest("/user/login", 'POST', formdata);
  return response;
}

export const createTask = async (taskdata: any, token: any) => {
  const response = await authRequest("/task/createtask", 'POST', taskdata, token)
  return response;
}

export const getAllUser = async () => {
  const response = await authRequest("/user/getalluser", 'GET')
  return response;
}

export const getAllTask = async (id: number) => {
  const response = await userRequest("/task/getAllTask", 'POST', { id: id });
  return response;
}

export const updateTaskStatus = async ({
  task_id,
  status,
  task_message,
  token,
}: UpdateTaskParams) => {
  const body: Record<string, any> = { task_id };
  if (status !== undefined) body.status = status;
  if (task_message !== undefined) body.task_message = task_message;

  const response = await authRequest("/task/updatetaskStatus", "POST", body, token);
  return response;
};

export const deleteTask = async (task_id: string, token: string) => {
  const response = await authRequest("/task/deleteTask", 'POST', { task_id: Number(task_id) }, token);
  return response;
}

export const getAllassignedTask = async (id: string) => {
  const response = await userRequest("/task/getAllAssignedTask", 'POST', { assignee_id: id })
  return response;
}

export const getSingleUser = async (id: string) => {
  const response = await userRequest(`/user/getuser/${id}`, 'GET');
  return response;
}

export const SendMailToUser = async (mail: string) => {
  const response = await userRequest("/mail/nodemailer", 'POST', { mail: mail })
  return response;
}

export const getMailById = async (taskId: string) => {
  const response = await userRequest(`/task/gettask/${taskId}`, 'GET');
  return response;
}

export const forgotPassword = async (email: string) => {
  const response = await userRequest("/api/forgot-password", 'POST', { email: email })
  return response;
}

export const resetPassword = async (password: string, token: string) => {
  const response = await userRequest("/api/reset-password", 'POST', { password: password, token: token })
  return response;
}

export const getAllTaskbyasignee = async (id: number, page: number, limit: number, searchItem?: string) => {
  const response = await userRequest("/task/getPaginatedTasks", 'POST', { assignee_id: id, page: page, searchItem: searchItem, limit: limit })
  return response;
}

export const getpdfDownload = async (assignee_id: number) => {
  const response = await userRequest("/pdf/generate", 'POST', { assignee_id: assignee_id });
  return response;
}

export const createRemainder = async (task_id: string, assigned_id: number, reminder_date: string, message: string) => {
  console.log("task_id", task_id, "assigned_id", assigned_id, "reminder_date", reminder_date, "message", message);
  const response = await userRequest(`/remainder/createreminder`, 'POST', { task_id, assigned_id, reminder_date, message });
  return response;
}

export const getNotification = async (user_id: number) => {
  const response = await userRequest("/notification/getNotifications", 'POST', { user_id: user_id });
  return response;
}

export const tickNotification = async (notification_id: string, token: string) => {
  const response = await authRequest(`/notification/${notification_id}/read`, 'GET', token);
  return response;
}