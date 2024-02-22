<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import ContactService from './../services/contact.service';
import InputSearch from './../components/InputSearch.vue';
import ContactList from './../components/ContactList.vue';
import ContactCard from './../components/ContactCard.vue';

const $router = useRouter();

let contacts = ref([]);
let activeIndex = ref(-1);
let searchText = ref('');

watch(searchText, () => {
    activeIndex.value = -1;
});
const contactStrings = computed(() => {
    return contacts.value.map(contact => {
        const { name, email, address, phone } = contact;
        return [name, email, address, phone].join('');
    })
});
const filteredContacts = computed(() => {
    if(!searchText.value) {
        return contacts.value;
    }
    return contacts.value.filter((contact, index) => {
        return contactStrings.value[index].includes(searchText.value.trim());
    });
});
const activeContact = computed(() => {
    if(activeIndex.value < 0) {
        return null;
    }
    return filteredContacts.value[activeIndex.value];
});
const filteredContactsCount = computed(() => {
    return filteredContacts.value.length;
});

const defineContactService = () => {
    const user = JSON.parse(localStorage.getItem('userData'));
    if(!user) {
        $router.push({
            name: 'user.login',
        });
        return null;
    }
    return new ContactService('api/contacts', {
        Authorization: `Bearer ${user.token}`,
    });
}
const retrieveContacts = async () => {
    try {
        const contactService = defineContactService();
        if(contactService) {
            const data = await contactService.getAll();
            contacts.value = data.data.contacts;
        }
    }
    catch(error) {
        console.log(error);
    }
}
const refreshList = async () => {
    await retrieveContacts();
    activeIndex.value = -1;
    searchText.value = '';
}
const removeAllContacts = async () => {
    if(confirm('Bạn muốn xóa tất cả Liên hệ ?')) {
        try {
            const contactService = defineContactService();
            if(contactService) {
                await contactService.deleteAll();
                contacts.value = [];
            }
        }
        catch(error) {
            console.log(error);
        }
    }
}
const goToAddContact = () => {
    $router.push({
        name: 'contact.add',
    })
}
const updateActiveIndex = (index) => {
    activeIndex.value = index;
}
onMounted(() => {
    refreshList();
});
</script>

<template>
    <div class="page row">
        <div class="col-mt-10">
            <InputSearch v-model="searchText" />
        </div>
        <div class="mt-3 col-md-6">
            <h4>
                Danh bạ
                <i class="fas fa-address-book"></i>
            </h4>
            <ContactList
                v-if="filteredContactsCount > 0"
                :contacts="filteredContacts"
                :activeIndex="activeIndex"
                @update:activeIndex="updateActiveIndex"
            />
            <p v-else>Không có liên hệ nào</p>
            <div class="mt-3 row justify-content-around align-items-center">
                <div class="col col-sm-4">
                    <button class="btn btn-sm btn-primary" @click="refreshList()">
                        <i class="fas fa-redo me-1"></i>Làm mới
                    </button>
                </div>
                <div class="col col-sm-4">
                    <button class="btn btn-sm btn-success" @click="goToAddContact()">
                        <i class="fas fa-plus me-1"></i>Thêm mới
                    </button>
                </div>
                <div class="col col-sm-4">
                    <button class="btn btn-sm btn-danger" @click="removeAllContacts()">
                        <i class="fas fa-trash me-1"></i>Xóa tất cả
                    </button>
                </div>
            </div>
        </div>
        <div class="mt-3 col-md-6">
            <div v-if="activeContact">
                <h4>
                    Chi tiết liên hệ
                    <i class="fas fa-address-card"></i>
                </h4>
                <ContactCard :contact="activeContact" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.page {
    text-align: center;
    max-width: 750px;
}
</style>