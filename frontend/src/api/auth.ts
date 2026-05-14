import http from './http'

export const authApi = {
  login: (username: string, password: string) =>
    http.post<any, { token: string; username: string; role: string; mustChangePassword: boolean }>(
      '/auth/login', { username, password }),

  changePassword: (oldPassword: string, newPassword: string) =>
    http.post('/auth/change-password', { oldPassword, newPassword }),

  me: () => http.get<any, { username: string; role: string; mustChangePassword: boolean }>('/auth/me'),
}
