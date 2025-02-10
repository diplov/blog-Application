<template>
  <div class="max-w-3xl mx-auto p-8 bg-white shadow-2xl rounded-lg">
    <h1
      class="text-4xl font-bold text-center mb-8 text-indigo-700 animate-fade-in"
    >
      Edit Blog Post
    </h1>

    <form @submit.prevent="updatePost" class="space-y-6">
      <!-- Title Input -->
      <div class="animate-slide-up">
        <label for="title" class="block text-sm font-medium text-gray-700">
          Title:
        </label>
        <input
          type="text"
          v-model="title"
          required
          class="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
          placeholder="Enter post title"
        />
      </div>

      <!-- Content Textarea -->
      <div class="animate-slide-up">
        <label for="content" class="block text-sm font-medium text-gray-700">
          Content:
        </label>
        <textarea
          v-model="content"
          required
          rows="8"
          class="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
          placeholder="Write your post content here..."
        ></textarea>
      </div>

      <!-- Update Button -->
      <div class="animate-slide-up">
        <button
          type="submit"
          class="w-full flex justify-center py-3 px-6 border border-transparent rounded-md shadow-md text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform transition-transform duration-300 hover:scale-105"
        >
          Update Post
        </button>
      </div>
    </form>

    <!-- Back to List Link -->
    <div class="mt-8 text-center animate-fade-in">
      <router-link
        to="/"
        class="text-lg text-indigo-600 hover:text-indigo-800 focus:outline-none"
      >
        Back to Posts
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      title: "",
      content: "",
      id: this.$route.params.id,
    };
  },
  created() {
    this.fetchPost();
  },
  methods: {
    fetchPost() {
      axios
        .get(`http://localhost:8000/api/posts/${this.id}`)
        .then((response) => {
          this.title = response.data.title;
          this.content = response.data.content;
        })
        .catch((error) => {
          console.error("Error fetching post:", error);
        });
    },
    updatePost() {
      axios
        .put(`http://localhost:8000/api/posts/${this.id}`, {
          title: this.title,
          content: this.content,
        })
        .then(() => {
          this.$router.push("/");
        })
        .catch((error) => {
          console.error("Error updating post:", error);
        });
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

@keyframes slide-up {
  0% {
    transform: translateY(20px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

.animate-fade-in {
  animation: fade-in 1s ease-out;
}

.animate-slide-up {
  animation: slide-up 1s ease-out;
}
</style>
