<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import ContactForm from './../components/ContactForm.vue';
import ContactService from './../services/contact.service';

const $router = useRouter();
let contact = ref({
    name: '',
    email: '',
    address: '',
    phone: '',
    favorite: false,
});
let message = ref('');
let msgClass = ref(null);
const defineContactService = () => {
    const user = JSON.parse(localStorage.getItem('userData'));
    if(!user) {
        $router.push({
            name: 'user.login',
        });
        return null;
    }
    return new ContactService('/api/contacts', {
        Authorization: `Bearer ${user.token}`,
    });
}
const addContact =  async (data) => {
    try {
        const contactService = defineContactService();
        const response = await contactService.create(data);
        contact.value = { ...response.data.contact };
        message.value = 'Liên hệ được thêm thành công';
        msgClass.value = 'alert alert-success';
    }
    catch(error) {
        console.error(error);
        message.value = 'Thêm Liên hệ thất bại';
        msgClass.value = 'alert alert-danger';
    }
    if(msgClass.value) {
        setTimeout(() => {
            message.value = '';
            msgClass.value = null;
            if(contact.value._id) {
                $router.push({
                    name: 'contactbook',
                });
            }
        }, 3000);
    }
}
</script>

<template>
    <div class="page">
        <h4>Thêm Liên hệ</h4>
        <ContactForm
            :contact="contact"
            @submit:contact="addContact"
        />
        <p v-if="msgClass" class="mt-2" :class="msgClass">{{ message }}</p>
    </div>
</template>