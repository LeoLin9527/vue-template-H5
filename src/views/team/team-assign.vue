<template>
  <div>
    <!--顶部标题栏-->
    <top-nav-bar-index
      :fixed="true"
      :border="false"
      icon-class-left="left_arrow"
      text-right="保存"
      @click-left="backHandle"
      @click-right="saveHandle"
      @click-title="openBottomSheetHandle">
      {{title}}
    </top-nav-bar-index>
    <bottom-pop-sheet-index
      :open.sync="isOpenedBottomSheet"
      :actions="bottomOptions"
      @select="selectedTitleHandle">
    </bottom-pop-sheet-index>

    <van-swipe
      :loop="false"
      :autoplay="0"
      :show-indicators="false"
      class="assign-swipe">
      <van-swipe-item
        v-for="(group,index1) in assignList"
        :key="`AS${index1}`"
        class="assign-panel">
        <van-row type="flex" justify="space-between" align="center" class="assign-panel-header">
          <van-col>
            <van-tag mark type="primary">{{group.employeeList.length}}</van-tag>
          </van-col>
          <van-col class="assign-panel-header-title">{{group.name}}</van-col>
          <van-col class="assign-panel-header-subtitle">副标题</van-col>
        </van-row>
        <van-checkbox-group
          v-model="assignList[index1].result"
          :checked-color="'#07c160'"
          ref="checkboxGroup"
          class="assign-panel-list">
          <div v-waves v-for="(item,index2) in group.employeeList" :key="`APLI${index2}`" @click.capture="toggleHandle(item,index1)" class="assign-panel-list-item">
            <van-checkbox :name="item" ref="checkboxes" @click.stop="checkHandle(index1)">{{item.username}}
              <small>({{item.userno}})</small>
            </van-checkbox>
          </div>
        </van-checkbox-group>
        <div class="check-submit-bar">
          <van-radio-group v-model="group.radio" direction="horizontal" :checked-color="'#07c160'" :disabled="group.employeeList.length < 1">
            <van-radio name="1" @click="checkAll(group,index1)">全选</van-radio>
            <van-radio name="2" @click="toggleAll(group,index1)">反选</van-radio>
          </van-radio-group>
          <van-button v-waves round color="linear-gradient(to right, #4bb0ff, #6149f6)" style="height: 36px;" @click="assignHandle(group)">分配到({{group.result.length}})</van-button>
        </div>
      </van-swipe-item>
    </van-swipe>
    <van-popup v-model="showPicker" position="bottom">
      <van-picker
        title="分配到"
        :loading="false"
        :columns="selectOptions"
        :show-toolbar="true"
        :default-index="selectedIndex"
        @confirm="confirmOptions"
        @cancel="showPicker = false">
      </van-picker>
    </van-popup>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import {
  Swipe, SwipeItem, Tag, Col, Row, Checkbox, CheckboxGroup, RadioGroup, Radio, Button, Picker, Popup, Dialog,
} from 'vant';
import TopNavBarIndex from 'Components/TopNavBar/TopNavBarIndex.vue';
import BottomPopSheetIndex from 'Components/BottomPopSheet/BottomPopSheetIndex.vue';

