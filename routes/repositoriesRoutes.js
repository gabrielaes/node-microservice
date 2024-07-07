import express from 'express';
import { getRepositories, getRepositoryByName, getRepositoryById } from '../models/repositoryModel.js';
import fetch from 'node-fetch';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const repositories = await getRepositories();
    res.status(200).send(repositories);
  } catch (error) {
    res.status(400).send({ error: 'An error occurred while fetching repositories.' });
  }
});

router.get('/repository', async (req, res) => {
  try {
    const repositoryName = req.query.name;
    let repository = await getRepositoryByName(repositoryName);

    if (repository === null) {
      const response = await fetch(`http://localhost:5000/repository/${repositoryName}`)
      if (response.ok) {
        repository = await response.json();
      }
    }

    if (repository === null) {
      res.status(404).send({});  
    }
    else {
      res.status(200).send(repository);
    }
  } catch (error) {
    res.status(400).send({ error: 'An error occurred while fetching repository by name.' });
  }
});

router.get('/repository/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const repository = await getRepositoryById(id);
    res.status(200).send(repository);
  } catch (error) {
    res.status(400).send({ error: 'An error occurred while fetching repository by Id.' });
  }
});

export {router};
