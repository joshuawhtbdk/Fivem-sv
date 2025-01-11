const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { spawn, exec } = require('child_process');
const iconv = require('iconv-lite');
const config = require('../../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('리붓')
		.setDescription('서버 리붓하기')
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
	async execute(interaction) {

		const bat1 = await spawn('cmd.exe', ['/c', __dirname + '/../../cmdlist/kill.bat'], { detached: true });

		bat1.stdout.on('data', (data) => {
		  console.log('data is : '+ data.toString());
		});
	
		bat1.stderr.on('data', (data) => {
			data = iconv.decode(data, 'euc-kr');
		  console.error('error is : '+ data);
		});
	
		bat1.on('exit', async (code) => {
		  console.log(`Child exited with code ${code}`);
		  await interaction.reply('서버를 리붓합니다. 잠시만 기다려주세요...');
		});

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