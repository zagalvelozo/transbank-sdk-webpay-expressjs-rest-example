var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.sendFile('index.html', { root: 'public' });
});

router.all('/webpayplus/commit', function(req, res) {
  const token = (req.body && req.body.token_ws) || req.query.token_ws || '';
  res.send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Resultado del Pago</title>
      <link rel="stylesheet" href="/stylesheets/style.css">
    </head>
    <body>
      <main>
        <div class="container">
          <h1 class="title">Procesando pago...</h1>
          <form id="commit-form" action="/api/webpayplus/commit" method="POST">
            <input type="hidden" name="token_ws" value="${token || ''}">
          </form>
        </div>
      </main>
      <script>
        document.getElementById('commit-form').submit();
      </script>
    </body>
    </html>
  `);
});

router.get('/search', function(req, res) {
  let query = req.query.q;
  res.send({ query: query });
});

module.exports = router;
