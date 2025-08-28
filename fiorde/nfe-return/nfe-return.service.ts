import { Injectable, } from '@nestjs/common';
import { NFeReturn } from './interfaces';
import { Token } from '../login/interfaces/index';
import { FiordeHttpService } from '../http/http.service'
import { HttpServiceResponse } from '../http/interfaces/index';
import { identity } from 'lodash';

@Injectable()
export class FiordeNfeService extends FiordeHttpService {

  async insert(id: string, data: NFeReturn, token: Token): Promise<HttpServiceResponse<any>> {
    try {
      const config = { headers: { 'Authorization': token.token_type + ' ' + token.access_token } };
      return await this.post(`sap/barter/retorno-nf/${id}`, data, config);
    } catch (err) {
      throw err;
    }
  }

  async insertEntry(id: string, project: string, data: NFeReturn, token: Token): Promise<HttpServiceResponse<any>> {
    try {
      const config = { headers: { 'Authorization': token.token_type + ' ' + token.access_token } };
      const endpoint = `sap/integracao-nota/servico/retorno/nota/${id}/projeto/${project}`;
      const retorno = await this.put(endpoint, data, config);
      return retorno;
    } catch (err) {
      throw err;
    }
  }
}
