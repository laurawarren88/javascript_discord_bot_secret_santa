
# 🎅 **Secret Santa Discord Bot 2025** 🎄

A feature-rich Discord bot for organising and managing Secret Santa events in your Discord server!

## ✨ Features

🎄 **Easy Joining**: Users can join by typing `#join` or sending Christmas emojis (🎅, 🧑‍🎄, 🧝)  
🎄 **Smart Pairing**: Improved algorithm ensures fair random pairing with validation  
🎄 **Private Notifications**: Enhanced DM system with better error handling  
🎄 **Deadline Management**: Set deadlines with automatic reminders  
🎄 **Admin Tools**: List participants, reset events, view status  
🎄 **Help System**: Built-in help command with all available options  
🎄 **Robust Error Handling**: Better validation and user feedback

## 🚀 Getting Started

## Step One

Clone the Repository

```bash
git clone https://github.com/your-username/secret-santa-bot.git
cd secret-santa-bot
```

## Step Two

Install Dependencies: Ensure you have Node.js installed, then run:

```bash
npm install
```

## Step Three

Set Up Environment Variables: Create a .env file in the project root with the following content:

```text
DISCORD_TOKEN=your-discord-bot-token
CHANNEL_ID=your-channel-id
```

## Step Four

Start the bot using:

```bash
node src/index.js
```

## 🛠 Commands

### 👥 User Commands

- `#join` - Join the Secret Santa event
- `#help` - Show all available commands
- 🎅 🧑‍🎄 🧝 - Join by sending Christmas emojis

### 👑 Admin Commands

- `#draw` - Draw and assign Secret Santa pairs
- `#list` - View all current participants
- `#reset` - Reset all participants (with confirmation)
- `#status` - Show current event status and deadline

### 📝 Examples

``` text
#draw
#status
#list
```

## 🛡️ Error Handling

If a participant's DMs are disabled, the bot notifies them in the server and logs an error.
Ensure participants enable DMs to receive their pair assignments.
