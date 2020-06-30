<template>
  <div>
    <!--顶部导航栏-->
    <top-nav-bar-index
      :fixed="true"
      :border="false"
      icon-class-left="left_arrow"
      text-right="保存"
      @click-left="backHandle"
      @click-title="openBottomSheetHandle">
      {{title}}
    </top-nav-bar-index>
    <bottom-pop-sheet-index
      :open.sync="isOpenedBottomSheet"
      :actions="bottomOptions"
      @select="selectedTitleHandle">
    </bottom-pop-sheet-index>

    <!--顶部日历选择器-->
    <calendar-bar-index
      :date.sync="date"
      :fixed="true"
      :border="false">
    </calendar-bar-index>

    <!--搜索栏-->
    <search-bar-index
      :fixed="true"
      text-right="搜索"
      shape="round"
      placeholder="请输入搜索关键词"
      @on-search="searchHandle">
    </search-bar-index>

    <van-progress
      :percentage="99.99" :color="'#673AB7'" style="margin: 14px auto;width: 94%;">

    </van-progress>

    <!--点名列表-->
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

    <back-to-top-index :visibility-height="200" :back-position="0"></back-to-top-index>

    <!--点名表单-->
    <van-dialog
      v-model="showForm"
      title="点　　名"
      :show-cancel-button="true"
      confirm-button-text="提交"
      cancel-button-color="#d71345"
      :colse-on-popstate="false"
      :before-close="submitForm"
      @cancel="showForm = false">
      <van-form
        ref="callFrom"
        style="text-align: left"
        label-align="left"
        :label-width="'18vw'">
        <van-field
          v-model="callResult"
          name="callSelect"
          label="点　名"
          :colon="true"
          :required="true"
          placeholder="点击选择点名状态"
          readonly
          clickable
          :rules="[{required:true,message:'请选择点名状态'}]"
          @click="showPicker = true">
        </van-field>
        <van-field
          v-model="callRemark"
          name="callRemark"
          label="备　注"
          :colon="true"
          placeholder="可填写备注"
          rows="2"
          autosize
          type="textarea"
          maxlength="50"
          show-word-limit>
        </van-field>
      </van-form>
    </van-dialog>
    <van-popup v-model="showPicker" position="bottom">
      <van-picker
        title="点名状态"
        :columns="callOptions"
        :show-toolbar="true"
        :default-index="selectedIndex"
        @confirm="confirmOptions"
        @cancel="showPicker = false">
      </van-picker>
    </van-popup>
  </div>
</template>

<script>
import {
  Progress, Dialog, Form, Picker, Popup, Field,
} from 'vant';
import TopNavBarIndex from 'Components/TopNavBar/TopNavBarIndex.vue';
import BottomPopSheetIndex from 'Components/BottomPopSheet/BottomPopSheetIndex.vue';
import CalendarBarIndex from 'Components/CalendarBar/CalendarBarIndex.vue';
import ListIndex from 'Components/List/ListIndex.vue';
import BackToTopIndex from 'Components/BackToTop/BackToTopIndex.vue';
import SearchBarIndex from 'Components/SearchBar/SearchBarIndex.vue';


export default {
  name: 'TeamCall',
  mixins: [],
  components: {
    SearchBarIndex,
    BackToTopIndex,
    ListIndex,
    CalendarBarIndex,
    BottomPopSheetIndex,
    TopNavBarIndex,
    [Progress.name]: Progress,
    [Dialog.Component.name]: Dialog.Component,
    [Form.name]: Form,
    [Field.name]: Field,
    [Picker.name]: Picker,
    [Popup.name]: Popup,
  },
  props: {},
  data() {
    return {
      title: '软件开发二室',
      isOpenedBottomSheet: false,
      bottomOptions: [],
      date: new Date(),
      downLoading: false,
      upLoading: false,
      upFinished: false,
      upError: false,
      lists: [],
      listItemButtons: [
        {
          text: '点名与修改',
          type: 'info',
          color: '#fc3962',
        },
      ],
      showForm: false,
      showPicker: false,
      callResult: '',
      callOptions: [
        '出勤', '调休', '产假', '陪产假', '旷工', '事假', '病假', '年休假', '特殊假期', '出差',
      ],
      selectedIndex: 0,
      callRemark: '',
      callItem: {},
    };
  },
  computed: {
  },
  watch: {},
  created() {
  },
  mounted() {
  },
  destroyed() {
  },
  methods: {
    // 打开底部菜单选项
    async openBottomSheetHandle() {
      this.isOpenedBottomSheet = true;
      const { data } = await this.$api.team.list();
      this.bottomOptions = data;
    },
    // 返回上一级路由
    backHandle() {
      this.$router.go(-1);
    },
    // 选择
    selectedTitleHandle(option) {
      this.title = option.name;
    },
    // 刷新列表
    async refreshListsHandle() {
      this.upFinished = false;
      this.downLoading = true;
      this.lists = [];
      await this.loadListsHandle();
    },
    // 加载列表
    async loadListsHandle() {
      this.upLoading = true;
      if (this.upError) {
        this.upError = false;
      }
      if (this.upFinished) {
        this.upFinished = false;
      }
      try {
        const res = await this.$api.team.call();
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
    clickListItemHandle(item) {
      console.log('班组item ', item);
      this.callItem = item;
      this.showForm = true;
      this.callResult = item.call;
      this.selectedIndex = this.callOptions.indexOf(this.callResult);
      this.callRemark = item.remark;
    },
    // 提交表单
    submitForm(action, done) {
      if (action === 'confirm') {
        this.$refs.callFrom.validate().then(() => {
          setTimeout(() => {
            // this.$refs['callFrom'].submit();
            // console.log(this.callResult, this.callRemark);// 提交表单
            const index = this.lists.findIndex(item => item.id === this.callItem.id);
            this.lists[index].call = this.callResult;
            this.lists[index].remark = this.callRemark;
            console.log('提交表单', this.lists);// 提交表单
            this.$notify({ type: 'success', message: '保存成功' });
            done();
          }, 2000);
        }).catch(() => {
          done(false);
        });
      } else {
        done();
      }
    },
    // 确认选择
    confirmOptions(options) {
      console.log(options);
      this.callResult = options;
      this.showPicker = false;
    },
    // 搜索
    searchHandle(val) {
      console.log(val);
    },
  },
};
</script>

<style lang="less" scoped>

</style>
