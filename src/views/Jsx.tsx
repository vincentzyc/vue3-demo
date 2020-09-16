import { ref } from "vue";
import { Rate } from "vant";

export default {
  setup() {
    const value = ref(3);

    return () => {
      return (
        <div class="mg20">
          <Rate vModel={value.value} />
          <div class="mg20">---{value.value}---</div>
        </div>
      );
    };
  }
};