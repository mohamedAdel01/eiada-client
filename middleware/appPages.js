export default function({ app, route, redirect }) {
  if (!app.$cookiz.get("authData")) {
    return redirect("/auth/login");
  }

  if (!app.$cookiz.get("authData").clinic.length) {
    if (route.path.split("/").pop() == "create-clinic") return;
    return redirect("/app/clinic/create-clinic");
  }

  if (!app.$cookiz.get("authData").branches.length) {
    if (route.path.split("/").pop() == "create-branch") return;
    return redirect("/app/branch/create-branch");
  }
}
