import express from "express";
import FornecedorController from "../../Fornecedor/controllers/FornControllers.js";
import FornecedorModel from "../../Fornecedor/models/FornModel.js";
import Validador from "../../utils/Fornecedores/ValidaForn.js";

const fornecedorRouter = express.Router()

fornecedorRouter.post('/', async (req, res) => {
  try {
    if (Validador.checkRazao(req.body.razao_social))
    {
      try {
        if (Validador.checkTelefone(req.body.telefone)){
              const dados = req.body
              const fornecedor = new FornecedorModel(dados)
              await FornecedorController.adicionar(fornecedor)
              res.status(200).json({fornecedor}) } 
        else {
          throw new Error ("O fornecedor não pode ser inserido, insira razão social válida.")  } 
        } 
      catch (e){
        res.status(400).json({erro: e.message})
      }
      }
        else {
      throw new Error ('O fornecedor não pode ser inserido, insira um telefone válido.')
    }   
    } catch (e){
      res.status(400).json({erro: e.message})
    }
  });
 

fornecedorRouter.get('/:id_fornecedor', async (req, res) => {
  try {
    const fornecedor = await FornecedorController.listarUmItemPorId(req)
    if(fornecedor != null){
    res.status(200).json({fornecedor})
  } else{
    throw new Error ('ID do fornecedor não cadastro. Filtre por um ID válido')
  }
    } catch (e) {
      res.status(400).json({erro: e.message})
    }
});


fornecedorRouter.get('/', async (req, res) => {
  try {
      const fornecedor = await FornecedorController.listar()
      console.log(req.params)
      res.status(200).json({fornecedor})
      } catch (e) {
       res.status(400).json({erro: e.message})
      }
  });

fornecedorRouter.delete('/:id_fornecedor', async (req, res) => {
  try {
     const delet = await FornecedorController.deletar(req.params.id_fornecedor)
     const fornecedor = await FornecedorController.listar()
     res.status(200).json({fornecedor})
  } catch (e) {
    res.status(400).json({erro: e.message})
  }
});

fornecedorRouter.patch('/:id_fornecedor', async (req, res) => {
  try {
    console.log (req.params.id_fornecedor)
    const modif = await FornecedorController.update(req)
    const fornecedor = await FornecedorController.listar()
    res.status(200).json({fornecedor})

  } catch (e) {
    res.status(400).json({erro: e.message})
  }
});


export default fornecedorRouter;