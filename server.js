import express from 'express';
import fs from 'fs/promises'

const app = express();
const port = 3000;
const menuFile = './menu.json';

app.use(express.json());

app.get('/menu', async (req, res) => {

    const menu = await getMenu();
    console.log(menu);
    res.json(menu);

});
app.post('/menu', async (req, res) => {
    const menu = await getMenu();
    if(menu){
        const comida = req.body;
        if(!comida.nombre || !comida.precio){
            res.status(400).send('Error, faltan datos');
        }else{
            menu.almuerzos.push(comida);
            await fs.writeFile(menuFile, JSON.stringify(menu));
            res.json(menu);
        } 
    }else{
        res.status(500).send('Error al leer el archivo');
    }
    
});

async function getMenu() {
    try {
        const data = await fs.readFile(menuFile, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.log(error);
    }
}

app.listen(port, () => {
    console.log(`servidor corriendo en puerto ${port}`);
});