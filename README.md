[![VALORANT Status Discord Bot](https://imagedelivery.net/5MYSbk45M80qAwecrlKzdQ/8a1a495c-2598-44a1-89d9-ed4a61955200/preview)](https://github.com/Zinedinarnaut/Valorant-Status-Checker)

**VALORANT Status Discord Bot**

---

## Overview

This project is a Discord bot that fetches and provides automated status updates for VALORANT service status. The bot uses Puppeteer for web scraping to extract the latest information from the official VALORANT service status page and sends updates to a designated Discord channel.

## Features

- Retrieves real-time service status for VALORANT.
- Sends automated updates to a specified Discord channel.
- Customizable embed appearance for easy readability.

## Getting Started

### Prerequisites

- Node.js installed
- Discord account and a Discord server where you have the permission to add bots
- Discord webhook URL for posting updates (create a webhook in your Discord server)

### Installation

1. Clone the repository:

```bash
   git clone https://github.com/your-username/valorant-status-bot.git
```

### Navigate to the project directory:

```bash
cd valorant-status-bot
```

### Install dependencies:

```bash
npm install
```
### Configuration
Open index.js:

```javascript

const discordWebhookUrl = 'YOUR_DISCORD_WEBHOOK_URL';
Replace 'YOUR_DISCORD_WEBHOOK_URL' with the actual Discord webhook URL.
```

# Usage
Run the bot:

```bash
node index.js
The bot will start fetching data from the VALORANT service status page and posting updates to the specified Discord channel.
```

### Customization
You can customize the appearance of the Discord embed in the discordEmbed object in index.js.
Adjust scraping selectors in the $$eval function to match changes in the VALORANT service status page.
Contributing
Feel free to contribute to the project by opening issues or creating pull requests. Your contributions are highly appreciated!

License
This project is licensed under the GNU General Public License v3.0 - see the LICENSE.md file for details.
