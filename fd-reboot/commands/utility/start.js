const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { spawn } = require('child_process');
const config = require('../../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('서버온')
		.setDescription('서버온')
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
	async execute(interaction) {
		const bat = await spawn('cmd.exe', ['/c',config.서버실행파일], { detached: true });

		bat.stdout.on('data', (data) => {
		  console.log('data is : '+data.toString());
		});
	
		bat.stderr.on('data', (data) => {
		  console.error('error is : '+data.toString());
		});
	
		bat.on('exit', (code) => {
		  console.log(`Child exited with code ${code}`);
		});
	},
};