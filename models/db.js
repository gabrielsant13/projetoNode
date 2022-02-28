const Sequelize = require('sequelize')

//Conexao com o BD mysql
const sequelize = new Sequelize('projectnode', 'root', '',{
    host: 'localhost',
    dialect: 'mysql',
    query:{raw:true}
})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}