export default {
  mounted() {
    if (process.client) {
      const fileSize = async url => {
        return await this.$axios
          .head("https://cors-anywhere.herokuapp.com/" + url)
          .then(response => {
            return response.headers["content-length"];
          });
      };
      const humanFileSize = size => {
        const i = Math.floor(Math.log(size) / Math.log(1024));
        return (
          (size / Math.pow(1024, i)).toFixed(2) * 1 +
          " " +
          ["B", "kB", "MB", "GB", "TB"][i]
        );
      };
      const files = document.querySelectorAll(".wp-block-file");
      for (const file of files) {
        file.classList = "attachment";
        const button = file.querySelector(".wp-block-file__button");
        const url = file.querySelector("a");
        url.dataset.details = `Trwa pobieranie danych...`;
        if (url) {
          const href = url.getAttribute("href");
          const extension = href
            .split(".")
            .pop()
            .toUpperCase();
          fileSize(url).then(size => {
            size = humanFileSize(size);
            url.dataset.details = `Format pliku: ${extension} | Rozmiar: ${size}`;
          });
        }
        if (button) {
          button.classList = "attachment__button";
        }
      }
    }
  }
}