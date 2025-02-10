<template>
  <div>
    <h2>Posts</h2>
    <ul>
      <li v-for="post in posts" :key="post.id">
        {{ post.title }} - <button @click="deletePost(post.id)">Delete</button>
        <button @click="editPost(post)">Edit</button>
      </li>
    </ul>
    <PostForm :post="editingPost" @save="savePost" />
  </div>
</template>

<script>
import axios from "axios";
import PostForm from "./PostForm.vue";

export default {
  components: {
    PostForm,
  },
  data() {
    return {
      posts: [],
      editingPost: null, // This is passed as the `post` prop to PostForm
    };
  },
  created() {
    this.fetchPosts();
  },
  methods: {
    async fetchPosts() {
      const response = await axios.get("http://localhost:8000/api/posts");
      this.posts = response.data;
    },
    async deletePost(id) {
      await axios.delete(`http://localhost:8000/api/posts/${id}`);
      this.fetchPosts();
    },
    editPost(post) {
      this.editingPost = { ...post }; // Pass a copy of the post to avoid direct mutation
    },
    async savePost(post) {
      if (post.id) {
        await axios.put(`http://localhost:8000/api/posts/${post.id}`, post);
      } else {
        await axios.post("http://localhost:8000/api/posts", post);
      }
      this.editingPost = null; // Reset the editing form
      this.fetchPosts(); // Refresh the list
    },
  },
};
</script>
