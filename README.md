
# 🎅 **Secret Santa Discord Bot** 🎄 #

A Discord bot for organising and managing a fun Secret Santa event in your Discord server!

## ✨ Features ##

```text
🎄  Join the Event: Users can join by typing "#join", sending a 🎅, 🧑‍🎄 or 🧝 emoji.
🎄  Automatic Pairing: Admins can use a command to randomly assign participants their Secret Santa pair.
🎄  Private Notifications: Participants receive their assignments via direct message.
🎄  Customisable Deadline: Admins can set a deadline for sending gifts, and reminders are sent as the deadline approaches.🎄    Error Handling: Notifies admins if a participant's DM could not be sent.
```

## 🚀 Getting Started ##

## Step One ##

Clone the Repository

```bash
git clone https://github.com/your-username/secret-santa-bot.git
cd secret-santa-bot
```

## Step Two ##

Install Dependencies: Ensure you have Node.js installed, then run:

```bash
npm install
```

## Step Three ##

Set Up Environment Variables: Create a .env file in the project root with the following content:

```text
DISCORD_TOKEN=your-discord-bot-token
CHANNEL_ID=your-channel-id
```

## Step Four ##

Start the bot using:

```bash
node src/index.js
```

## 🛠 Commands ##

**User Commands**
Join the Event:
Type "#join", send a 🎅, 🧑‍🎄 or 🧝 emoji.
View Details: Check the pinned message in the designated channel.

**Admin Commands**
Set Deadline:
\#setDeadline YYYY-MM-DD HH:mm
Sets the deadline for sending gifts. Example:
\#setDeadline 2024-12-15 18:00

Draw Pairs:
\#draw
Randomly assigns Secret Santa pairs and sends DMs to participants.

## 🛡️ Error Handling ##

If a participant's DMs are disabled, the bot notifies them in the server and logs an error.
Ensure participants enable DMs to receive their pair assignments.
