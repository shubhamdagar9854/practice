const express = require('express');

const app = express();

let projects = [
    {id: 1, name: "E-commerce Website"},
    {id: 2, name: "Task Management App"},
    {id: 3, name: "Weather Dashboard"}
];

app.get('/api/projects', (req, res) => {
    res.json({success: true, data: projects});
});

app.delete('/api/projects/:id', (req, res) => {
    const projectId = parseInt(req.params.id);
    const projectIndex = projects.findIndex(p => p.id === projectId);
    
    if (projectIndex === -1) {
        return res.status(404).json({success: false, message: "Project not found"});
    }
    
    const deletedProject = projects.splice(projectIndex, 1)[0];
    res.json({success: true, data: deletedProject});
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
