// A version of Bridge of Death using `async` module
var net = require('net');
var async = require('async');

net.createServer(function (s) {
  s.setEncoding('utf-8');
  s.write('Stop.\nWho would cross the Bridge of Death must answer me\nthese questions three, ere the other side he see.\n');

  function ask(key, question) {
    return function (answers, cb) {
      if (typeof question === 'function') {
        question = question(answers);
      }
      s.write(question + '\n');
      s.once('data', function (answer) {
        answers[key] = answer;
        cb(null, answers);
      })      
    };
  }

  function extraQuestion(answers) {
    var name = answers.name;
    if (/Arthur/i.test(name)) {
      return 'What... is the air-speed velocity of unlaiden swallow?';
    } else if (/Robin/i.test(name)) {
      return 'What... is the capital of Assyria?';
    }
    return 'What... is your favourite colour?';
  }

  async.waterfall([
    function (cb) { cb(null, { name: '', quest: '', extra: '' }); },
    ask('name',  'What... is your name?'),
    ask('quest', 'What... is your quest?'),
    ask('extra', extraQuestion)
  ], function () {
    s.end('Go on. Off you go.\n');
  });
}).listen(1975);
