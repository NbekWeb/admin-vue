<template>
	<Layout>
		<UserModal @create="fetchSubscribers" ref="subscriberRef" />
		<PageHeader :title="title" :items="items" />

		<el-card shadow="never">
			<div class="card-header mb-4">
				<span class="card-title">Абоненты</span>
				<el-button
					type="primary"
					:icon="Plus"
					@click="subscriberRef.open()"
				>
					Добавить абонента
				</el-button>
			</div>

			<div class="live-preview">
				<el-table
					:data="subscribers"
					border
					stripe
					style="width: 100%"
					v-loading="loading"
					empty-text="Абоненты не найдены"
				>
					<el-table-column prop="id" label="ID" width="80" />
					<el-table-column label="ФИО">
						<template #default="{ row }">
							{{ row.last_name }} {{ row.first_name }}
						</template>
					</el-table-column>
					<el-table-column prop="username" label="Логин" />
					<el-table-column label="Адрес">
						<template #default="{ row }">
							{{ row.address }}, кв. {{ row.apartment }}
						</template>
					</el-table-column>
					<el-table-column prop="fias" label="FIAS" />
					<el-table-column prop="balance" label="Баланс (₽)" />
					<el-table-column prop="tariff_plan" label="Тариф">
						<template #default="{ row }">
							{{ row.tariff_plan?.name }}
						</template>
					</el-table-column>
					<el-table-column label="Дата начала">
						<template #default="{ row }">
							{{ formatDate(row.start_datetime_pp) }}
						</template>
					</el-table-column>
					<el-table-column label="Дата окончания">
						<template #default="{ row }">
							{{ formatDate(row.end_datetime_pp) }}
						</template>
					</el-table-column>
					<el-table-column label="Подача воды">
						<template #default="{ row }">
							<el-tag :type="row.ws_status ? 'success' : 'danger'">
								{{ row.ws_status ? "Включена" : "Отключена" }}
							</el-tag>
						</template>
					</el-table-column>
					<!-- <el-table-column label="Действия" width="140">
						<template #default="{ row }">
							<el-button
								type="primary"
								size="small"
								@click="viewDetails(row)"
							>
								Подробнее
							</el-button>
						</template>
					</el-table-column> -->
				</el-table>
			</div>
		</el-card>
	</Layout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Layout from "@/layouts/main.vue";
import PageHeader from "@/components/page-header.vue";
import UserModal from "./components/UserModal.vue";
import { getUser_API } from "@/service/user";
import { Plus } from "@element-plus/icons-vue";

const title = "Абоненты";
const items = [{ text: "Абоненты", href: "/", active: true }];

const subscriberRef = ref();
const subscribers = ref([]);
const loading = ref(false);

const fetchSubscribers = async () => {
	loading.value = true;
	const [error, res] = await getUser_API();

	if (!error) {
		subscribers.value = res.data.results;
	} else {
		console.error("Ошибка при получении абонентов:", error);
	}

	loading.value = false;
};

// const viewDetails = (subscriber) => {
// 	alert(`Подробнее об абоненте: ${subscriber.name}`);
// };

const formatDate = (dateStr) => {
	const options = { year: "numeric", month: "2-digit", day: "2-digit" };
	return new Date(dateStr).toLocaleDateString("ru-RU", options);
};

onMounted(() => {
	fetchSubscribers();
});
</script>

<style scoped>
.card-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-weight: 600;
	font-size: 18px;
	padding-bottom: 20px;
}
</style>
