<template>
  <div>
    <div class="mb-1" v-if="label">
      <p class="font-13 text-black-50">{{ $t(label) }}</p>
    </div>
    <div class="bg-light rounded d-flex align-items-center">
      <p
        @click="$emit('change', value1)"
        :class="[
          'py-2 pointer px-4 font-13 rounded',
          value1 == choosedItem ? 'bg-primary text-white' : '',
        ]"
      >
        {{ $t(key1) }}
      </p>
      <p
        @click="$emit('change', value2)"
        :class="[
          'py-2 pointer px-4 font-13 rounded',
          value2 == choosedItem ? 'bg-secondary text-white' : '',
        ]"
      >
        {{ $t(key2) }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["label", "key1", "key2", "value1", "value2", "choosedItem"],
};
</script>
