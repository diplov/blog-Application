<template>
  <div
    class="max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-lg border border-gray-200 transform transition duration-500 hover:scale-100"
  >
    <h1
      class="text-4xl font-bold text-center mb-8 text-gray-800 animate__animated animate__fadeIn"
    >
      Create Blog Post
    </h1>
    <form @submit.prevent="createPost" class="space-y-8">
      <!-- Title Input -->
      <div>
        <label for="title" class="block text-lg font-medium text-gray-700 mb-2">
          Title:
        </label>
        <input
          type="text"
          v-model="title"
          required
          class="transition-all duration-300 ease-in-out mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg hover:border-indigo-400 focus:outline-none"
          placeholder="Enter post title"
        />
      </div>

      <!-- Content Textarea -->
      <div>
        <label
          for="content"
          class="block text-lg font-medium text-gray-700 mb-2"
        >
          Content:
        </label>
        <textarea
          v-model="content"
          required
          rows="8"
          class="transition-all duration-300 ease-in-out mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg hover:border-indigo-400 focus:outline-none"
          placeholder="Write your post content here..."
        ></textarea>
      </div>

      <!-- Submit Button -->
      <div>
        <button
          type="submit"
          class="w-full flex justify-center py-3 px-6 border border-transparent rounded-md shadow-lg text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 transform transition duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Create Post
        </button>
      </div>
      <div class="mt-8 text-center animate-fade-in">
        <router-link
          to="/"
          class="text-lg text-indigo-600 hover:text-indigo-800 focus:outline-none"
        >
          Back to Posts
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      title: "",
      content: "",
    };
  },
  methods: {
    createPost() {
      axios
        .post("http://localhost:8000/api/posts", {
          title: this.title,
          content: this.content,
        })
        .then(() => {
          this.$router.push("/");
        })
        .catch((error) => {
          console.error("Error creating post:", error);
        });
    },
  },
};
</script>

<style scoped>
/* Adding the animation on the input focus */
input:focus,
textarea:focus {
  box-shadow: 0 0 10px rgba(99, 102, 241, 0.5);
  border-color: #6366f1;
}

/* Adding some hover animation to buttons */
button:hover {
  transform: translateY(-3px);
}

/* Add fade-in animation to form when mounted */
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.animate__fadeIn {
  animation: fadeIn 1s ease-out;
}
</style>
