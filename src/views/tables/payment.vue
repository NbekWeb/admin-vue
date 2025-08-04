<template>
  <Layout>
    <PageHeader :title="title" :items="items" />

    <el-card shadow="never">
      <div class="card-header mb-4">
        <span class="card-title">Оплата по лицевому счету</span>
      </div>

      <el-form @submit.prevent="submitPayment" :model="form" label-position="top">
        <el-form-item label="Лицевой счет">
          <el-input v-model="form.accountNumber" placeholder="Введите номер счёта" />
        </el-form-item>

        <el-button type="primary" @click="submitPayment">Перейти к оплате</el-button>
      </el-form>
    </el-card>
  </Layout>
</template>

<script setup>
import { ref } from 'vue';
import Layout from '@/layouts/main.vue';
import PageHeader from '@/components/page-header.vue';
import axios from 'axios';

const title = 'Оплата';
const items = [
  { text: 'Оплата', href: '/' },
  { text: 'Лицевой счёт', active: true },
];

const form = ref({
  accountNumber: '',
});

const submitPayment = async () => {
  try {
    const { data } = await axios.post('https://v.zesu.ru/payment/create/', {
      account_number: form.value.accountNumber,
    });

    if (data.confirmation_url) {
      // Yuborilgan URLga avtomatik redirect
      window.location.href = data.confirmation_url;
    } else {
      console.error('confirmation_url topilmadi!');
    }
  } catch (err) {
    console.error('To‘lov yaratishda xatolik:', err);
  }
};
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  font-size: 18px;
  margin-bottom: 10px;
  padding-bottom: 20px;
}
</style>
