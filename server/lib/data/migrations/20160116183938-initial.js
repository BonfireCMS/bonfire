'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    const tables = {};

    tables.Comments = {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAd: {
        type: Sequelize.DATE,
        allowNull: false
      },
      text: {
        type: Sequelize.STRING
      }
    };

    tables.Users = {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAd: {
        type: Sequelize.DATE,
        allowNull: false
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      }
    };

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
      name: {
        type: Sequelize.STRING,
        unique: true
      },
      type: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      route: {
        type: Sequelize.STRING
      }
    };

    tables.PostMeta = {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      key: {
        type: Sequelize.STRING
      },
      value: {
        type: Sequelize.STRING
      }
    };

    tables.Settings = {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      key: {
        type: Sequelize.STRING
      },
      value: {
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
