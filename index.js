require('dotenv').config(); // Add this line at the top to load environment variables

const puppeteer = require('puppeteer');
const axios = require('axios');

const url = 'https://status.riotgames.com/valorant?region=ap&locale=en_US';
const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL; // Replace with your actual Discord webhook URL

async function fetchDataAndSendToDiscord() {
    try {
        console.log('Fetching data from Riot Games...'); // Log message to indicate data fetching

        const browser = await puppeteer.launch({ headless: true, executablePath: '/usr/bin/chromium-browser' });
        const page = await browser.newPage();

        await page.goto(url, { waitUntil: 'domcontentloaded' });

        const noIssuesElement = await page.$('.MuiTypography-root.jss259.jss312.MuiTypography-body1');

        const inProgressItems = await page.$$eval('.MuiGrid-root.jss153.jss158.MuiGrid-container.MuiGrid-item.MuiGrid-align-items-xs-flex-start.MuiGrid-grid-xs-12', elements =>
            elements.map(element => {
                const status = element.querySelector('.MuiTypography-root.jss77.jss149.MuiTypography-body1').textContent.trim();
                const game = element.querySelector('.MuiTypography-root.MuiTypography-body2').textContent.trim();
                const title = element.querySelector('.jss154.jss159 .MuiTypography-body1').textContent.trim();
                const descriptionElement = element.querySelector('.MuiTypography-root.jss157.MuiTypography-body1');
                const description = descriptionElement ? descriptionElement.textContent.trim() : null;
                const posted = element.querySelector('.MuiTypography-root.MuiTypography-body2').textContent.trim();
                const platformsAffectedElement = element.querySelector('.MuiTypography-root.jss155.jss160.MuiTypography-body2');
                const platformsAffected = platformsAffectedElement ? platformsAffectedElement.textContent.trim() : null;
                const serverStatus = element.querySelector('.MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-12 p.MuiTypography-root.jss74.jss146.MuiTypography-body1');

                return {
                    status,
                    game,
                    title,
                    description,
                    posted,
                    platformsAffected,
                    serverStatus: serverStatus ? serverStatus.textContent.trim() : 'N/A'
                };
            })
        );

        // Customize the appearance of the Discord embed
        const discordEmbed = {
            title: 'VALORANT Service Status',
            color: noIssuesElement ? 0x2ecc71 : 0x3498db,
            fields: [],
            timestamp: new Date(),
            footer: {
                text: 'Automated Status Update',
                icon_url: 'https://imagedelivery.net/5MYSbk45M80qAwecrlKzdQ/8a1a495c-2598-44a1-89d9-ed4a61955200/preview',
            },
        };

        if (noIssuesElement) {
            discordEmbed.description = 'No issues reported. Servers are running smoothly.';
        } else {
            // Add fields for in-progress items
            inProgressItems.forEach(item => {
                discordEmbed.fields.push({
                    name: `**${item.title} - ${item.game}**`,
                    value:
                        `**Title:** ${item.serverStatus}
                        **Description:**
                        ${item.description}\n**Posted:** 
                    ${item.platformsAffected}\n**Server Status:** 
                    ${item.status}
                    `,
                });
            });
        }

        await axios.post(discordWebhookUrl, {
            embeds: [discordEmbed],
        }, { timeout: 5000 }); // Adjust the timeout value as needed

        // Close the browser
        await browser.close();
    } catch (error) {
        console.error(`Error: ${error}`);
    }
}



// Fetch data and send to Discord every 10 seconds
setInterval(fetchDataAndSendToDiscord, 180000);
