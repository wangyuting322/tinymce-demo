<template>
  <div class="home">
    <Editor  v-model="editorHtml"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Editor from '@/components/Editor.vue'

export default {
  name: 'Home',
  data () {
    return {
      editorHtml: ''
    }
  },
  components: {
    Editor
  }
}
</script>
