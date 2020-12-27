import axios from "axios";
import { add, formatISO, parseISO } from 'date-fns';

export default {
  namespaced: true,
  state: {
    members: [],
    detailMember: null,
    loadingMembers: false,
    loadingDetailMember: false,
    loadingAddNew: false,
    loadingUpdate: false,
    loadingDelete: false,
  },
  getters: {
    members: state => {
      return state.members.map(member => {
        return {
          ...member,
          readableDate: formatISO(parseISO(member.dateJoined, 'YYYY-MM-DD', new Date()), {representation: 'date'}),
        }
      });
    },
    detailMember: state => {
      state.detailMember["readableDateJoined"] = formatISO(parseISO(state.detailMember.dateJoined, 'YYYY-MM-DD', new Date()), {representation: 'date'});
      return state.detailMember;
    },
  },
  mutations: {
    SAVE_MEMBERS(state, members) {
      state.members = members;
    },
    SET_DETAIL_MEMBER(state, member) {
      state.detailMember = member;
    },
    LOADING_STATUS_MEMBERS(state, ifLoading) {
      state.loadingMembers = ifLoading;
    },
    LOADING_STATUS_DETAIL_MEMBER(state, ifLoading) {
      state.loadingDetailMember = ifLoading;
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
      context.commit("LOADING_STATUS_MEMBERS", true);
      let url = "/api/members";
      try {
        let response = await axios.get(url);
        context.commit("SAVE_MEMBERS", response.data);
      }
      catch (error) {
        console.log(error)
      }
      context.commit("LOADING_STATUS_MEMBERS", false);
    },
    async fetchOneForDetail(context, id) {
      context.commit("LOADING_STATUS_DETAIL_MEMBER", true);
      let url = "/api/members/" + id;
      try {
        let response = await axios.get(url);
        context.commit("SET_DETAIL_MEMBER", response.data);
      }
      catch (error) {
        console.log(error);
      }
      context.commit("LOADING_STATUS_DETAIL_MEMBER", false);
    },
    async add(context, newMember) {
      context.commit("LOADING_STATUS_ADD_NEW", true);
      let url = "/api/members";
      try {
        await axios.post(url, newMember);
      }
      catch (error) {
        console.log(error);
      }
      context.commit("LOADING_STATUS_ADD_NEW", false);
      context.dispatch("fetch");
    },
    async update(context, payload) {
      let currentMemberId = payload.currentMemberId;
      let updatedMember = payload.updatedMember;
      context.commit("LOADING_STATUS_UPDATE", true);
      let url = "/api/members/" + currentMemberId;
      try {
        let response = await axios.put(url, updatedMember);
        context.commit("SET_DETAIL_MEMBER", response.data);
      }
      catch (error) {
        console.log(error);
      }
      context.commit("LOADING_STATUS_UPDATE", false);
      context.dispatch("fetch");
    },
    async cascadeDelete(context, memberToDelete) {
      context.commit("LOADING_STATUS_DELETE", true);
      await context.dispatch("plays/deleteFromMember", memberToDelete, { root: true });
      await context.dispatch("delete", memberToDelete);
      context.commit("LOADING_STATUS_DELETE", false);
    },
    async delete(context, memberToDelete) {
      let url = "/api/members/" + memberToDelete._id;
      try {
        await axios.delete(url);
      }
      catch (error) {
        console.log(error);
      }
      context.dispatch("fetch");
    },
  }
}