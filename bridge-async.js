// A version of Bridge of Death using `async` module
var net = require('net');
var async = require('async');

net.createServer(function (s) {
  s.setEncoding('utf-8');
  s.write('Stop.\nWho would cross the Bridge of Death must answer me\nthese questions three, ere the other side he see.\n');

  function ask(key, question) {
    return function (answers, cb) {
      s.write(question + '\n');
      s.once('data', function (answer) {
        answers[key] = answer;
        cb(null, answers);
      })      
    };
  }

  function extraQuestion(answers, cb) {
    var name = answers.name;
    var question = 'What... is your favourite colour?';
    if (/Arthur/i.test(name)) {
      question = 'What... is the air-speed velocity of unlaiden swallow?';
    } else if (/Robin/i.test(name)) {
      question = 'What... is the capital of Assyria?';
    }
    ask('extra', question)(answers, cb);
  };

  async.waterfall([
    function (cb) { cb(null, { name: '', quest: '', extra: '' }); },
    ask('name',  'What... is your name?'),
    ask('quest', 'What... is your quest?'),
    extraQuestion
  ], function (err, answers) {
    s.end('Go on. Off you go.\n');
  });
}).listen(1975);
