<template>
  <a-pagination
    v-model:current="current"
    v-model:page-size="pageSize"
    :page-size-options="pageSizeOptions"
    :total="total"
    show-size-changer
    @showSizeChange="onShowSizeChange"
    @change="onShowSizeChange"
  >
    <template #buildOptionText="props">
      <span v-if="props.value !== '50'">{{ props.value }}条/页</span>
      <span v-else>全部</span>
    </template>
  </a-pagination>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, toRefs, watch, PropType } from "vue";
interface PageType {
  current: number;
  pageSize: number;
  total: number;
}

export default defineComponent({

  props: {
    page: {
      type: Object as PropType<PageType>,
      default: () => {
        return {
          current: 1,
          pageSize: 10,
          total: 0,
        };
      },
    },
  },
  setup(props, context) {
    const pageSizeOptions = ref<string[]>(["10", "20", "30", "40", "50"]);
    const { page } = toRefs(props);

    let state = reactive({
      ...page.value,
    });

    const onShowSizeChange = (current1: number, pageSize1: number) => {
      state.pageSize = pageSize1;
      state.current = current1;
      const parent = { ...context };

      parent.emit("onShowSizeChange", {
        current: state.current,
        pageSize: state.pageSize,
      });
    };

    watch(
      props.page,
      (newVal, oldVal) => {
        const { pageSize, current, total } = toRefs(newVal);
        state.pageSize = pageSize.value;
        state.current = current.value;
        state.total = total.value;
      },
      { deep: true }
    );

    return {
      pageSizeOptions,
      // pageSize,
      // current,
      // total,
      ...toRefs(state),
      onShowSizeChange,
    };
  },
});
</script>

<style lang="scss">
.ant-pagination-item-active {
  font-weight: 500;
  background: #fff;
  border-color: #549e8f;
  a {
    color: #549e8f;
    &:hover {
      color: #fff;
    }
  }
  &:hover {
    // background: #549e8f;
  }
}
.ant-pagination-next:hover .ant-pagination-item-link,
.ant-pagination-item:hover,
.ant-pagination-prev:hover .ant-pagination-item-link,
.ant-pagination-next:hover .ant-pagination-item-link,
.ant-select:not(.ant-select-disabled):hover .ant-select-selector {
  color: #549e8f;
  border-color: #549e8f;
  a {
    color: #549e8f;
  }
}
</style>
