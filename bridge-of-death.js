var net = require('net');

net.createServer(function (s) {
  s.setEncoding('utf-8');
  s.write('Stop.\nWho would cross the Bridge of Death must answer me\nthese questions three, ere the other side he see.\n');

  function ask(question, cb) {
    s.write(question + '\n');
    s.once('data', function (answer) {
      cb(answer);
    })
  }

  ask('What... is your name?', function (name) {
    ask('What... is your quest?', function (quest) {
      var question;
      if (/Arthur/i.test(name)) {
        question = 'What... is the air-speed velocity of unlaiden swallow?';
      } else if (/Robin/i.test(name)) {
        question = 'What... is the capital of Assyria?';
      } else {
        question = 'What... is your favourite colour?';
      }

      ask(question, function (answer) {
        s.end('Go on. Off you go.\n');
      });
    });
  });
}).listen(1975);
