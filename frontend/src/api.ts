import axios from 'axios';
import { apiUrl } from '@/env';
import { IUserProfile, IUserProfileUpdate, IUserProfileCreate } from './interfaces';
import { IFeedbackCreate, ITicket, ITicketCreate, ITicketUpdate } from './interfaces';


function authHeaders(token: string) {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}

export const api = {
  async logInGetToken(username: string, password: string) {
    const params = new URLSearchParams();
    params.append('username', username);
    params.append('password', password);
    return axios.post(`${apiUrl}/api/v1/login/access-token`, params);
  },
  async getMe(token: string) {
    return axios.get<IUserProfile>(`${apiUrl}/api/v1/users/me`, authHeaders(token));
  },
  async updateMe(token: string, data: IUserProfileUpdate) {
    return axios.put<IUserProfile>(`${apiUrl}/api/v1/users/me`, data, authHeaders(token));
  },
  async getUsers(token: string) {
    return axios.get<IUserProfile[]>(`${apiUrl}/api/v1/users/`, authHeaders(token));
  },
  async updateUser(token: string, userId: number, data: IUserProfileUpdate) {
    return axios.put(`${apiUrl}/api/v1/users/${userId}`, data, authHeaders(token));
  },
  async createUser(token: string, data: IUserProfileCreate) {
    return axios.post(`${apiUrl}/api/v1/users/`, data, authHeaders(token));
  },
  async passwordRecovery(email: string) {
    return axios.post(`${apiUrl}/api/v1/password-recovery/${email}`);
  },
  async resetPassword(password: string, token: string) {
    return axios.post(`${apiUrl}/api/v1/reset-password/`, {
      new_password: password,
      token,
    });
  },

  /* Feedback */
  async createFeedback(token: string, data: IFeedbackCreate) {
    return axios.post(`${apiUrl}/api/v1/feedbacks/`, data, authHeaders(token));
  },

  /* Tickets */
  async getTickets(token: string) {
    return axios.get<ITicket[]>(`${apiUrl}/api/v1/tickets/`, authHeaders(token));
  },
  async createTicket(token: string, data: ITicketCreate) {
    return axios.post(`${apiUrl}/api/v1/tickets/`, data, authHeaders(token));
  },
  async updateTicket(token: string, ticketId: number, data: ITicketUpdate) {
    return axios.put(`${apiUrl}/api/v1/tickets/${ticketId}`, data, authHeaders(token));
  },

  /* Statistics */
  async getStatistics(token: string){
    return axios.get(`${apiUrl}/api/v1/tickets/statistics`, authHeaders(token))
  }
};
