const { Usuario } = require('../models')

const list = async (req, res) => {
  const usuarios = await Usuario.findAll({
    attributes: { exclude: ['password_hash', 'updatedAt'] }
  })
  res.json(usuarios)
}

const save = async (req, res) => {
  try {
    const { id, nome, email, createdAt } = await Usuario.create(req.body)

    res.statusCode = 201
    res.json({ id, nome, email, createdAt })
  } catch (error) {
    res.statusCode = 500
    res.json(error)
  }
}

const update = async (req, res) => {
  const { nome, email } = req.body
  const { id } = req.params

  try {
    let usuario = await Usuario.findOne({
      where: { id }
    })

    if (usuario) {
      usuario = await Usuario.update({ nome, email }, { where: { id } })
      res.statusCode = 202
      res.json({
        status: 'usuário alterado com sucesso'
      })
    } else {
      res.statusCode = 404
      res.json({
        status: 'usuário não encontrado'
      })
    }
  } catch (error) {
    res.statusCode = 500
    res.json(error)
  }
}

const remove = async (req, res) => {
  try {
    const { id } = req.params
    const quantidade = await Usuario.destroy({ where: { id } })

    if (quantidade === 1) {
      res.statusCode = 202
      res.json({
        status: 'usuário deletado'
      })
    } else {
      res.statusCode = 404
      res.json({
        status: 'usuário não encontrado'
      })
    }
  } catch (error) {
    res.statusCode = 500
    res.json({
      status: 'Erro ao deletar usuário',
      error
    })
  }
}

module.exports = {
  list,
  save,
  update,
  remove
}
