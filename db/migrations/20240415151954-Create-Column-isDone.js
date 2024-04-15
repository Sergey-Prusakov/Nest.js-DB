module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('tasks', 'isDone', {
      type: Sequelize.DataTypes.BOOLEAN,
      defaultValue: false,
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('tasks', 'isDone');
  },
};
