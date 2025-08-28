import { Injectable, } from '@nestjs/common';
import { JournalEntrieReturn } from './interfaces';
import { Token } from '../login/interfaces/index';
import { FiordeHttpService } from '../http/http.service'
import { HttpServiceResponse } from '../http/interfaces/index';

@Injectable()
export class FiordeJournalEntriesService extends FiordeHttpService {

  async insert({ id }: JournalEntrieReturn, token: Token): Promise<HttpServiceResponse<any>> {
    try {
      const config = { headers: { 'Authorization': token.token_type + ' ' + token.access_token } };

       const retorno =  await this.put(`sap/contabil/estorno/${id}`, '', config);
       return retorno;
    } catch (err) {
      throw err;
    }
  }
}
