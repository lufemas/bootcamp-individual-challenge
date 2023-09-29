import axios, { AxiosResponse } from "axios";

class ApiService {
  private static apiBaseUrl = "http://localhost:8080";

  private static defaultOptions = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "http://localhost:3000",
    },
  };

  static async updatePessoaJuridica(id: number, data: any): Promise<AxiosResponse | any> {
    try {
      const response = await axios.put(`${this.apiBaseUrl}/pessoa-juridica/update/${id}`, data);
      return response.data;
    } catch (error) {
      console.error("Error in Axios request:", error);
      return error;
    }
  }

  static async updatePessoaFisica(id: number, data: any): Promise<AxiosResponse | any> {
    try {
      const response = await axios.put(`${this.apiBaseUrl}/pessoa-fisica/update/${id}`, data);
      return response.data;
    } catch (error) {
      console.error("Error in Axios request:", error);
      return error;
    }
  }

  static async addPessoaJuridicaAFila(data: any): Promise<AxiosResponse | any> {
    try {
      const response = await axios.post(`${this.apiBaseUrl}/pessoa-juridica/fila-de-atendimento/adicionar`, data);
      return response.data;
    } catch (error) {
      console.error("Error in Axios request:", error);
      return error;
    }
  }

  static async addPessoaFisicaAFila(data: any): Promise<AxiosResponse | any> {
    try {
      const response = await axios.post(`${this.apiBaseUrl}/pessoa-fisica/fila-de-atendimento/adicionar`, data);
      return response.data;
    } catch (error) {
      console.error("Error in Axios request:", error);
      return error;
    }
  }

  static async createPessoaJuridica(data: any): Promise<AxiosResponse | any> {
    try {
      const response = await axios.post(`${this.apiBaseUrl}/pessoa-juridica/create`, data);
      return response.data;
    } catch (error) {
      console.error("Error in Axios request:", error);
      return error;
    }
  }

  static async createPessoaFisica(data: any): Promise<AxiosResponse | any> {
    try {
      const response = await axios.post(`${this.apiBaseUrl}/pessoa-fisica/create`, data);
      return response.data;
    } catch (error) {
      console.error("Error in Axios request:", error);
      return error;
    }
  }

  static async getPessoaJuridicaById(id: number): Promise<AxiosResponse | any> {
    try {
      const response = await axios.get(`${this.apiBaseUrl}/pessoa-juridica/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error in Axios request:", error);
      return error;
    }
  }

  static async getAllPessoaJuridica(): Promise<AxiosResponse | any> {
    try {
      const response = await axios.get(`${this.apiBaseUrl}/pessoa-juridica/list`);
      return response;
    } catch (error) {
      console.error("Error in Axios request:", error);
      return error;
    }
  }

  static async nextOnQueuePessoaJuridica(): Promise<AxiosResponse | any> {
    try {
      const response = await axios.get(`${this.apiBaseUrl}/pessoa-juridica/fila-de-atendimento/proximo`);
      return response.data;
    } catch (error) {
      console.error("Error in Axios request:", error);
      return error;
    }
  }

  static async getPessoaFisicaById(id: number): Promise<AxiosResponse | any> {
    try {
      const response = await axios.get(`${this.apiBaseUrl}/pessoa-fisica/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error in Axios request:", error);
      return error;
    }
  }

  static async getAllPessoaFisica(): Promise<AxiosResponse | any> {
    try {
      const response = await axios.get(`${this.apiBaseUrl}/pessoa-fisica/list`);
      return response;
    } catch (error) {
      console.error("Error in Axios request:", error);
      return error;
    }
  }

  static async nextOnQueuePessoaFisica(): Promise<AxiosResponse | any> {
    try {
      const response = await axios.get(`${this.apiBaseUrl}/pessoa-fisica/fila-de-atendimento/proximo`);
      return response.data;
    } catch (error) {
      console.error("Error in Axios request:", error);
      return error;
    }
  }

  static async deletePessoaJuridica(id: number): Promise<AxiosResponse | any> {
    try {
      const response = await axios.delete(`${this.apiBaseUrl}/pessoa-juridica/delete/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error in Axios request:", error);
      return error;
    }
  }

  static async deletePessoaFisica(id: number): Promise<AxiosResponse | any> {
    try {
      const response = await axios.delete(`${this.apiBaseUrl}/pessoa-fisica/delete/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error in Axios request:", error);
      return error;
    }
  }

  static setBaseUrl(url: string): string {
    return (this.apiBaseUrl = url);
  }

  static getBaseUrl(): string {
    return this.apiBaseUrl;
  }
}

export default ApiService;
