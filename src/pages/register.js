function Register() {
  return (
    <div>
      <form action="/register" class="row g-3 form m-5" method="post">
        <div class="col-md-6">
          <div class="input-group">
            <span class="input-group-text">Username</span>
            <input
              autocomplete="off"
              autofocus
              class="form-control"
              id="username"
              name="username"
              placeholder="Username"
              type="text"
            />
          </div>
        </div>
        <div class="col-md-6">
          <div class="input-group">
            <span class="input-group-text">Email</span>
            <input
              autocomplete="off"
              autofocus
              class="form-control mx-auto w-auto"
              id="email"
              name="email"
              placeholder="Email"
              type="email"
            />
          </div>
        </div>
        <div class="col-md-6">
          <div class="input-group">
            <span class="input-group-text">Password</span>
            <input
              class="form-control mx-auto w-auto"
              id="password"
              name="password"
              placeholder="Password"
              type="password"
            />
          </div>
        </div>

        <div class="col-md-6">
          <div class="input-group">
            <span class="input-group-text">Password Confirmation</span>
            <input
              class="form-control mx-auto w-auto"
              id="password"
              name="confirmation"
              placeholder="Confirmation Password"
              type="password"
            />
          </div>
        </div>

        <div class="col-md-6">
          <div class="input-group">
            <span class="input-group-text">Name</span>
            <input
              autocomplete="off"
              autofocus
              class="form-control"
              id="name"
              name="name"
              placeholder="Name"
              type="text"
            />
          </div>
        </div>

        <div class="col-md-6">
          <div class="input-group">
            <span class="input-group-text">MetaMask Number</span>
            <input
              required
              autocomplete="off"
              autofocus
              class="form-control mx-auto w-auto"
              id="number"
              name="number"
              placeholder="Phone Number"
              type="number"
            />
          </div>
        </div>

        <div class="col-12">
          <button class="btn btn-primary m-auto w-25" type="submit">
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
