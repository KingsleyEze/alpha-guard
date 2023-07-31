<template>
  <nav>
    <ul>
      <li>
        <router-link
          class="nav-menu link"
          exact-active-class="selected"
          to="/tab/marketing"
        >
          <img class="nav-menu icon" :src="IconMarketing" alt="" />
          <span class="nav-menu label">Marketing</span>
        </router-link>
      </li>
      <li>
        <router-link
          class="nav-menu link"
          exact-active-class="selected"
          to="/tab/finance"
        >
          <img class="nav-menu icon" :src="IconFinance" alt="" />
          <span class="nav-menu label">Finance</span>
        </router-link>
      </li>
      <li>
        <router-link
          class="nav-menu link"
          exact-active-class="selected"
          to="/tab/personnel"
        >
          <img class="nav-menu icon" :src="IconPeople" alt="" />
          <span class="nav-menu label">Personnel</span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>
<script setup>
import IconMarketing from "@/assets/icon-marketing.png";
import IconFinance from "@/assets/icon-finance.png";
import IconPeople from "@/assets/icon-people.png";
</script>
<style scoped lang="scss">
nav {
  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    a {
      text-decoration: none;
      color: #000;
      &:hover {
        color: #bada55;
      }
    }
    .link {
      padding: 20px 30px;
      display: flex;
      .icon {
        width: 20px;
        height: 20px;
        margin-right: 10px;
      }
      .label {
        font-size: 1.2rem;
        font-weight: 600;
      }

      &.selected {
        background-color: #fff;
        border-left: 5px solid rgb(182, 61, 68);
        .icon {
          margin-left: -5px;
        }
      }
    }
  }
}
</style>
