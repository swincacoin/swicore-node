Swicore Node
============

A Swi full node for building applications and services with Node.js. A node is extensible and can be configured to run additional services. At the minimum a node has an interface to [Swi Core (swid) v0.12.1.x](https://github.com/swipay/swi/tree/v0.12.1.x) for more advanced address queries. Additional services can be enabled to make a node more useful such as exposing new APIs, running a block explorer and wallet service.

## Usages

### As a standalone server

```bash
git clone https://github.com/swincacoin/swicore-node
cd swicore-node
./bin/swicore-node start
```

When running the start command, it will seek for a .swicore folder with a swicore-node.json conf file.
If it doesn't exist, it will create it, with basic task to connect to swid.

Some plugins are available :

- Insight-API : `./bin/swicore-node addservice @swincacoin/insight-api
- Insight-UI : `./bin/swicore-node addservice @swincacoin/insight-ui`

You also might want to add these index to your swi.conf file :
```
-addressindex
-timestampindex
-spentindex
```

### As a library

```bash
npm install @swincacoin/swicore-node
```

```javascript
const swicore = require('@swincacoin/swicore-node');
const config = require('./swicore-node.json');

let node = swicore.scaffold.start({ path: "", config: config });
node.on('ready', function() {
    //Swi core started
    swid.on('tx', function(txData) {
        let tx = new swicore.lib.Transaction(txData);
    });
});
```

## Prerequisites

- Swi Core (swid) (v1.0.0) with support for additional indexing *(see above)*
- Node.js v0.10, v0.12, v4 or v5
- ZeroMQ *(libzmq3-dev for Ubuntu/Debian or zeromq on OSX)*
- ~20GB of disk storage
- ~1GB of RAM

## Configuration

Swicore includes a Command Line Interface (CLI) for managing, configuring and interfacing with your Swicore Node.

```bash
swicore-node create -d <swi-data-dir> mynode
cd mynode
swicore-node install <service>
swicore-node install https://github.com/yourname/helloworld
swicore-node start
```

This will create a directory with configuration files for your node and install the necessary dependencies.

Please note that [Swi Core](https://github.com/swipay/swi/tree/master) needs to be installed first.

For more information about (and developing) services, please see the [Service Documentation](docs/services.md).

## Add-on Services

There are several add-on services available to extend the functionality of Bitcore:

- [Insight API](https://github.com/swincacoin/insight-api/tree/master)
- [Insight UI](https://github.com/swincacoin/insight-ui/tree/master)
- [Bitcore Wallet Service](WiP)

## Documentation

- [Upgrade Notes](docs/upgrade.md)
- [Services](docs/services.md)
  - [Swid](docs/services/swid.md) - Interface to Swi Core
  - [Web](docs/services/web.md) - Creates an express application over which services can expose their web/API content
- [Development Environment](docs/development.md) - Guide for setting up a development environment
- [Node](docs/node.md) - Details on the node constructor
- [Bus](docs/bus.md) - Overview of the event bus constructor
- [Release Process](docs/release.md) - Information about verifying a release and the release process.


## Setting up dev environment (with Insight)

Prerequisite : Having a swid node already runing `swid --daemon`.

Swicore-node : `git clone https://github.com/swincacoin/swicore-node -b develop`
Insight-api (optional) : `git clone https://github.com/swincacoin/insight-api -b develop`
Insight-UI (optional) : `git clone https://github.com/swincacoin/insight-ui -b develop`

Install them :
```
cd swicore-node && npm install \
 && cd ../insight-ui && npm install \
 && cd ../insight-api && npm install && cd ..
```

Symbolic linking in parent folder :
```
npm link ../insight-api
npm link ../insight-ui
```

Start with `./bin/swicore-node start` to first generate a ~/.swicore/swicore-node.json file.
Append this file with `"@swincacoin/insight-ui"` and `"@swincacoin/insight-api"` in the services array.

## Contributing

Please send pull requests for bug fixes, code optimization, and ideas for improvement. For more information on how to contribute, please refer to our [CONTRIBUTING](https://github.com/swincacoin/swicore/blob/master/CONTRIBUTING.md) file.

## License

Code released under [the MIT license](https://github.com/swincacoin/swicore-node/blob/master/LICENSE).

Copyright 2013-2015 BitPay, Inc.

- bitcoin: Copyright (c) 2009-2015 Bitcoin Core Developers (MIT License)
