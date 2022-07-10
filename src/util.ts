import fs from "fs";

export const getDb = (): any => {
  const db = fs.readFileSync("./db/database.json", "utf8");
  return JSON.parse(db);
};

export const isTokenValid = (token: string): boolean => {
  const db = getDb();

  let found = false;
  db.users.forEach((user: any) => {
    if (user.token === token) {
      found = true;
    }
  });

  return found;
};

export const getUser = (token: string): any => {
  const db = getDb();

  let foundUser: any = null;
  db.users.forEach((user: any) => {
    if (user.token === token) {
      foundUser = user;
    }
  });

  return foundUser;
};
