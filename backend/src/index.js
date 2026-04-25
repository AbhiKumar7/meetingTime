
import { app } from "./app.js";
import { dataBaseConnection } from "./dataBase/DataBase.js";

dataBaseConnection().then(() => {
  app.listen(process.env.PORT || 3000, () => {
    console.log(`port running at ${process.env.PORT}`);
  });
});
