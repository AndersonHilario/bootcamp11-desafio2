const express = require("express");
const cors = require("cors");
const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  const repository = { id: uuid(), title, url, techs, likes: 0 };
  repositories.push(repository);
  response.status(200).json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;
  const index = repositories.findIndex(rep => rep.id === id);

  if(index < 0) {
    return response.status(400).json({ error: 'Repository not found'})
  } 

  const repository = repositories[index]; 
  repository.title = title;
  repository.url = url;
  repository.techs = techs;
  repositories[index] = repository;
  response.status(200).json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const index = repositories.findIndex(rep => rep.id === id);

  if(index < 0) {
    return response.status(400).json({ error: 'Repository not found'})
  } 

  repositories.splice(index, 1);
  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const index = repositories.findIndex(rep => rep.id === id);

  if(index < 0) {
    return response.status(400).json({ error: 'Repository not found'})
  } 

  const repository = repositories[index]; 
  repository.likes++;
  response.json(repository);
});

module.exports = app;
