<template>
    <!--班组班次出勤-->
    <list-index
      :downLoading="downLoading"
      :upLoading="upLoading"
      :upFinished="upFinished"
      :upError="upError"
      :list="lists"
      :itemAction="listItemButtons"
      @on-refresh-list="refreshListsHandle"
      @on-load-list="loadListsHandle"
      @on-click-list-action="clickListHandle"
      @on-click-list-item-action="clickListItemHandle">
    </list-index>
</template>

<script>
import ListIndex from 'Components/List/ListIndex.vue';

export default {
  name: 'TeamList',
  mixins: [],
  components: { ListIndex },
  props: {},
  data() {
    return {
      downLoading: false,
      upLoading: false,
      upFinished: false,
      upError: false,
      lists: [],
      listItemButtons: [
        {
          text: '详细',
          type: 'info',
          color: '#fc3962',
        },
        {
          text: '近期',
          type: 'warning',
          color: '#ffe300',
        },
      ],
    };
  },
  computed: {},
  watch: {},
  created() {
  },
  mounted() {
  },
  destroyed() {
  },
  methods: {
    // 刷新班组下班次出勤列表
    async refreshListsHandle() {
      this.upFinished = false;
      this.downLoading = true;
      this.lists = [];
      await this.loadListsHandle();
    },
    // 加载班组下班次出勤列表
    async loadListsHandle() {
      this.upLoading = true;
      if (this.upError) {
        this.upError = false;
      }
      if (this.upFinished) {
        this.upFinished = false;
      }
      try {
        const res = await this.$api.team.shiftOfTeam();
        const { rows, total } = res.data;
        this.lists = [...this.lists, ...rows];
        if (this.lists.length === 0 || this.lists.length >= total) {
          this.upFinished = true;
        }
      } catch (e) {
        this.upError = true;
        console.log('Error', e);
      } finally {
        this.downLoading = false;
        this.upLoading = false;
      }
    },
    // 点击列表项
    clickListHandle(id) {
      console.log('班组id ', id);
    },
    // 点击列表项滑动按钮
    clickListItemHandle(id) {
      console.log('班组id ', id);
    },
  },
};
</script>

<style lang="less" scoped>

</style>
