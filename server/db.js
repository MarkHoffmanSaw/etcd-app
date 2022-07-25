const { Etcd3 } = require("etcd3");

const client = new Etcd3({
  hosts: process.env.DB_HOSTNAME,
});

module.exports = client;
