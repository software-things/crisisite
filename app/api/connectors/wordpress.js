export default class WordPressApi {
  axios;
  constructor(axios) {
    this.axios = axios;
  }

  _prepareMenu(RESPONSE) {
    return RESPONSE.items.map((el) => {
      let LINK_OBJ;

      LINK_OBJ = {
        id: el.ID,
        slug: el.type === 'custom' ? el.url : `/${el.slug}`,
        name: el.title,
        external: el.type === 'custom'
      }

      return LINK_OBJ;
    });
  }

  _dateFormated(date) {
    if (date) {
      const DATE_OBJ = new Date(date);
      const OPTIONS = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      }
      return DATE_OBJ.toLocaleDateString('pl-PL', OPTIONS)
    }
  }

  _prepareArticles(RESPONSE) {
    return RESPONSE.map((post) => {
      let transformedPost;

      transformedPost = {
        id: post.id,
        title: post.title.rendered,
        date: this._dateFormated(post.modified),
        slug: post.slug,
        content: post.content.rendered,
        excerpt: post.excerpt.rendered,
        featured_image: post.featured_media > 0 ? post._embedded['wp:featuredmedia'][0].source_url : null,
        featured_image_alt: post.featured_media > 0 ? post._embedded['wp:featuredmedia'][0].alt_text : null,
        map: post.czk_map,
        form: post.czk_form,
        isItPage: post.type === 'page'
      }

      return transformedPost;
    });

  }

  async getPosts() {
    const RESPONSE = await this.axios.$get(`wp/v2/posts?_embed`);
    return this._prepareArticles(RESPONSE);
  }

  async getSearchedPosts(phrase) {
    const RESPONSE = await this.axios.$get(`wp/v2/posts?search=${phrase.replace(/-/g, '%20')}&_embed`);
    return this._prepareArticles(RESPONSE);
  }

  async getPages() {
    const RESPONSE = await this.axios.$get(`wp/v2/pages?_embed`);
    return this._prepareArticles(RESPONSE);
  }

  async getSearchedPages(phrase) {
    const RESPONSE = await this.axios.$get(`wp/v2/pages?search=${phrase.replace(/-/g, '%20')}&_embed`);
    return this._prepareArticles(RESPONSE);
  }

  async getMainMenu() {
    const RESPONSE = await this.axios.$get(`menus/v1/menus/2`);
    return this._prepareMenu(RESPONSE)
  }

  async getFooterMenu() {
    const RESPONSE = await this.axios.$get(`menus/v1/menus/3`);
    return this._prepareMenu(RESPONSE)
  }

  async getAdditionalData() {
    const RESPONSE = await this.axios.$get(`wp/v2/czk-settings`);
    return RESPONSE
  }
}