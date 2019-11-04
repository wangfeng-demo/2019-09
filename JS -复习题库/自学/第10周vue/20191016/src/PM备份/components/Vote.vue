<template>
  <div class="container">
    <vote-head></vote-head>
    <VoteContent></VoteContent>
    <vote-footer></vote-footer>
  </div>
</template>

<script>
import VoteHead from "./VoteHead";
import VoteContent from "./VoteContent";
import VoteFooter from "./VoteFooter";

export default {
  components: {
    VoteHead,
    VoteContent,
    VoteFooter
  },
  data() {
    return {};
  }
};
</script>

<style scoped>
.container {
  padding: 10px;
  width: 400px;
  border: 1px solid #aaa;
}
</style>