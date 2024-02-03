<template>
  <aside class="breath-link-aside">
    <router-link to="/breath"><span>Respiration guidée</span></router-link>
  </aside>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.breath-link-aside {
  width: 55%;
  margin: 70px auto 50px auto;
  height: 100px;
  border: 3px solid var(--primary-border);
  border-radius: 30px;
  background-image: url(../../assets/images/guided-breath.png);
  background-size: cover;
  background-repeat: no-repeat;
  background-position-y: 60%;
  line-height: 100px;
  text-align: center;
  span {
    padding: 7px 14px;
    border: 2px solid var(--gray);
    border-radius: 0.25rem;
    background-color: var(--white);
    color: var(--gray);
    font-family: var(--roboto);
    font-weight: bold;
    letter-spacing: 1px;
    white-space: nowrap;
    cursor: pointer;
    transition: all 0.3s ease 0s;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    &:hover {
      border-color: var(--dark-gray);
    }
  }
  @include media-max(667.98px) {
    width: 90%;
  }
}
</style>
