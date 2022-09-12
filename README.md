# [Liantichess](https://liantichess.herokuapp.com)

[![Nodejs-CI](https://github.com/SriMethan/liantichess/actions/workflows/nodejs.yml/badge.svg)](https://github.com/SriMethan/liantichess/actions/workflows/nodejs.yml)
[![Liantichess](https://img.shields.io/badge/Liantichess-%40players-blue.svg)](https://liantichess.herokuapp.com/players)

![Liantichess lobby](liantichess-lobby.png)

li[chess ]antichess is a free, open-source antichess server derived from [pychess-variants](https://github.com/gbtami/pychess-variants).

All supported games on Liantichess can be found [here](https://liantichess.herokuapp.com/variants/antichess).

For move generation, validation, analysis and engine play it uses
- [Fairy-Stockfish](https://github.com/ianfab/Fairy-Stockfish)
- [fairy-stockfish.wasm](https://github.com/fairy-stockfish/fairy-stockfish.wasm)
- [TheYoBots/fairyfishnet](https://github.com/theyobots/fairyfishnet) fork of [gbtami/fairyfishnet](https://github.com/gbtami/fairyfishnet)

On client side it is based on [chessgroundx](https://github.com/gbtami/chessgroundx) fork of [chessground](https://github.com/ornicar/chessground)

For managing titles it uses
- [Liantichesstitles](https://github.com/SriMethan/liantichesstitles)

##

As you know, liantichess is a free server and it will remain free forever. However, maintaining and improving the server costs time and money.

If you like our work and find our server useful, please donate through [patreon](https://www.patreon.com/SriMethan)!!
Your contribution will be greatly appreciated and help me continue to develop this awesome server.

## Installation

### Prerequisites
* You need mongodb up and running. [Mongo daemon](https://www.mongodb.com/docs/manual/installation/)


### Project setup
```
pip3 install -r requirements.txt --user // Install python requirements
yarn install                            // Install node requirements
yarn dev                                // Compile typescript files to javascript
yarn md                                 // Compile md files to html
```

### Start server
```
python3 server/server.py
```

The Wiki further describes [how to setup a development environment](https://github.com/SriMethan/Liantichess/wiki/Setting-up-a-Liantichess-Development-environment-locally).

## Supported browsers

Liantichess should support almost all browsers. Though older browsers (including any version of Internet Explorer) will not work. For your own sake, please upgrade. Security and performance, think about it!

Only [Fairy-Stockfish analysis](https://liantichess.herokuapp.com/analysis/antichess) might not work on all browsers.

## Credits

Credits to [gbtami](https://github.com/gbtami) for the main [code](https://github.com/gbtami/pychess-variants)