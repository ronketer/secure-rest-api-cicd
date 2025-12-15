const request = require('supertest');
const app = require('../app');
const Todo = require('../models/Todo');
const jwt = require('jsonwebtoken');

const getValidTestToken = (userId = '507f1f77bcf86cd799439011') => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET || 'test-secret-key-for-jwt-signing',
    { expiresIn: '30d' }
  );
};

describe('Todo Input Validation - Integration Tests', () => {
  let authToken;

  beforeEach(async () => {
    authToken = getValidTestToken();
    
    try {
      await Todo.deleteMany({});
    } catch (error) {
      // Collection may not exist yet
    }
  });

  describe('POST /api/v1/todos - Title Length Validation', () => {
    it('should reject todo creation with title too short (< 3 chars)', async () => {
      const response = await request(app)
        .post('/api/v1/todos')
        .set('Authorization', 'Bearer valid_token')
        .send({
          title: 'ab',
          description: 'Test',
        });

      expect(response.status).toBe(400);
      expect(
        response.body.msg || 
        response.body.message || 
        response.body.error || 
        JSON.stringify(response.body)
      ).toMatch(/title|length|minimum|3|characters/i);
    });

    it('should reject todo creation with title too long (> 50 chars)', async () => {
      const longTitle = 'A'.repeat(51);
      const response = await request(app)
        .post('/api/v1/todos')
        .set('Authorization', 'Bearer valid_token')
        .send({
          title: longTitle,
          description: 'Test',
        });

      expect(response.status).toBe(400);
      expect(
        response.body.msg || 
        response.body.message || 
        response.body.error || 
        JSON.stringify(response.body)
      ).toMatch(/title|length|maximum|50|characters/i);
    });

    it('should reject todo with whitespace-only title', async () => {
      const response = await request(app)
        .post('/api/v1/todos')
        .set('Authorization', 'Bearer valid_token')
        .send({
          title: '   ',
          description: 'Test',
        });

      expect(response.status).toBe(400);
      expect(
        response.body.msg || 
        response.body.message || 
        response.body.error || 
        JSON.stringify(response.body)
      ).toMatch(/title|content|empty|whitespace/i);
    });

    it('should accept todo with valid title length (3-50 chars)', async () => {
      const response = await request(app)
        .post('/api/v1/todos')
        .set('Authorization', 'Bearer valid_token')
        .send({
          title: 'Valid Todo Title',
          description: 'Test description',
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('title', 'Valid Todo Title');
    });

    it('should accept minimum valid title length (exactly 3 chars)', async () => {
      const response = await request(app)
        .post('/api/v1/todos')
        .set('Authorization', 'Bearer valid_token')
        .send({
          title: 'ABC',
          description: 'Test',
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('title', 'ABC');
    });

    it('should accept maximum valid title length (exactly 50 chars)', async () => {
      const response = await request(app)
        .post('/api/v1/todos')
        .set('Authorization', 'Bearer valid_token')
        .send({
          title: 'A'.repeat(50),
          description: 'Test',
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('title', 'A'.repeat(50));
    });
  });

  describe('POST /api/v1/todos - Required Field Validation', () => {
    it('should reject todo without title field', async () => {
      const response = await request(app)
        .post('/api/v1/todos')
        .set('Authorization', 'Bearer valid_token')
        .send({
          description: 'Test',
        });

      expect(response.status).toBe(400);
      expect(
        response.body.msg || 
        response.body.message || 
        response.body.error || 
        JSON.stringify(response.body)
      ).toMatch(/title|required/i);
    });

    it('should reject todo with null title', async () => {
      const response = await request(app)
        .post('/api/v1/todos')
        .set('Authorization', 'Bearer valid_token')
        .send({
          title: null,
          description: 'Test',
        });

      expect(response.status).toBe(400);
    });
  });
});
  /**
   * Test Suite: Title Length Validation
   * 
   * Background: The Todo model has constraints:
   * - maxlength: 50 characters
   * - minlength: 3 characters
   * 
   * QA Requirement: The API should enforce these constraints
   * and return clear error messages when violated.
   */
  describe('POST /api/v1/todos - Title Length Validation', () => {
    it('should reject todo creation with title too short (< 3 chars)', async () => {
      // Bug Report: API accepts titles shorter than minlength: 3
      // Steps to reproduce:
      // 1. Send POST request with title "ab" (2 characters)
      // 2. Expected: 400 Bad Request with error message
      // 3. Actual: May accept invalid data or return confusing error
      
      const response = await request(app)
        .post('/api/v1/todos')
        .set('Authorization', 'Bearer valid_token')
        .send({
          title: 'ab', // 2 characters - violates minlength: 3
          description: 'Test',
        });

      // Should reject with 400 Bad Request
      expect(response.status).toBe(400);
      // Error message should be clear about the constraint
      expect(response.body.msg || response.body.message || response.body.error)
        .toMatch(/title|length|minimum|3|characters/i);
    });

    it('should reject todo creation with title too long (> 50 chars)', async () => {
      // Bug Report: API accepts titles longer than maxlength: 50
      // Steps to reproduce:
      // 1. Send POST request with title > 50 characters
      // 2. Expected: 400 Bad Request
      // 3. Actual: May truncate, fail at DB level, or accept invalid data
      
      const longTitle = 'A'.repeat(51); // 51 characters - exceeds maxlength: 50
      const response = await request(app)
        .post('/api/v1/todos')
        .set('Authorization', 'Bearer valid_token')
        .send({
          title: longTitle,
          description: 'Test',
        });

      // Should reject with 400 Bad Request
      expect(response.status).toBe(400);
      // Error message should reference length constraint
      expect(response.body.msg || response.body.message || response.body.error)
        .toMatch(/title|length|maximum|50|characters/i);
    });

    it('should reject todo with whitespace-only title', async () => {
      // Bug Report: API accepts titles that are only whitespace
      // Steps to reproduce:
      // 1. Send POST with title = "   " (only spaces)
      // 2. Expected: 400 Bad Request - title must have content
      // 3. Actual: Accepts whitespace as valid title
      
      const response = await request(app)
        .post('/api/v1/todos')
        .set('Authorization', 'Bearer valid_token')
        .send({
          title: '   ', // 3 spaces - passes minlength but is invalid
          description: 'Test',
        });

      // Should reject whitespace-only titles
      expect(response.status).toBe(400);
      expect(response.body.msg || response.body.message || response.body.error)
        .toMatch(/title|content|empty|whitespace/i);
    });

    it('should accept todo with valid title length (3-50 chars)', async () => {
      // Happy path: Valid title should be accepted
      const response = await request(app)
        .post('/api/v1/todos')
        .set('Authorization', 'Bearer valid_token')
        .send({
          title: 'Valid Todo Title', // 15 characters - within 3-50 range
          description: 'Test description',
        });

      // Should accept valid input
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('title', 'Valid Todo Title');
    });

    it('should accept minimum valid title length (exactly 3 chars)', async () => {
      // Boundary test: Exact minimum length
      const response = await request(app)
        .post('/api/v1/todos')
        .set('Authorization', 'Bearer valid_token')
        .send({
          title: 'ABC', // Exactly 3 characters
          description: 'Test',
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('title', 'ABC');
    });

    it('should accept maximum valid title length (exactly 50 chars)', async () => {
      // Boundary test: Exact maximum length
      const response = await request(app)
        .post('/api/v1/todos')
        .set('Authorization', 'Bearer valid_token')
        .send({
          title: 'A'.repeat(50), // Exactly 50 characters
          description: 'Test',
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('title', 'A'.repeat(50));
    });
  });

  /**
   * Test Suite: Empty/Null Title
   * Purpose: Ensure required field validation works
   */
  describe('POST /api/v1/todos - Required Field Validation', () => {
    it('should reject todo without title field', async () => {
      const response = await request(app)
        .post('/api/v1/todos')
        .set('Authorization', 'Bearer valid_token')
        .send({
          // Missing title field
          description: 'Test',
        });

      expect(response.status).toBe(400);
      expect(response.body.msg || response.body.message || response.body.error)
        .toMatch(/title|required/i);
    });

    it('should reject todo with null title', async () => {
      const response = await request(app)
        .post('/api/v1/todos')
        .set('Authorization', 'Bearer valid_token')
        .send({
          title: null,
          description: 'Test',
        });

      expect(response.status).toBe(400);
    });
  });
});
