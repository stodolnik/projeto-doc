import { Injectable, } from '@nestjs/common';
import { Partner } from './interfaces';
import { Token } from '../login/interfaces/index';
import { FiordeHttpService } from '../http/http.service'
import { HttpServiceResponse } from '../http/interfaces/index';

@Injectable()
export class FiordePartnerService extends FiordeHttpService {

  insert(data: Partner, token: Token): Promise<HttpServiceResponse<any>> {
    try {
      const config = { headers: { 'Authorization': token.token_type + ' ' + token.access_token } };

      return this.post(`sap/fiorde/cliente`, data, config);
    } catch (err) {
      throw err;
    }
  }
}
