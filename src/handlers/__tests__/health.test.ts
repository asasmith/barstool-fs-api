import { describe, expect, it } from '@jest/globals';
import { app } from '../../server';
import request from 'supertest';

describe('/health', function () {
    it('should return 200 status when server is running', async function () {
        const response = await request(app).get('/health');

        expect(response.status).toBe(200);
    });
});
