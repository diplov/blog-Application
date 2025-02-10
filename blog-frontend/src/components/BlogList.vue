<template>
  <div class="max-w-4xl mx-auto p-6">
    <h1 class="text-3xl font-bold text-center mb-8 text-gray-800">
      Blog Posts
    </h1>

    <!-- List of Posts -->
    <ul class="space-y-4">
      <li
        v-for="post in posts"
        :key="post.id"
        class="p-4 bg-white shadow-md rounded-lg flex justify-between items-center hover:shadow-lg transition-shadow duration-200"
      >
        <!-- Post Title with Link to Edit -->
        <router-link
          :to="'/blog/' + post.id"
          class="text-lg font-medium text-indigo-600 hover:text-indigo-800"
        >
          {{ post.title }}
        </router-link>

        <!-- Button Group for Edit and Delete -->
        <div class="flex space-x-2">
          <!-- Edit Button -->
          <router-link
            :to="'/edit/' + post.id"
            class="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            Edit
          </router-link>

          <!-- Delete Button -->
          <button
            @click="deletePost(post.id)"
            class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Delete
          </button>
        </div>
      </li>
    </ul>

    <!-- Create New Post Link -->
    <div class="mt-8 text-center">
      <router-link
        to="/create"
        class="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        Create New Post
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      posts: [],
    };
  },
  created() {
    this.fetchPosts();
  },
  methods: {
    fetchPosts() {
      axios
        .get("http://localhost:8000/api/posts")
        .then((response) => {
          this.posts = response.data;
        })
        .catch((error) => {
          console.error("Error fetching posts:", error);
        });
    },
    deletePost(id) {
      if (confirm("Are you sure you want to delete this post?")) {
        axios
          .delete(`http://localhost:8000/api/posts/${id}`)
          .then(() => {
            this.fetchPosts();
          })
          .catch((error) => {
            console.error("Error deleting post:", error);
          });
      }
    },
  },
};
</script>
