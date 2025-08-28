import { Injectable } from '@nestjs/common';
import { Config } from './interfaces';
import * as fs from 'fs';

@Injectable()
export class ConfigService {
	private readonly envConfig: Config;

	constructor(filePath?: string) {
		const rawJson: any = fs.readFileSync(filePath);
		this.envConfig = JSON.parse(rawJson);
	}

	get(): Config {
		return this.envConfig;
  }

  _get(key: string): string {
    return this.envConfig[key];
  }
  

  companyConfig(): any {
    return {
      CompanyDB: this._get('DATABASE_NAME'),
      UserName: this._get('SERVICE_LAYER_USERNAME'),
      Password: this._get('SERVICE_LAYER_PASSWORD')    
    }
  }

}