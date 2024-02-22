<script setup>
import { onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import ContactForm from './../components/ContactForm.vue';
import ContactService from './../services/contact.service';

const $router = useRouter();
const $route = useRoute();
const props = defineProps({
    id: {
        type: String,
        required: true,
    },
});

let contact = ref(null);
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
const getContact = async (id) => {
    try {
        const contactService = defineContactService();
        const data = await contactService.get(id);
        contact.value = data.data.contact;
    }
    catch(error) {
        console.error(error);
        $router.push({
            name: 'notfound',
            params: {
                pathMatch: $route.path.split('/').slice(1)
            },
            query: $route.query,
            hash: $route.hash,
        });
    }
}
const updateContact =  async (data) => {
    try {
        const contactService = defineContactService();
        await contactService.update(contact.value._id, data);
        message.value = 'Liên hệ được cập nhật thành công';
        msgClass.value = 'alert alert-success';
    }
    catch(error) {
        console.error(error);
        message.value = 'Cập nhật Liên hệ thất bại';
        msgClass.value = 'alert alert-danger';
    }
    if(msgClass.value) {
        setTimeout(() => {
            message.value = '';
            msgClass.value = null;
        }, 3000);
    }
}
const deleteContact = async() => {
    if(confirm('Bạn muốn xóa Liên hệ này ?')) {
        try {
            const contactService = defineContactService();
            await contactService.delete(contact.value._id);
            alert('Liên hệ đã được xóa');
            $router.push({
                name: 'contactbook',
            });
        }
        catch(error) {
            console.error(error);
            $router.push({
                name: 'notfound',
                params: {
                    pathMatch: $route.path.split('/').slice(1)
                },
                query: $route.query,
                hash: $route.hash,
            });
        }
    }
}

onMounted(async () => {
    await getContact(props.id);
    message.value = '';
});
</script>

<template>
    <div v-if="contact" class="page">
        <h4>Hiệu chỉnh Liên hệ</h4>
        <ContactForm
            :contact="contact"
            @submit:contact="updateContact"
            @delete:contact="deleteContact"
        />
        <p v-if="msgClass" class="mt-2" :class="msgClass">{{ message }}</p>
    </div>
</template>