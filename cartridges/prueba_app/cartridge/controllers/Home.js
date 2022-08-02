const server = require("server");
server.extend(module.superModule);

server.prepend("Show", (req, res, next) => {
  const viewData = res.getViewData();
  viewData.mensaje = "Estamos modificando el controlador antes del base";
  res.setViewData(viewData);
  next();
});

// server.replace("Show", (req, res, next) => {
//   res.print("HOLA");
//   next();
// });

server.append("Show", (req, res, next) => {
  const viewData = res.getViewData();
  viewData.mensaje2 = "Estamos modificando el controlador despues del base";
  res.setViewData(viewData);
  next();
});

module.exports = server.exports();
