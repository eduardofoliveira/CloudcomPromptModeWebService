const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authConfig = require('../../config/auth')

module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define(
    'Usuario',
    {
      nome: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [5, 255],
            msg: 'O campo nome deve conter entre 5 a 255 caracteres'
          }
        }
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: {
            msg: 'Necessário um e-mail válido'
          }
        }
      },
      password: DataTypes.VIRTUAL,
      password_hash: DataTypes.STRING
    },
    {
      hooks: {
        beforeSave: async user => {
          if (user.password) {
            user.password_hash = await bcrypt.hash(user.password, 12)
          }
        }
      }
    }
  )

  Usuario.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password_hash)
  }

  Usuario.prototype.generateToken = function ({ id }) {
    return jwt.sign({ id }, authConfig.secret, {
      expiresIn: authConfig.ttl
    })
  }

  return Usuario
}
