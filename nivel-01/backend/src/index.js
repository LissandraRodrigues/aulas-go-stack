// Chamando o express.
const express = require('express');

const cors = require('cors');

// Instaciando o express.
const app = express();

// Faz com que qualquer front-end consiga acessar o back-end.
app.use(cors());

// Permite que trabalhemos com JSON no request.body 
app.use(express.json());

// Vai substituir o banco de dados po enquanto.
const projects = [];

// Para criar um id único para cada projeto cadastrado.
const { v4: uuid, validate: isUuid } = require('uuid');

// Mostra o método e rotas da aplicação.
function logRequests(request, response, next) {

    const { method, url } = request;

    const logLabel = `[${method.toUpperCase()}] ${url}`;

    console.log(logLabel);

    console.time(logLabel);

    next(); // Chama o próximo middleware.

    console.timeEnd(logLabel);

}

function validateProjectId(request, response, next) {

    const { id } = request.params;

    if(!isUuid(id)) {

        return response.status(400).json({

            error: "Invalid project ID."

        })

    }

    return next();

}

app.use(logRequests);

// Aplicar o middleware em rotas específicas.
app.use('/projects/:id', validateProjectId)

app.get('/projects', (request, response) => {

    const { title } = request.query;

    // Se o usuário digitar algo, faz a primeira condição, se não, faz a segunda.
    const results = title 

        // O método includes verifica se o título procurado está inserido no projeto e retorna true ou false.
        ? projects.filter(project => project.title.includes(title))
        : projects;

    // Pega os parâmetros enviados.
    //const { title, name } = request.query;

    //console.log(title)

    return response.json(results);

});

app.post('/projects', (request, response) => {

    const { title, owner } = request.body;
    
    // Cria um novo projeto com id único e com as informações passadas.
    const project = { id: uuid(), title, owner };
    
    // Adiciona o novo projeto à lista de projetos.
    projects.push(project);

    // Retorna o projeto criado.
    return response.json(project)

});

app.put('/projects/:id',  (request, response) => {

    // Pega o id inserido.
    const { id } = request.params;

    const { title, owner } = request.body;

    // Pega a posição do id procurado no array projects.
    const projectIndex = projects.findIndex(

        // Procura o projeto que possui o mesmo id que o procurado.
        project => project.id == id

    );

    if(projectIndex < 0) {

        // O código 400 é um genérico que aconteceu no back-end.
        return response.status(400).json({ error: "Project not found" })

    }

    const project = {

        id,
        title,
        owner 

    };

    projects[projectIndex] = project;

    return response.json(project)


});

app.delete('/projects/:id',  (request, response) => {

    const { id } = request.params;

    // Pega a posição do id procurado no array projects.
    const projectIndex = projects.findIndex(

        // Procura o projeto que possui o mesmo id que o procurado.
        project => project.id == id

    );

    if(projectIndex < 0) {

        // O código 400 é um genérico que aconteceu no back-end.
        return response.status(400).json({ error: "Project not found" })

    }

    // splice remove do array. O 1 diz: a partir do indice indicado, apague um.
    projects.splice(projectIndex, 1);

    // Eu que quis fazer assim.
    return response.json(projects);

    // Ao retorna uma mensagem vazia, é recomendado enviar o código 204.
    // return response.status(204).send()

});

app.listen(3333, () => {

    console.log('🚀 Servidor rodando')

});