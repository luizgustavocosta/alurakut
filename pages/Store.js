import UserSession from "./UserSession";

export default async function Store(token) {
  UserSession.setName(token);
}