<script setup>
const props = defineProps({
    contact: {
        type: Object,
        required: true,
    },
});
</script>

<template>
    <div>
        <div class="p-1 text-start">
            <strong>Tên:</strong> {{ contact.name }}
        </div>
        <div class="p-1 text-start">
            <strong>Email:</strong> {{ contact.email }}
        </div>
        <div class="p-1 text-start">
            <strong>Địa chỉ:</strong> {{ contact.address }}
        </div>
        <div class="p-1 text-start">
            <strong>Điện thoại:</strong> {{ contact.phone }}
        </div>
        <div class="p-1 text-start">
            <strong>Liên hệ yêu thích:&nbsp;</strong>
            <i v-if="contact.favorite" class="fas fa-check"></i>
            <i v-else class="fas fa-times"></i>
        </div>
    </div>
    <div class="text-start">
        <button class="btn btn-sm btn-warning">
            <i class="fa-solid fa-pen-to-square me-1"></i>Hiệu chỉnh
        </button>
    </div>
</template>