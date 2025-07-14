import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Book } from './modules/books/entity/books.entity';
import { Repository } from 'typeorm';

describe('BookController (e2e)', () => {
  let app: INestApplication;
  let bookRepository: Repository<Book>;

  const mockBooks = [
    {
      id: 1,
      title: 'Book 1',
      description: 'Description 1',
      coverImage: 'http://localhost:3000/img1.jpg',
    },
    {
      id: 2,
      title: 'Book 2',
      description: 'Description 2',
      coverImage: 'http://localhost:3000/img2.jpg',
    },
  ];

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(getRepositoryToken(Book))
      .useValue({
        find: jest.fn().mockResolvedValue(mockBooks),
        findAll: jest.fn().mockResolvedValue(mockBooks),
      })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    bookRepository = moduleFixture.get<Repository<Book>>(
      getRepositoryToken(Book),
    );
  });

  it('/books (GET) should return all books', async () => {
    const response = await request(app.getHttpServer())
      .get('/books')
      .expect(200);

    expect(response.body).toEqual(mockBooks);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(2);
  });

  afterAll(async () => {
    await app.close();
  });
});
