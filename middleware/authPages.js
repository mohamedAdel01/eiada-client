export default function({ app, route, store, redirect }) {
  if (app.$cookiz.get("authData")) {
    redirect("/");
  }
}
