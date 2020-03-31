export default {
  methods: {
    stripTags(text) {
      return text.replace(/<[^>]*>?/gm, '').replace(/(\r\n|\n|\r)/gm, " ").trim();
    },
    excerpt(text, limit = 150) {
      text = this.stripTags(text);
      return (text.substr(0, text.lastIndexOf(' ', limit)) + '...')
    }
  }
}