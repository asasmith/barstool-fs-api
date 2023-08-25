import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import axios, { AxiosResponse } from 'axios';
import { app } from '../../server';
import request from 'supertest';

jest.mock('axios');

describe('getBoxsore route handler', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('handles axios error', async () => {
      await request(app).get('/v1/boxscore/no').expect(500);
  });

  it('fetches successfully data from an API', async () => {
    const mockData = {
        foo: 'bar',
    };

    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue({
      data: mockData,
    } as AxiosResponse<typeof mockData>);

    const response = await request(app).get('/v1/boxscore/123');
    expect(response.body).toEqual({ data: { foo: 'bar' }});
  });
});

