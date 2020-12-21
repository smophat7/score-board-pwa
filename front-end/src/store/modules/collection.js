import axios from "axios";

export default {
  namespaced: true,
  state: {
    games: [],
    detailGame: null,
    loadingGames: false,
    loadingAddNew: false,
    loadingUpdate: false,
    loadingDelete: false,
  },
  getters: { },
  mutations: {
    SAVE_GAMES(state, games) {
      state.games = games;
    },
    SET_DETAIL_GAME(state, game) {
      state.detailGame = game;
    },
    LOADING_STATUS_GAMES(state, ifLoading) {
      state.loadingGames = ifLoading;
    },
    LOADING_STATUS_DETAIL_GAME(state, ifLoading) {
      state.loadingDetailGame = ifLoading;
    },
    LOADING_STATUS_ADD_NEW(state, ifLoading) {
      state.loadingAddNew = ifLoading;
    },
    LOADING_STATUS_UPDATE(state, ifLoading) {
      state.loadingUpdate = ifLoading;
    },
    LOADING_STATUS_DELETE(state, ifLoading) {
      state.loadingDelete = ifLoading;
    },
  },
  actions: {
    async fetch(context) {
      context.commit("LOADING_STATUS_GAMES", true);
      let url = "/api/collection";
      try {
        let response = await axios.get(url);
        context.commit("SAVE_GAMES", response.data);
      }
      catch (error) {
        console.log(error);
      }
      context.commit("LOADING_STATUS_GAMES", false);
    },
    async fetchOneForDetail(context, id) {
      context.commit("LOADING_STATUS_DETAIL_GAME", true);
      let url = "/api/collection/" + id;
      try {
        let response = await axios.get(url);
        context.commit("SET_DETAIL_GAME", response.data);
      }
      catch (error) {
        console.log(error);
      }
      context.commit("LOADING_STATUS_DETAIL_GAME", false);
    },
    async add(context, game) {
      context.commit("LOADING_STATUS_ADD_NEW", true);

      // Only keep the attributes from the Board Game Atlas
      // API that I have in my mongoose schema
      let newGameFormatted = {
        board_game_id: game.id,
        name: game.name,
        name_original: game.name,
        year_published: game.year_published,
        min_players: game.min_players,
        max_players: game.max_players,
        min_playtime: game.min_playtime,
        max_playtime: game.max_playtime,
        min_age: game.min_age,
        description: game.description,
        description_preview: game.description_preview,
        image_url: game.image_url,
        thumb_url: game.thumb_url,
        images: game.images,
        url: game.url,
        price: game.price,
        msrp: game.msrp,
        discount: game.discount,
        primary_publisher: game.primary_publisher.name,
        developers: game.developers,
        artists: game.artists,
        names: game.names,
        num_user_ratings: game.num_user_ratings,
        average_user_rating: game.average_user_rating,
        official_url: game.official_url,
        rules_url: game.rules_url,
        reddit_all_time_count: game.reddit_all_time_count,
        reddit_week_count: game.reddit_week_count,
        reddit_day_count: game.reddit_day_count,
        historical_low_price: game.historical_low_price,
        historical_low_date: game.historical_low_date,
        rank: game.rank,
        trending_rank: game.trending_rank,
      };
      let url = "/api/collection";
      try {
        await axios.post(url, newGameFormatted);
      }
      catch (error) {
        console.log(error);
      }
      context.commit("LOADING_STATUS_ADD_NEW", false);
      context.dispatch("fetch");
    },
    async update(context, payload) {
      let currentGameId = payload.currentGameId;
      let updatedGame = payload.updatedGame;
      context.commit("LOADING_STATUS_UPDATE", true);
      let url = "/api/collection/" + currentGameId;
      try {
        let response = await axios.put(url, updatedGame);
        context.commit("SET_DETAIL_GAME", response.data);
      }
      catch (error) {
        console.log(error);
      }
      context.commit("LOADING_STATUS_UPDATE", false);
      context.dispatch("fetch");
    },
    async cascadeDelete(context, gameToDelete) {
      context.commit("LOADING_STATUS_DELETE", true);
      await context.dispatch("plays/deleteFromGame", gameToDelete, { root: true });
      await context.dispatch("delete", gameToDelete);
      context.commit("LOADING_STATUS_DELETE", false);
    },
    async delete(context, gameToDelete) {
      let url = "/api/collection/" + gameToDelete._id;
      try {
        await axios.delete(url);
      }
      catch (error) {
        console.log(error);
      }
      context.dispatch("fetch");
    },
  },
}