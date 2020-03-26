export default {
  methods: {
    async fileSize(url) {
      return await this.$axios
        .head("https://cors-anywhere.herokuapp.com/" + url)
        .then(response => {
          return response.headers["content-length"];
        });
    },
    humanFileSize(size) {
      const i = Math.floor(Math.log(size) / Math.log(1024));
      return (
        (size / Math.pow(1024, i)).toFixed(2) * 1 +
        " " +
        ["B", "kB", "MB", "GB", "TB"][i]
      );
    }
  },
  mounted() {
    if (process.client) {
      const files = document.querySelectorAll(".wp-block-file");
      files.forEach(file => {
        file.classList = "attachment";
        const wrapper = document.createElement("div");
        const button = file.querySelector(".wp-block-file__button");
        const url = file.querySelector("a");
        const details = document.createElement("div");
        details.className = "attachment__details";
        details.innerText = `Trwa pobieranie danych...`;
        url.parentNode.insertBefore(wrapper, url);
        wrapper.appendChild(url);
        wrapper.appendChild(details);
        if (url) {
          const href = url.getAttribute("href");
          const extension = href
            .split(".")
            .pop()
            .toUpperCase();
          this.fileSize(url).then(size => {
            size = this.humanFileSize(size);
            details.innerText = `Format pliku: ${extension} | Rozmiar: ${size}`;
          });
        }
        if (button) {
          button.classList = "attachment__button";
        }
      });
    }
  }
}