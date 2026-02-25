const express = require('express');

const app = express();
app.use(express.json());

let projects = [
    {id: 1, name: "E-commerce Website", description: "Full-stack platform"},
    {id: 2, name: "Task Management App", description: "Mobile task app"},
    {id: 3, name: "Weather Dashboard", description: "Weather tracking"}
];

// GET - Get all projects
app.get('/api/projects', (req, res) => {
    res.json({success: true, data: projects});
});

// GET - Get single project by ID
app.get('/api/projects/:id', (req, res) => {
    const project = projects.find(p => p.id === parseInt(req.params.id));
    if (!project) {
        return res.status(404).json({success: false, message: "Project not found"});
    }
    res.json({success: true, data: project});
});

// POST - Create new project
app.post('/api/projects', (req, res) => {
    const {name, description} = req.body;
    if (!name) {
        return res.status(400).json({success: false, message: "Name is required"});
    }
    
    const newProject = {
        id: projects.length + 1,
        name,
        description: description || ""
    };
    
    projects.push(newProject);
    res.status(201).json({success: true, data: newProject});
});

// PUT - Update entire project
app.put('/api/projects/:id', (req, res) => {
    const projectIndex = projects.findIndex(p => p.id === parseInt(req.params.id));
    if (projectIndex === -1) {
        return res.status(404).json({success: false, message: "Project not found"});
    }
    
    const {name, description} = req.body;
    if (!name) {
        return res.status(400).json({success: false, message: "Name is required"});
    }
    
    projects[projectIndex] = {id: parseInt(req.params.id), name, description};
    res.json({success: true, data: projects[projectIndex]});
});

// PATCH - Partial update project
app.patch('/api/projects/:id', (req, res) => {
    const projectIndex = projects.findIndex(p => p.id === parseInt(req.params.id));
    if (projectIndex === -1) {
        return res.status(404).json({success: false, message: "Project not found"});
    }
    
    const {name, description} = req.body;
    if (name) projects[projectIndex].name = name;
    if (description !== undefined) projects[projectIndex].description = description;
    
    res.json({success: true, data: projects[projectIndex]});
});

// DELETE - Delete project
app.delete('/api/projects/:id', (req, res) => {
    const projectIndex = projects.findIndex(p => p.id === parseInt(req.params.id));
    if (projectIndex === -1) {
        return res.status(404).json({success: false, message: "Project not found"});
    }
    
    const deletedProject = projects.splice(projectIndex, 1)[0];
    res.json({success: true, data: deletedProject});
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
