'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    const tables = {};

    tables.Posts = {
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true
      },
      content: {
        type: Sequelize.STRING(10000),
        allowNull: true
      },
      type: {
        type: Sequelize.STRING
      }
    };

    let newTables = Object.keys(tables).map(table => queryInterface.createTable(table, tables[table]));

    return Promise.all(newTables);
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropAllTables().catch(explode);
  }
};

function explode(err) {
  if (err) { throw err; }
}