export default {
  name: 'TeamAssign',
  mixins: [],
  components: {
    BottomPopSheetIndex,
    TopNavBarIndex,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Tag.name]: Tag,
    [Row.name]: Row,
    [Col.name]: Col,
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup,
    [Radio.name]: Radio,
    [RadioGroup.name]: RadioGroup,
    [Button.name]: Button,
    [Picker.name]: Picker,
    [Popup.name]: Popup,
    [Dialog.Component.name]: Dialog.Component,
  },
  props: {},
  data() {
    return {
      title: '软件开发二室',
      isOpenedBottomSheet: false,
      bottomOptions: [],
      assignList: [
        {
          name: '待分配',
          result: [],
          radio: '',
          employeeList: [
            {
              userno: '100183001',
              username: '小明',
            },
            {
              userno: '100183002',
              username: '小花',
            },
            {
              userno: '100183003',
              username: '小敬',
            },
          ],
        },
        {
          name: '小组1号',
          result: [],
          radio: '',
          employeeList: [
            {
              userno: '100183004',
              username: '小云',
            },
            {
              userno: '100183005',
              username: '小红',
            },
          ],
        },
        {
          name: '小组2号',
          result: [],
          employeeList: [
            {
              userno: '100183006',
              username: '小军',
            },
          ],
        },
      ],
      result: [],
      showPicker: false,
      selectedIndex: 0,
      groupOptions: [
        '待分配', '小组1号', '小组2号',
      ],
      selectOptions: [],
      oldGroup: '',
      saved: false,
    };
  },
  computed: {},
  watch: {
  },
  created() {
  },
  mounted() {
  },
  destroyed() {
  },
  methods: {
    ...mapMutations('assign', ['SET_ASSIGN']),
    // 返回上一级路由
    backHandle() {
      if (this.saved) {
        this.$router.go(-1);
      } else {
        Dialog.confirm({
          title: '保存分配方案',
          message: '您还未保存分配方案，确定放弃吗？',
          confirmButtonText: '放弃',
          confirmButtonColor: '#ee0a24',
          cancelButtonText: '保存',
          cancelButtonColor: '#1989fa',
          beforeClose: this.beforeClose,
        });
      }
    },
    beforeClose(action, done) {
      if (action === 'cancel') {
        setTimeout(() => {
          this.saveHandle();
          done();
        }, 2000);
      } else {
        done();
        this.$router.go(-1);
      }
    },
    // 打开底部选项
    async openBottomSheetHandle() {
      this.isOpenedBottomSheet = true;
      const { data = [] } = await this.$api.team.list();
      this.bottomOptions = Object.freeze(data);
    },
    // 选择班组
    selectedTitleHandle(option) {
      this.title = option.name;
    },
    checkAll(group, index) {
      if (group.employeeList.length > 0) {
        this.$refs.checkboxGroup[index].toggleAll(true);
      }
    },
    toggleAll(group, index) {
      if (group.employeeList.length > 0) {
        this.$refs.checkboxGroup[index].toggleAll();
      }
    },
    // 确认选择
    confirmOptions(options) {
      this.showPicker = false;
      this.saved = false;
      for (let i = 0; i < this.assignList.length; i += 1) {
        if (this.assignList[i].name === options) {
          this.assignList[i].employeeList = [...this.assignList[i].employeeList, ...this.result];
        }
        if (this.assignList[i].name === this.oldGroup) {
          const a = new Set(this.assignList[i].employeeList);
          const b = new Set(this.result);
          this.assignList[i].employeeList = [...a].filter(item => !b.has(item));
          this.assignList[i].result = [];
          this.assignList[i].radio = '';
        }
      }
    },
    // 分配
    assignHandle(group) {
      if (group.result.length > 0) {
        this.showPicker = true;
        this.result = group.result;
        this.oldGroup = group.name;
        const options = this.groupOptions;
        this.selectOptions = options.filter(item => item !== group.name);
      } else {
        this.$notify('您还没有选择人员哦');
      }
    },
    checkHandle(index) {
      this.assignList[index].radio = '';
    },
    toggleHandle(item, index) {
      this.checkHandle(index);
      for (let i = 0; i < this.$refs.checkboxes.length; i += 1) {
        if (this.$refs.checkboxes[i].name.userno === item.userno) {
          this.$refs.checkboxes[i].toggle();
        }
      }
    },
    // 保存分配方案
    saveHandle() {
      this.saved = true;
      console.log('保存分配', this.assignList);
      this.$notify({ type: 'success', message: '保存成功' });
    },
  },
};
</script>

<style lang="less" scoped>
  .assign-swipe {
    position: relative;
    width: 100%;
    height: calc(100vh - 46px);
    overflow: hidden;
  }
  .assign-panel {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    &-header {
      padding: 10px;
      background: #fff;
      &-title {
        font-size: 14px;
      }
      &-subtitle {
        font-size: 12px;
        opacity: .5;
      }
    }
    &-list {
      &-item {
        height: 64px;
        padding: 5px 10px;
        background: white;
        text-align: left;
        box-sizing: border-box;
        margin: 10px;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .2);
        border-radius: 6px;
        display: flex;
        justify-content: start;
        align-items: center;
        font-size: 14px;
      }
    }
    .check-submit-bar {
      position: absolute;
      bottom: 0;
      left: 0;
      display: flex;
      box-sizing: border-box;
      width: 100vw;
      align-items: center;
      justify-content: space-between;
      height: 50px;
      padding: 0 6px 0 12px;
      font-size: 12px;
      background: white;
    }
  }
</style>
