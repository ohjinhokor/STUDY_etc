import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe("getAlllll", () =>{

    it("should return an array", () => {   
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    })
  })

  describe("getOneeee", ()=>{
    it("should return a movie", ()=>{

    service.create({
      title:'Test Movie',
      genres: ['test'],
      year: 2000,
    });
    
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    })
    it("should throw 404 error", ()=>{
      try{
        service.getOne(999)
      }catch(e){      
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual("Movie with Id 999 not found.")
      }
    });

  })

  describe("deleteone", ()=>{
    it("deletes a movie", ()=>{
      service.create({
        title:'Test Movie',
        genres: ['test'],
        year: 2000,
      });
    const beforeDelete = service.getAll();
    service.deleteOne(1);
    const afterDelete = service.getAll();

    expect(afterDelete.length).toEqual(beforeDelete.length-1);
    });
    it("should return a 404", ()=>{
      try{
        service.deleteOne(999);
      }catch(e){
        expect(e).toBeInstanceOf(NotFoundException);
      }
    })
  })
});
