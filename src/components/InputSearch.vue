<script setup>
const props = defineProps({
    modelValue: {
        type: String,
        default: '',
    },
});
const $emit = defineEmits(['submit', 'update:modelValue']);

const updateModelValue = (event) => {
    $emit('update:modelValue', event.target.value);
}
const submit = () => {
    $emit('submit');
}
</script>

<template>
    <div class="input-group mb-3">
        <input
            type="text"
            class="form-control"
            placeholder="Nhập thông tin cần tìm"
            :value="modelValue"
            @input="updateModelValue($event)"
            @keyup.enter="submit()"
        >
        <button
            class="btn btn-outline-secondary"
            type="button"
            @click="submit()"
        >
            <i class="fas fa-search me-1"></i>Tìm kiếm
        </button>
    </div>
</template>