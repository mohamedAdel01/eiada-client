<template>
  <aside class="position-fixed">
    <ul class="p-0 text-center">
      <li class="bg-white pointer my-4 p-1 shadow-sm" :data-label="$t('Dashboard')">
        <inline-svg
          width="40px"
          height="40px"
          fill="#777"
          :src="require('@/static/images/dashboard.svg')"
        ></inline-svg>
      </li>
      <li class="bg-white pointer my-4 p-1 shadow-sm" :data-label="$t('Manage Users')">
        <inline-svg
          width="40px"
          height="40px"
          fill="#777"
          :src="require('@/static/images/users.svg')"
        ></inline-svg>
      </li>
      <li
        class="bg-white pointer my-4 p-1 shadow-sm"
        :data-label="$t('Manage Appointments')"
      >
        <inline-svg
          width="40px"
          height="40px"
          fill="#777"
          :src="require('@/static/images/appointment.svg')"
        ></inline-svg>
      </li>
    </ul>
  </aside>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
aside {
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
        top: 0;
        margin: 0 25px;
        background: #fdfdfd;
        width: fit-content;
        padding: 5px 20px;
        white-space: nowrap;
        box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
        transform: translate(-50px);
        opacity: 0;
        transition: 0.5s;
        color: #777;
      }
      &:hover {
        &::after {
          transform: translate(0);
          opacity: 1;
        }

        svg {
          fill: #24b6de !important;
        }
      }
    }
  }
}
</style>
