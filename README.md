# crystalbot
A Minecraft Bot made using Mineflayer and Typescript that has a Crystal Aura.

## Features
Crystalbot has a lot of features. The main ones are the event and command handler which allows you to easily add events or commands to the bot. The bot already has pathfinder commands built in as well as other useful commands and events. 

Here is a full list of what features it has:
- Auto eat
- A crystal aura
- Event handler & Command handler
- Auto reconnect
- Auto totem
- A database called enmap (which uses sqlite3)
- Formatted logging
- Custom settings like bot owners and prefix and wether to run in *debugMode*
- Has an intergration for perspective api which lets you detect toxicity

The bot also has a setting called debugMode which logs debugEvents such as when mineflayer-pathfinder updates the path or other things    
There is also a setting to log when a player joins or leaves

## Installation

### Install typescript
First install typescript using npm if you haven't already.

```sh
npm install -g typescript
```

### Installing packages
Now run

```sh
npm install
```

to install all necessary Packages for this Bot.

### Running the bot
To run the bot use the npm run test command     
this will make the typescript code compile and be executed

```sh
npm run test
```
