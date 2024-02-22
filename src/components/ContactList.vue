<script setup>
const props = defineProps({
    contacts: {
        type: Array,
        default: [],
    },
    activeIndex: {
        type: Number,
        default: -1,
    },
});
const $emit = defineEmits(['update:activeIndex']);
const updateActiveIndex = (index) => {
    $emit('update:activeIndex', index);
}
</script>

<template>
    <ul class="list-group">
        <li
            class="list-group-item text-start"
            v-for="(contact, index) in contacts"
            :key="contact._id"
            :class="{ active: index === activeIndex }"
            @click="updateActiveIndex(index)"
        >{{ contact.name }}</li>
    </ul>
</template>