<script setup>
import { ref } from 'vue';
import * as yup from 'yup';
import { Form, Field, ErrorMessage } from 'vee-validate';

const $emit = defineEmits(['submit:contact', 'delete:contact']);
const props = defineProps({
    contact: {
        type: Object,
        required: true,
    },
});

let contactLocal = ref({ ...props.contact });
const contactFormSchema = yup.object().shape({
    name: yup
        .string()
        .required('Tên phải có giá trị')
        .min(2, 'Tên phải ít nhất 2 ký tự')
        .max(50, 'Tên có nhiều nhất 50 ký tự'),
    email: yup
        .string()
        .email('Email không đúng')
        .max(50, 'Email tối đa 50 ký tự'),
    address: yup
        .string()
        .max(100, 'Địa chỉ tối đa 100 ký tự'),
    phone: yup
        .string()
        .matches(
            /((09|03|07|08|05)+([0-9]{8})\b)/g,
            'Số điện thoại không hợp lệ'
        ),
});

const submitContact = () => {
    $emit('submit:contact', contactLocal.value)
}
const deleteContact = () => {
    $emit('delete:contact', contactLocal.value._id)
}
</script>

<template>
    <Form
        @submit="submitContact"
        :validation-schema="contactFormSchema"
    >
        <div class="form-group">
            <label for="name">Tên:</label>
            <Field
                name="name"
                type="text"
                id="name"
                class="form-control"
                v-model="contactLocal.name"
            />
            <ErrorMessage name="name" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="email">Email:</label>
            <Field
                name="email"
                type="email"
                id="email"
                class="form-control"
                v-model="contactLocal.email"
            />
            <ErrorMessage name="email" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="address">Địa chỉ:</label>
            <Field
                name="address"
                type="text"
                id="address"
                class="form-control"
                v-model="contactLocal.address"
            />
            <ErrorMessage name="address" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="phone">Điện thoại:</label>
            <Field
                name="phone"
                type="text"
                id="phone"
                class="form-control"
                v-model="contactLocal.phone"
            />
            <ErrorMessage name="phone" class="error-feedback" />
        </div>
        <div class="form-group form-check">
            <input
                name="favorite"
                type="checkbox"
                id="favorite"
                class="form-check-input"
                v-model="contactLocal.favorite"
            >
            <label for="favorite" class="form-check-label">
                <strong>Liên hệ yêu thích</strong>
            </label>
        </div>
        <div class="form-group">
            <button class="btn btn-primary">Lưu</button>
            <button
                v-if="contactLocal._id"
                type="button"
                class="ms-2 btn btn-danger"
                @click="deleteContact"
            >Xóa</button>
        </div>
    </Form>
</template>

<style scoped>
@import './../assets/form.css';
</style>