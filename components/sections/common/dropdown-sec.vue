<template>
  <b-dropdown
    text="Right align"
    :right="$i18n.locale == 'en' ? true : false"
    variant="link"
    class="w-100"
    toggle-class="text-decoration-none"
    no-caret
  >
    <template #button-content>
      <div>
        <slot name="custom-button"></slot>

        <p v-if="title" class="text-dark font-14 mb-1">
          {{ $t(title) }}
        </p>

        <div v-if="!custom_button" class="w-100 rounded-lg bg-white border">
          <div class="d-flex justify-content-between align-items-center">
            <div class="mx-3">
              <div class="d-flex">
                <slot name="prefix"></slot>
                <p class="text-muted font-14">
                  {{ $t(selected) ? $t(selected) : $t("Select an option") }}
                </p>
                <slot name="suffix"></slot>
              </div>
            </div>
            <div class="mx-2 rotate-90">
              <inline-svg
                fill="#000"
                :src="require('@/static/icons/arrow-down.svg')"
              ></inline-svg>
            </div>
          </div>
        </div>
      </div>
    </template>
    <slot name="items"></slot>
  </b-dropdown>
</template>

<script>
export default {
  props: ["title", "selected", "custom_button", "borderOnly"],
};
</script>
