<template>
  <div>
    <h3>{{ localPost.id ? "Edit Post" : "Create Post" }}</h3>
    <form @submit.prevent="save">
      <input v-model="localPost.title" placeholder="Title" required />
      <textarea
        v-model="localPost.content"
        placeholder="Content"
        required
      ></textarea>
      <button type="submit">Save</button>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      default: () => ({ title: "", content: "" }),
    },
  },
  data() {
    return {
      // Create a local copy of the prop
      localPost: { ...this.post },
    };
  },
  watch: {
    // Update the local copy if the prop changes
    post(newPost) {
      this.localPost = { ...newPost };
    },
  },
  methods: {
    save() {
      // Emit the local copy to the parent component
      this.$emit("save", this.localPost);
    },
  },
};
</script>
