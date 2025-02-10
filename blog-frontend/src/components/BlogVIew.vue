<template>
  <div class="max-w-3xl mx-auto p-8 bg-white shadow-2xl rounded-lg">
    <!-- Create Post Button (Top Right) -->
    <div class="mb-8 text-right animate-fade-in">
      <router-link
        to="/create"
        class="px-6 py-3 text-lg font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 rounded-md"
      >
        Create Post
      </router-link>
    </div>

    <h1
      class="text-4xl font-bold text-center mb-8 text-indigo-700 animate-fade-in"
    >
      All Blog Posts
    </h1>

    <!-- Posts List -->
    <div v-if="posts.length" class="space-y-6 animate-fade-in">
      <div
        v-for="post in posts"
        :key="post.id"
        class="p-6 border-b border-gray-300 rounded-lg shadow-sm"
      >
        <h2 class="text-2xl font-semibold text-indigo-700">{{ post.title }}</h2>
        <p class="text-lg text-gray-700 mt-2">
          {{ post.content.substring(0, 150) }}...
        </p>

        <!-- Action Buttons -->
        <div class="mt-4 flex justify-start space-x-4">
          <!-- Edit Button -->
          <router-link
            :to="`/edit/${post.id}`"
            class="px-6 py-3 text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md"
          >
            Edit
          </router-link>

          <!-- Delete Button -->
          <button
            @click="deletePost(post.id)"
            class="px-6 py-3 text-lg font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 rounded-md"
          >
            Delete
          </button>
        </div>
      </div>
    </div>

    <div v-else class="text-center animate-fade-in">
      <p class="text-lg text-gray-700">No posts available at the moment.</p>
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
            this.fetchPosts(); // Refresh the list after deletion
          })
          .catch((error) => {
            console.error("Error deleting post:", error);
          });
      }
    },
  },
};
</script>

<style scoped>
/* Custom animations */
@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.animate-fade-in {
  animation: fade-in 1s ease-out;
}
</style>
