const Assignment = require('../models/assignment.js');
const mongoose = require('mongoose');
const discord = require('discord.js');

module.exports = {
  name: 'hwNew',
  description: 'Temporary hw test command (do not use) with mongodb',
  execute(message, args) {
    switch (args[1]) {
      case 'add':
        let assignment = getAssignment(args);

        if (assignment.teacher == null) {
          message.reply(
            'You need to specify the teacher which assigned this assignment.'
          );
          return;
        }
        if (assignment.due == null) {
          message.reply(
            'You need to specify the date when this assignment is due'
          );
          return;
        }
        if (assignment.name == null) {
          message.reply('You need to specify the name of this assignment');
          return;
        }

        message.attachments
          .array()
          .forEach(attachment => assignment.answers.push(attachment.url));

        assignment
          .save()
          .then(result => console.log(result))
          .catch(err => console.log(err));

        message.reply(
          `Your assignment '${assignment.name}' has been successfully added. Type "!hw get" to view current assignments.`
        );
        break;
      case 'get':
        let assignment1 = getAssignment(args);
        let queryParams = {};

        if (assignment1.name) queryParams.name = assignment1.name;
        if (assignment1.teacher) queryParams.teacher = assignment1.teacher;
        if (assignment1.due) queryParams.due = assignment1.due;
        if (assignment1.completion)
          queryParams.completion = assignment1.completion;
        if (assignment1.gradeType)
          queryParams.gradeType = assignment1.gradeType;

        Assignment.find(queryParams, (err, assignments) => {
          if (err) console.log(err);
          if (assignments.length === 0)
            message.reply('No assignments were found.');
          else {
            assignments.forEach(assignment => {
              let embed = new discord.MessageEmbed()
                .setColor('#03cffc')
                .setTitle(assignment.name)
                .addFields(
                  { name: 'Teacher', value: assignment.teacher },
                  {
                    name: 'Due Date',
                    value: assignment.due
                  },
                  {
                    name: 'ID',
                    value: assignment._id
                  }
                );

              if (assignment.answers != null) {
                embed.attachFiles(assignment.answers);
              }

              if (assignment.gradeType != null) {
                embed.addField('Grade Type', assignment.gradeType);
              }

              if (assignment.assigned != null) {
                embed.addField('Date Assigned', assignment.assigned.toString());
              }
              if (assignment.completion) embed.addField('Completion', 'Yes');
              else embed.addField('Completion', 'No');
              message.channel.send(embed);
            });
          }
        });
        break;
      case 'remove':
        let assignment2 = getAssignment(args);
        let queryParams1 = {};

        if (assignment2.name) queryParams1.name = assignment2.name;
        if (assignment2.teacher) queryParams1.teacher = assignment2.teacher;
        if (assignment2.due) queryParams1.due = assignment2.due;
        if (assignment2.completion)
          queryParams1.completion = assignment2.completion;
        if (assignment2.gradeType)
          queryParams1.gradeType = assignment2.gradeType;

        Assignment.deleteMany(queryParams1, err => {
          if (err) console.log(err);
          else message.reply('Successfully deleted assignments.');
        });
        break;
      case 'edit':
        let updateParams = getAssignment(args);

        if (!updateParams._id) {
          message.reply('You need to specify an assignment id to edit.');
          return;
        }

        Assignment.findById(updateParams._id, (err, assignment) => {
          if (err) console.log(err);
          else
            assignment.answers.forEach(answer =>
              updateParams.answers.push(answer)
            );
          console.log('just appended old answers: ' + updateParams);
        }).then(something => {
          for (let arg of args) {
            if (arg.split('=')[0] === 'remove') {
              updateParams.answers.pop(parseInt(arg.split('=')[1]) - 1);
            }
          }

          if (args.includes('append')) {
            message.attachments.forEach(attachment =>
              updateParams.answers.push(attachment.url)
            );
          } else if (args.includes('replace')) {
            updateParams.answers = [];
            message.attachments.forEach(attachment =>
              updateParams.answers.push(attachment.url)
            );
          }

          console.log('final update params: ' + updateParams);

          Assignment.findByIdAndUpdate(
            updateParams._id,
            updateParams,
            (err, assignment) => {
              if (err) console.log(err);
              else
                message.reply(
                  `Successfully updated assignment ${assignment.name}`
                );
            }
          );
        });
    }
  }
};

function getAssignment(args) {
  let assignment = new Assignment();
  assignment._id = mongoose.Types.ObjectId();
  for (let arg of args.slice(2, args.length)) {
    switch (arg.split('=')[0]) {
      case 'id':
        assignment._id = arg.split('=')[1];
        break;
      case 'teacher':
        assignment.teacher = arg.split('=')[1];
        break;
      case 'assigned':
        assignment.assigned = arg.split('=')[1];
        break;
      case 'due':
        assignment.due = arg.split('=')[1];
        break;
      case 'name':
        assignment.name = arg.split('=')[1];
        break;
      case 'completion':
        assignment.completion = arg.split('=')[1] === 'true';
        break;
      case 'grade':
        switch (arg.split('=')[1]) {
          case 'project':
            assignment.gradeType = 'Project';
            break;
          case 'test':
            assignment.gradeType = 'Test';
            break;
          case 'cwhw':
            assignment.gradeType = 'Classwork / Homework';
            break;
          case 'six-weeks-test':
            assignment.gradeType = 'Six-Weeks Test';
            break;
        }
        break;
    }
  }
  return assignment;
}
