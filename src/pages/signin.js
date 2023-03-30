function Signin() {
  return (
    <div>
      <div class="container mt-5">
        <form action="/login" method="post">
          <div class="mb-3">
            <input
              autocomplete="off"
              autofocus
              class="form-control mx-auto w-auto"
              id="username"
              name="username"
              placeholder="Username"
              type="text"
            />
          </div>
          <div class="mb-3">
            <input
              class="form-control mx-auto w-auto"
              id="password"
              name="password"
              placeholder="Password"
              type="password"
            />
          </div>
          <a href="/">
            <button class="btn btn-primary" type="button">
              Log In
            </button>
          </a>
          <br />
          <a href="/register">
            <button class="btn btn-primary m-2" type="button">
              Register
            </button>
          </a>
        </form>
      </div>
    </div>
  );
}

export default Signin;
