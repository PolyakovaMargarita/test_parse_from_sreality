import { ExtractedData, initExtractedData } from '../models/models';
import * as express from 'express';


interface RequestBody {
    imageSrc: string;
    title: string;
  }

class FlatListController {
  async create(req: express.Request, res: express.Response) {
    try {
        const requestBody = req.body as unknown;
        const { imageSrc, title } = requestBody as RequestBody;
        const extractedData = await ExtractedData.create({ imageSrc, title });
        return res.json(extractedData);
    } catch (error) {
      console.error('Create ExtractedData error:', error);
    }
  }

  async getAll(req: express.Request, res: express.Response) {
    try {
      const extractedDataList = await ExtractedData.findAll();
      return res.json(extractedDataList);
    } catch (error) {
      console.error('Get All ExtractedData error:', error);
    }
  }
}

export default new FlatListController();
