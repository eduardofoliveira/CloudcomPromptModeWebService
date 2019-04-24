const { Usuario } = require('../models')

const auth = async (req, res) => {
  const { email, password } = req.body

  const user = await Usuario.findOne({ where: { email } })

  if (!user) {
    return res.status(404).json({ error: 'User not found' })
  }

  if (!(await user.validPassword(password))) {
    return res.status(401).json({ error: 'Invalid password' })
  }

  return res.json({
    user: {
      id: user.id,
      nome: user.nome,
      email: user.email,
      createdAt: user.createdAt
    },
    token: user.generateToken(user)
  })
}

module.exports = {
  auth
}
