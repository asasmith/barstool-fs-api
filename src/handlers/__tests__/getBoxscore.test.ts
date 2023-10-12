import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import axios, { AxiosResponse } from 'axios';
import { app } from '../../server';
import request from 'supertest';
import { BoxscoreModel } from '../../models/boxscore';

jest.mock('axios');
jest.mock('../../utils/mongoInstance');
// jest.mock('../../models/boxscore');

jest.mock('../../models/boxscore', () => {
  return {
    BoxscoreModel: {
      create: jest.fn(),
      findOne: jest.fn(),
      updateOne: jest.fn(),
    },
  };
});

const mockAxios = axios as jest.Mocked<typeof axios>;

describe('getBoxsore route handler', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    // it('should return the cached boxscore if not stale', async function () {
    //     const mockedCachedBoxscore = {
    //         game_id: '123',
    //         updated_at: Date.now(),
    //     };

    //     const mockBoxscoreModel = BoxscoreModel as jest.Mocked<typeof BoxscoreModel>;

    //     mockBoxscoreModel.findOne.mockResolvedValueOnce(mockedCachedBoxscore);

    //     const response = await request(app).get('/v1/boxscore/123');

    //     expect(response.status).toBe(200);
    // });

    it('should fetch and return a new boxscore if cached data is stale', async () => {
        // Mock a stale cached boxscore
        const mockCachedBoxscore = {
            game_id: '123',
            updated_at: new Date(Date.now() - 16000).toISOString(), // Stale data
          // Add other relevant properties here
        };

        // Mock the Axios GET request response
        const mockApiResponse = {
            data: {
                league: 'NBA',
                away_team: {
                    team_id: 'away',
                },
                home_team: {
                    team_id: 'home',
                },
                // Add other relevant properties here
            },
        };

        const mockUpdateOneResponse = {
            acknowledged: false,
            matchedCount: 1,
            modifiedCount: 1,
            upsertedCount: 1,
            upsertedId: null,
        };

        const mockBoxscoreModel = BoxscoreModel as jest.Mocked<typeof BoxscoreModel>;

        mockBoxscoreModel.findOne.mockResolvedValue(mockCachedBoxscore);
        mockBoxscoreModel.updateOne.mockResolvedValue(mockUpdateOneResponse);
        mockAxios.get.mockResolvedValue(mockApiResponse);

        const response = await request(app).get('/v1/boxscore/123');

        expect(response.status).toBe(200);
        expect(response.body.data).toEqual(expect.objectContaining(mockApiResponse.data));
    });

    // it('should handle errors gracefully and return a 500 status code', async () => {
    //     console.log('here')
    //     const mockBoxscoreModel = BoxscoreModel as jest.Mocked<typeof BoxscoreModel>;

    //     mockBoxscoreModel.findOne.mockRejectedValueOnce(new Error('wut  error'));

    //     const response = await request(app).get('/v1/boxscore/123');

    //     expect(response.status).toBe(500);
    // });

  // it('fetches successfully data from an API', async () => {
  //   const mockData = {
  //       foo: 'bar',
  //   };

  //   (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue({
  //     data: mockData,
  //   } as AxiosResponse<typeof mockData>);

  //   const response = await request(app).get('/v1/boxscore/123');
  //   expect(response.body).toEqual({ data: { foo: 'bar' }});
  // });
});

