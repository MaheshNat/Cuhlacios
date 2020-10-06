const DD = require('../models/dd.js');
const mongoose = require('mongoose');
const discord = require('discord.js');

module.exports = {
  name: 'dd',
  description: `add -> adds a dd to the list of current dds. Usage: ${process.env.PREFIX}dd add company=<ticker> price=<price(s)> strategy=<option strategy (c, p, sc, sp, cds, ccs, pds, pcs)> exp=<expiry date>
  get -> retrieves the list of current dds.
  remove -> removes a particular dd from the list of current dds. Usage: ${process.env.PREFIX}dd remove <id>`,
  execute(message, args) {
    switch (args[1]) {
      case 'add':
        let dd = getDD(args);

        if (dd.ticker == null)
          return message.reply(
            'You need to specify the ticker which belongs to this dd.'
          );
        if (dd.price == null)
          return message.reply('You need to specify the price of this dd.');

        if (dd.type == null)
          return message.reply(
            'You need to specify strategy of this dd (c, p, sc, sp, cds, ccs, pds, pcs)'
          );
        if (dd.expirationDate == null)
          return message.reply(
            'You need to specify an expiration date for this dd.'
          );

        dd.save()
          .then(result => console.log(result))
          .catch(err => console.log(err));

        message.reply(
          `Your dd '${dd.ticker} ${
            dd.price + (dd.price2 ? '/' + dd.price2 : '')
          }${
            dd.type
          } ${dd.expirationDate.toLocaleDateString()}' has been successfully added. Type "${
            process.env.PREFIX
          }dd get" to view current dds.`
        );
        break;
      case 'get':
        DD.find({}, (err, dds) => {
          if (err) console.log(err);
          if (dds.length === 0) message.reply('No dds were found.');
          else {
            let embed = new discord.MessageEmbed()
              .setColor('#03cffc')
              .setTitle('Current DDs')
              .addFields({
                name: 'dds',
                value: dds
                  .map(
                    dd =>
                      `${dd.ticker} ${
                        dd.price + (dd.price2 ? '/' + dd.price2 : '')
                      }${
                        dd.type
                      } ${dd.expirationDate.toLocaleDateString()}, id: ${
                        dd._id
                      }`
                  )
                  .join('\n')
              });
            message.channel.send(embed);
          }
        });
        break;
      case 'remove':
        DD.findByIdAndDelete(args[2], err => {
          if (err) console.log(err);
          else message.reply('Successfully deleted dds.');
        });
        break;
      case 'edit':
      // let updateParams = getAssignment(args);

      // if (!updateParams._id) {
      //   message.reply('You need to specify an assignment id to edit.');
      //   return;
      // }

      // Assignment.findById(updateParams._id, (err, assignment) => {
      //   if (err) console.log(err);
      //   else
      //     assignment.answers.forEach(answer =>
      //       updateParams.answers.push(answer)
      //     );
      //   console.log('just appended old answers: ' + updateParams);
      // }).then(something => {
      //   for (let arg of args) {
      //     if (arg.split('=')[0] === 'remove') {
      //       updateParams.answers.pop(parseInt(arg.split('=')[1]) - 1);
      //     }
      //   }

      //   if (args.includes('append')) {
      //     message.attachments.forEach(attachment =>
      //       updateParams.answers.push(attachment.url)
      //     );
      //   } else if (args.includes('replace')) {
      //     updateParams.answers = [];
      //     message.attachments.forEach(attachment =>
      //       updateParams.answers.push(attachment.url)
      //     );
      //   }

      //   console.log('final update params: ' + updateParams);

      //   Assignment.findByIdAndUpdate(
      //     updateParams._id,
      //     updateParams,
      //     (err, assignment) => {
      //       if (err) console.log(err);
      //       else
      //         message.reply(
      //           `Successfully updated assignment ${assignment.name}`
      //         );
      //     }
      //   );
      // });
    }
  }
};

function getDD(args) {
  let dd = new DD();
  dd._id = mongoose.Types.ObjectId();
  for (let arg of args.slice(2, args.length)) {
    switch (arg.split('=')[0]) {
      case 'id':
        dd._id = arg.split('=')[1];
        break;
      case 'company':
        dd.ticker = arg.split('=')[1];
        break;
      case 'price':
        let prices = arg.split('=')[1].split('/');
        if (prices.length === 2) {
          dd.price = Number.parseInt(prices[0]);
          dd.price2 = Number.parseInt(prices[1]);
        } else dd.price = Number.parseInt(arg.split('=')[1]);
        break;
      case 'strategy':
        dd.type = arg.split('=')[1];
        break;
      case 'exp':
        dd.expirationDate = new Date(
          arg.split('=')[1].split('/')[2],
          arg.split('=')[1].split('/')[0],
          arg.split('=')[1].split('/')[1]
        );
        break;
    }
  }
  return dd;
}
