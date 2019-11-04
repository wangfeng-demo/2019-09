<template>
  <div id="app">
    <!-- 在进行V-FOR循环的时候，我们需要给每一个循环的元素设置KEY值（KEY值保持当前循环中的唯一性，但是尽可能不要使用index作为值） -->
    <vote></vote>
  </div>
</template>

<script>
import Vote from "./components/Vote";
export default {
  name: "app",
  components: {
    Vote
  },
  data() {
    return {};
  }
};
</script>