module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'teams',
      [
        {
          team_name: 'América-MG',
        },
        {
          team_name: 'Athletico-PR',
        },
        {
          team_name: 'Botafogo',
        },
        {
          team_name: 'Corinthians',
        },
        {
          team_name: 'Cruzeiro',
        },
        {
          team_name: 'Coritiba',
        },
        {
          team_name: 'Flamengo',
        },
        {
          team_name: 'Grêmio',
        },
        {
          team_name: 'Internacional',
        },
        {
          team_name: 'Cuiabá',
        },
        {
          team_name: 'Fortaleza',
        },
        {
          team_name: 'Palmeiras',
        },
        {
          team_name: 'Goiás',
        },
        {
          team_name: 'Santos',
        },
        {
          team_name: 'Bragantino',
        },
        {
          team_name: 'São Paulo',
        },
      ],
      {},
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('teams', null, {});
  },
};
