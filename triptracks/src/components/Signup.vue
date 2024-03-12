<script></script>

<template>
  <div class="container">
    <div class="Signup">
      <a><h1>Sign up</h1></a>
    </div>
    <div class="Infobox">
      <input type="email" placeholder="Email" /><br />
      <input type="pwd" placeholder="Password" /><br />
      <input type="pwdcheck" placeholder="Password Check" /><br />
      <input type="name" placeholder="Name" /><br />
      <input type="submit" value="next level" /><br />
    </div>
  </div>
</template>

<style>
.container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.container > * {
  margin: 0 10px 10px 10px;
}
.Signup > a {
  font-size: 20px;
  color: #ffffff;
  margin-bottom: 20px;
}
.Infobox > input {
  font-size: 15px;
  padding: 10px;
  border: 2px;
  border-color: #ffffff;
  width: 300px;
}
.Infobox > input[type="email"] {
  margin-bottom: 15px;
}
.Infobox > input[type="pwdcheck"] {
  margin: 4px 0;
}
.Infobox > input[type="name"] {
  margin: 15px 0 40px 0;
}
.Infobox > input[type="submit"] {
  background-color: #316cf4;
  width: 320px;
}
</style>
