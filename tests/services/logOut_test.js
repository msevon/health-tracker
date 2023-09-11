import { superoak } from "../../deps.js"
import { app } from "../../app.js"


Deno.test({
    name: "Path '/auth/logOut' logs out and unauthenticates user",
    async fn() {
      let testClient = await superoak(app);
      let response = await testClient.get("/auth/logOut");
      let headers = response.headers["set-cookie"];
      let cookie = headers.split(";")[0];

      testClient = await superoak(app);
      await testClient.get('/summary').set('Cookie',cookie).expect('<!doctype html>\r\n<html lang="en">\r\n  <head>\r\n    <meta charset="utf-8">\r\n    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">\r\n    <meta name="description" content="">\r\n    <meta name="author" content="">\r\n\r\n    <!--<link href="./static/assets/css/bootstrap.min.css" rel="stylesheet">-->\r\n    <link href="https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha2/css/bootstrap.min.css" rel="stylesheet">\r\n\r\n    <!--<link href="./static/assets/css/font-awesome.min.css" rel="stylesheet">-->\r\n    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.0.3/css/font-awesome.min.css" rel="stylesheet">\r\n\r\n    <link href="/static/assets/css/style.css" rel="stylesheet">\r\n\r\n    <title>HealthTracker</title>\r\n  </head>\r\n  <body>\r\n <!--<nav class="navbar navbar-expand-md navbar-dark bg-dark">-->\r\n    <nav class="navbar fixed-top navbar-expand-md navbar-dark bg-dark">\r\n        <div class="w-25 mr-auto order-1">\r\n          <!--<a class="navbar-brand" href="/"><img src="" width="138" height="55"></img></a>-->\r\n        </div>\r\n    \r\n        <button class="navbar-toggler order-3" type="button" data-toggle="collapse" data-target=".dual-collapse2">\r\n                <span class="navbar-toggler-icon"></span>\r\n            </button>\r\n    \r\n        <div class="mx-auto w-50 order-2">\r\n            <h3 id="slogan" class="mx-auto"><!--Health Tracker--></h3>\r\n        </div>\r\n        <div class="navbar-collapse collapse order-3 w-25 dual-collapse2">\r\n            <ul class="navbar-nav ml-auto">\r\n                <!--\r\n                <li class="nav-item">\r\n                    <a class="nav-link" href=".">Etusivu</a>\r\n                </li>\r\n                -->\r\n                \r\n                    <li class="nav-item">\r\n                        <a class="nav-link" href="/auth/login">Login</a>\r\n                    </li>\r\n                \r\n            </ul>\r\n    \r\n        </div>\r\n    </nav>\r\n    \r\n    </header>\r\n  \r\n<section class="form-01-main">\r\n    <div class="form-cover">\r\n    <div class="container">\r\n      <div class="row">\r\n        <div class="col-md-12">\r\n<div class="form-sub-main">\r\n<h1>Oops!</h1>\r\n<p>Looks like you haven\'t logged in yet.</p>\r\n<div class="form-group">\r\n    <div class="btn_uy">\r\n    <a href="/auth/login"><span>Login</span></a>\r\n    </div>\r\n</div>\r\n\r\n</div>\r\n\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</section>\r\n\r\n\r\n  <!-- Bootstrap JavaScript -->\r\n\r\n  <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>\r\n  <script src="https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha2/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>\r\n\r\n</body>\r\n</html>')
    },
    sanitizeResources: false,
    sanitizeOps: false,
  });