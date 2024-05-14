<script></script>

<template>
  <div class="container">
    <form class="Signup2">
      <a><h1>Sign up</h1></a>
      <fieldset>
        <legend><h2>Like tags</h2></legend>
        <div>
          <input type="checkbox" id="liketag1" name="interest" value="spring" />
          <label for="coding">봄</label>
        </div>
        <div>
          <input type="checkbox" id="liketag2" name="interest" value="summer" />
          <label for="music">여름</label>
        </div>
        <div>
          <input type="checkbox" id="liketag3" name="interest" value="fall" />
          <label for="coding">가을</label>
        </div>
        <div>
          <input type="checkbox" id="liketag4" name="interest" value="winter" />
          <label for="music">겨울</label>
        </div>
      </fieldset>
    </form>
    <div class="complete"><input type="submit" value="complete" /><br /></div>
  </div>
</template>

<style scoped>
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
  margin: 10px 10px 10px 10px;
}
.Signup2 > a {
  font-size: 20px;
  color: #ffffff;
}
.Signup2 > fieldset {
  width: 25vw;
  height: 30vh;
  padding: 20px 10px 0 10px;
}
.complete > input[type="submit"] {
  background-color: #316cf4;
  width: 26vw;
  font-size: 15px;
  font-weight: bold;
  padding: 10px;
  margin: 30px 0 30px 0;
  border: none;
}
</style>
