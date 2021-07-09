<template>
  <section class="sidebar position-fixed z-3">
    <ul class="p-0 text-center">
      <li
        v-for="(item, i) in sidebar_items"
        :key="i"
        @click="$router.push(item.route)"
        class="bg-white pointer my-4 p-1 shadow-sm"
        :data-label="$t(item.name)"
      >
        <inline-svg
          width="40px"
          height="40px"
          fill="#777"
          :src="require(`@/static/images/s-${item.name}.svg`)"
        ></inline-svg>
      </li>
    </ul>
  </section>
</template>

<script>
import { sidebar_items } from "@/assets/js/constants";
export default {
  data() {
    return {
      sidebar_items,
    };
  },
};
</script>

<style lang="scss" scoped>
.sidebar {
  top: 50px;
  left: 0;
  width: 70px;
  height: calc(100vh - 50px);
  ul {
    list-style: none;
    li {
      position: relative;
      &::after {
        content: attr(data-label);
        position: absolute;
        bottom: 0;
        left: -200px;
        margin: 0;
        background: #fdfdfd;
        width: 0;
        padding: 5px 20px;
        white-space: nowrap;
        box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
        transform: translate(-40px);
        opacity: 0;
        transition: 0.5s;
        color: #777;
      }
      &:hover {
        &::after {
          transform: translate(0);
          opacity: 1;
          width: fit-content;
          margin: 0 25px;
          left: auto;
        }

        svg {
          fill: #24b6de !important;
        }
      }
    }
  }
}
</style>
