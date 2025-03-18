interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData extends LoginCredentials {}

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
}

interface TaskData {
  title: string;
  description: string;
  status: string;
}

interface UserProfileData {
  _id?: string;
  email?: string;
}

export type { RegisterData, LoginCredentials, Task, TaskData, UserProfileData };
