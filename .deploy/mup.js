module.exports = {
  servers: {
    one: {
      host: '45.55.51.163',
      username: 'root',
      password: 'nakenakenake'
      // pem:
      // password:
      // or leave blank for authenticate from ssh-agent
    }
  },

  meteor: {
    name: 'physmodo',
    path: '../',
    servers: {
      one: {}
    },
    buildOptions: {/*
      serverOnly: true,*/
    },
    env: {
      ROOT_URL: '45.55.51.163',
      MONGO_URL: 'mongodb://localhost/meteor'
    },

    //dockerImage: 'kadirahq/meteord'
    deployCheckWaitTime: 60
  },

  mongo: {
    oplog: true,
    port: 27017,
    servers: {
      one: {},
    },
  },
};