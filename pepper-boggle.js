class BOGGLE {

  constructor(options) {
    
    if (!options.stopCommand) throw new TypeError('Missing argument: stopCommand')
    if (typeof options.stopCommand !== 'string') throw new TypeError('stopCommand Must be a string')
    if (!options.message) throw new TypeError('Missing argument: message')

    this.message = options.message;
    this.stopCommand = options.stopCommand

  }
  async start() {
    const boggle = require('pf-boggle')
    const board = boggle.generate(5)
    const solution = boggle.solve(board)
    var score = 0;
    const scoreMsg = await this.message.channel.send("Beep! This game is still under construction!"); 
    for (var i=0;i<200;i++){
    console.log('Solution First Word : '+solution[i].word)
    }
    

    this.message.channel.send('Welcome to Boggle Game!! Here are your Random Letters!\n\n**' + board[0] + ' ' + board[1] + ' ' + board[2] + ' ' + board[3] + ' ' + board[4] + '\n' + board[5] + ' ' + board[6] + ' ' + board[7] + ' ' + board[8] + ' ' + board[9] + '\n' + board[10] + ' ' + board[11] + ' ' + board[12] + ' ' + board[13] + ' ' + board[14] + '\n' + board[15] + ' ' + board[16] + ' ' + board[17] + ' ' + board[18] + ' ' + board[19] + '\n' + board[20] + ' ' + board[21] + ' ' + board[22] + ' ' + board[23] + ' ' + board[24] + '**')


    const gameFilter = m => m.author.id
    const gameCollector = this.message.channel.createMessageCollector(gameFilter);

    gameCollector.on('collect', async msg => {
      if (msg.author.bot) return
      const selection = msg.content;
      
      for (var i=0;i<200;i++){
      if (selection === solution[i].word.toLowerCase()) {
        
        score += 1;
        console.log(score)
        scoreMsg.edit("**Score : **"+ score);
        if (score == 20) {
          gameCollector.stop(); 
          return this.message.channel.send('You scored 20! Wow!!')
          }
      }
      }
      if (selection === this.stopCommand) {
        this.message.channel.send(wrong)
        gameCollector.stop();
      } 
    })

  }
}

module.exports = BOGGLE;
