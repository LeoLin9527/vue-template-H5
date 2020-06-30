import Vue from 'vue';

import SkeletonIndex from './components/Skeleton/SkeletonIndex.vue';

export default new Vue({
  components: {
    SkeletonIndex,
  },
  template: `<div>
        <skeleton-index id="skeleton-index"></skeleton-index>
</div>`,
});
