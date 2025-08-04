<template>
   <Layout>
      <TariffModal @create="fetchTariffs" ref="_tariffRef" />
		<PageHeader :title="title" :items="items" />

		<el-card shadow="never">
			<div class="card-header mb-4">
				<span class="card-title">Тарифы</span>
				<el-button type="primary" :icon="Plus" @click="_tariffRef.open()">
					Создать тариф
				</el-button>
			</div>
			<div class="live-preview" style="margin-top: 16px">
				<el-table
					:data="tariffs"
					border
					stripe
					style="width: 100%"
					v-loading="loading"
					empty-text="Тарифы не найдены"
				>
					<el-table-column label="ID" width="100">
						<template #default="{ row }">
							<a href="#">#{{ row.code || row.id }}</a>
						</template>
					</el-table-column>

					<el-table-column prop="name" label="Название" />
					<el-table-column prop="price" label="Цена, руб" />
					<el-table-column prop="unit_measurement" label="Период" />

					<el-table-column label="Статус">
						<template #default="{ row }">
							<el-tag v-if="row.archive" type="success"
								>Действующий</el-tag
							>
							<el-tag v-else type="danger">Не действующий</el-tag>
						</template>
					</el-table-column>

					<el-table-column width="100">
						<template #default="{row}">
							<el-button
								type="warning"
								:icon="Edit"
								@click="_tariffRef.open(row)"
							>
							</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
		</el-card>
		<!-- Modal
		<el-dialog title="Создать тариф" v-model="showModal">
			<div>Modal kontent bu yerda bo‘ladi</div>
			<template #footer>
				<el-button @click="showModal = false">Отмена</el-button>
				<el-button type="primary" @click="submitTariff"
					>Сохранить</el-button
				>
			</template>
		</el-dialog> -->
	</Layout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Layout from "../../layouts/main.vue";
import PageHeader from "@/components/page-header.vue";
import { getTariff_API } from "../../service/tariff";
import { Edit, Plus } from "@element-plus/icons-vue";
import TariffModal from "./components/TariffModal.vue";

const _tariffRef = ref();
// Title va breadcrumbs
const title = "Таблицы";
const items = [
	{ text: "Tables", href: "/" },
	{ text: "Basic Tables", active: true },
];

// Reactive state
const tariffs = ref([]);
const loading = ref(false);

// Tariflarni olish
const fetchTariffs = async () => {
	loading.value = true;
	const [error, res] = await getTariff_API();
	console.log("22222", res.data);

	if (!error) {
		tariffs.value = res.data.results;
	} else {
		console.error("Tariff API xatosi:", error);
	}
	loading.value = false;
};

// Mounted
onMounted(() => {
	fetchTariffs();
});
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
.badge {
	font-size: 13px;
}
</style>
