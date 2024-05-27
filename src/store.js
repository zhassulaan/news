import { createStore } from 'vuex';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const store = createStore({
  state() {
    return {
      news: [],
      favorites: []
    };
  },
  mutations: {
    setNews(state, news) {
      state.news = news;
    },
    addFavorite(state, article) {
      if (!state.favorites.find(fav => fav.id === article.id)) {
        state.favorites.push(article);
      }
    },
    removeFavorite(state, articleId) {
      state.favorites = state.favorites.filter(fav => fav.id !== articleId);
    }
  },
  actions: {
		async fetchNews({ commit }) {
      try {
        const response = await axios.get('https://newsapi.org/v2/everything?q=bitcoin&apiKey=07b5c1ad16ff4846a0775886cf274420');
				const newsWithId = response.data.articles.map(article => ({
          ...article,
          id: uuidv4()
        }));
				commit('setNews', newsWithId);
      } catch (error) {
        console.error('Error fetching data from API:', error);
      }
    },
    addFavorite({ commit }, article) {
      commit('addFavorite', article);
    },
    removeFavorite({ commit }, articleId) {
      commit('removeFavorite', articleId);
    }
  },
  getters: {
    news: state => state.news,
    favourites: state => state.favourites
  },
  modules: {
  },
});

export default store;
